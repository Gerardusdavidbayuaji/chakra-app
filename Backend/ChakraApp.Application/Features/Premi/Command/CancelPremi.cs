using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Application.Mappers;
using ChakraApp.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Premi.Commands;

public record CancelPremiCommand(Guid Id) : IRequest<Result<PremiResponseDto>>;

public class CancelPremiCommandHandler : IRequestHandler<CancelPremiCommand, Result<PremiResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public CancelPremiCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PremiResponseDto>> Handle(CancelPremiCommand request, CancellationToken cancellationToken)
    {
        var premi = await _context.Premi
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (premi == null)
            return Result<PremiResponseDto>.Failure("Premi tidak ditemukan.");

        if (premi.Status == PremiStatus.Cancelled)
            return Result<PremiResponseDto>.Failure("Premi sudah berstatus dibatalkan.");

        premi.Status = PremiStatus.Cancelled;
        premi.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Result<PremiResponseDto>.Success(premi.ToResponseDto());
    }
}