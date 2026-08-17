using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Application.Mappers;
using ChakraApp.Domain.Entities;
using ChakraApp.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Premi.Commands;

public record UpdatePremiCommand(
    Guid Id,
    decimal TotalAmount,
    int Tenor,
    int DueDay,
    int GracePeriodDays,
    DateOnly StartDate
) : IRequest<Result<PremiResponseDto>>;

public class UpdatePremiCommandHandler : IRequestHandler<UpdatePremiCommand, Result<PremiResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public UpdatePremiCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PremiResponseDto>> Handle(UpdatePremiCommand request, CancellationToken cancellationToken)
    {
        var premi = await _context.Premi
            .Include(p => p.Installments)
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (premi == null)
            return Result<PremiResponseDto>.Failure("Premi tidak ditemukan.");

        if (premi.Status == PremiStatus.Cancelled)
            return Result<PremiResponseDto>.Failure("Premi yang sudah dibatalkan tidak dapat diubah.");

        // Cek apakah ada installment yang sudah dibayar
        var hasPaidInstallment = premi.Installments.Any(i => i.Status == InstallmentStatus.Paid);
        if (hasPaidInstallment)
            return Result<PremiResponseDto>.Failure("Premi tidak dapat diubah karena sudah ada cicilan yang dibayar.");

        var now = DateTime.UtcNow;
        var installmentAmount = Math.Round(request.TotalAmount / request.Tenor, 2);

        premi.TotalAmount = request.TotalAmount;
        premi.InstallmentAmount = installmentAmount;
        premi.Tenor = request.Tenor;
        premi.DueDay = request.DueDay;
        premi.GracePeriodDays = request.GracePeriodDays;
        premi.StartDate = request.StartDate;
        premi.UpdatedAt = now;

        // Hapus installments lama dan generate ulang
        _context.Installments.RemoveRange(premi.Installments);
        premi.Installments.Clear();

        for (int i = 1; i <= request.Tenor; i++)
        {
            var dueDate = request.StartDate.AddMonths(i);
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

        await _context.SaveChangesAsync(cancellationToken);

        return Result<PremiResponseDto>.Success(premi.ToResponseDto());
    }
}
