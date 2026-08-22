using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Midtrans.Dtos;
using ChakraApp.Application.Features.Midtrans.Settings;
using ChakraApp.Application.Services;
using ChakraApp.Domain.Entities;
using ChakraApp.Domain.Entities.Enums;

namespace ChakraApp.Application.Features.Midtrans.Command;

public record ProcessMidtransWebhookCommand(MidtransNotificationDto Notification) : IRequest<Result<string>>;
  public class ProcessMidtransWebhookCommandHandler : IRequestHandler<ProcessMidtransWebhookCommand, Result<string>>
  {
      private readonly IApplicationDbContext _context;
      private readonly PremiCompletionService _premiCompletionService;
      private readonly MidtransSettings _settings;

      public ProcessMidtransWebhookCommandHandler(
          IApplicationDbContext context,
          PremiCompletionService premiCompletionService,
          IOptions<MidtransSettings> settings)
      {
          _context = context;
          _premiCompletionService = premiCompletionService;
          _settings = settings.Value;
      }

      public async Task<Result<string>> Handle(
          ProcessMidtransWebhookCommand request, CancellationToken cancellationToken) 
      {
          var notification = request.Notification;

          // Step 1: Signature validation
          if (!ValidateSignature(notification))
              return Result<string>.Failure("Invalid signature.");

          // Step 2: Only process successful payments
          var isPaymentSuccess = notification.TransactionStatus == "settlement" || (notification.TransactionStatus == "capture" && notification.FraudStatus == "accept");
          
          if (!isPaymentSuccess)
              return Result<string>.Success("Notification received.");

          // Step 3: Load installment by MidtransOrderId
          var installment = await _context.Installments
              .FirstOrDefaultAsync(i => i.MidtransOrderId == notification.OrderId, cancellationToken);

          if (installment == null)
              return Result<string>.Failure("Installment Not Found.");

          // Step 4: Idempotency check
          if (installment.Status == InstallmentStatus.Paid)
              return Result<string>.Success("Already processed.");

          // Step 5: Atomic update
          try
          {
              var now = DateTime.UtcNow;

              installment.Status = InstallmentStatus.Paid;
              installment.PaidAt = now;

              _context.OutboxMessages.Add(new OutboxMessage
              {
                  Id = Guid.NewGuid(),
                  Type = "PaymentSuccess",
                  Payload = JsonSerializer.Serialize(new
                  {
                      InstallmentId = installment.Id,
                      PremiId = installment.PremiId,
                      Amount = installment.Amount,
                      PaidAt = now,
                      MidtransOrderId = notification.OrderId,
                      TransactionId = notification.TransactionId
                  }),
                  IsProcessed = false,
                  RetryCount = 0,
                  CreatedAt = now
              });

              _context.AuditLogs.Add(new AuditLog
              {
                  Id = Guid.NewGuid(),
                  Entity = "Installment",
                  EntityId = installment.Id,
                  Action = "PaymentReceived",
                  Metadata = JsonSerializer.Serialize(new
                  {
                      MidtransOrderId = notification.OrderId,
                      TransactionId = notification.TransactionId,
                      PaymentType = notification.PaymentType,
                      GrossAmount = notification.GrossAmount,
                      TransactionStatus = notification.TransactionStatus
                  }),
                  CreatedAt = now
              });

              await _premiCompletionService.CheckAndCompletePremiAsync(
                  installment.PremiId, cancellationToken);
              await _context.SaveChangesAsync(cancellationToken);
              
              return Result<string>.Success("Payment processed successfully.");
          }
          catch (DbUpdateConcurrencyException)
          {
              // Race condition — another webhook already processed this
              return Result<string>.Success("Already processed.");
          }
      }

      private bool ValidateSignature(MidtransNotificationDto notification)
      {
          var rawInput = $"{notification.OrderId}{notification.StatusCode}" + $"{notification.GrossAmount}{_settings.ServerKey}";

          var hash =
  SHA512.HashData(Encoding.UTF8.GetBytes(rawInput));
          var computed = Convert.ToHexStringLower(hash);

          return computed == notification.SignatureKey;
      }
  }