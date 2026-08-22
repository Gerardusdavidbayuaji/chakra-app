using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Installments.Dtos;
using ChakraApp.Application.Mappers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Installments.Queries;

public record GetInstallmentByIdQuery(Guid Id) : IRequest<Result<InstallmentResponseDto>>;

public class GetInstallmentByIdQueryHandler
    : IRequestHandler<GetInstallmentByIdQuery, Result<InstallmentResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public GetInstallmentByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<InstallmentResponseDto>> Handle(
        GetInstallmentByIdQuery request, CancellationToken cancellationToken)
    {
        var installment = await _context.Installments
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.Id == request.Id, cancellationToken);

        if (installment == null)
            return Result<InstallmentResponseDto>.Failure("Installment tidak ditemukan.");

        return Result<InstallmentResponseDto>.Success(installment.ToResponseDto());
    }
}
