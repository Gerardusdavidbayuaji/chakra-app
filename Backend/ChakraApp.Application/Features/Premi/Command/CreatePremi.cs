using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Application.Mappers;
using ChakraApp.Domain.Entities;
using ChakraApp.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PremiEntity = ChakraApp.Domain.Entities.Premi;

namespace ChakraApp.Application.Features.Premi.Commands;

public record CreatePremiCommand(
    Guid UserId,
    decimal TotalAmount,
    int Tenor,
    int DueDay,
    int GracePeriodDays,
    DateOnly StartDate
) : IRequest<Result<PremiResponseDto>>;

public class CreatePremiCommandHandler : IRequestHandler<CreatePremiCommand, Result<PremiResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public CreatePremiCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PremiResponseDto>> Handle(CreatePremiCommand request, CancellationToken cancellationToken)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == request.UserId, cancellationToken);
        if (!userExists)
            return Result<PremiResponseDto>.Failure("User tidak ditemukan.");

        var now = DateTime.UtcNow;
        var installmentAmount = Math.Round(request.TotalAmount / request.Tenor, 2);

        var premi = new PremiEntity
        {
            Id = Guid.NewGuid(),
            UserId = request.UserId,
            TotalAmount = request.TotalAmount,
            InstallmentAmount = installmentAmount,
            Tenor = request.Tenor,
            DueDay = request.DueDay,
            GracePeriodDays = request.GracePeriodDays,
            StartDate = request.StartDate,
            Status = PremiStatus.Active,
            CreatedAt = now,
            UpdatedAt = now
        };

        // Generate installments
        for (int i = 1; i <= request.Tenor; i++)
        {
            var dueDate = request.StartDate.AddMonths(i);
            // Sesuaikan hari jatuh tempo
            var maxDay = DateTime.DaysInMonth(dueDate.Year, dueDate.Month);
            var actualDueDay = Math.Min(request.DueDay, maxDay);
            dueDate = new DateOnly(dueDate.Year, dueDate.Month, actualDueDay);

            premi.Installments.Add(new Installment
            {
                Id = Guid.NewGuid(),
                PremiId = premi.Id,
                InstallmentNumber = i,
                DueDate = dueDate,
                Amount = installmentAmount,
                Status = InstallmentStatus.Pending,
                ReminderCount = 0,
                CreatedAt = now
            });
        }

        _context.Premi.Add(premi);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<PremiResponseDto>.Success(premi.ToResponseDto());
    }
}
