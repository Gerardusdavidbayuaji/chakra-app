using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Installments.Dtos;
using Gridify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Installments.Queries;

public class GetInstallmentsByPremiIdQuery : PaginatedRequest, IRequest<Result<PaginatedResult<InstallmentResponseDto>>>
{
    public Guid PremiId { get; set; }
}

public class GetInstallmentsByPremiIdQueryHandler
    : IRequestHandler<GetInstallmentsByPremiIdQuery, Result<PaginatedResult<InstallmentResponseDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetInstallmentsByPremiIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PaginatedResult<InstallmentResponseDto>>> Handle(
        GetInstallmentsByPremiIdQuery request, CancellationToken cancellationToken)
    {
        var premiExists = await _context.Premi.AnyAsync(p => p.Id == request.PremiId, cancellationToken);
        if (!premiExists)
            return Result<PaginatedResult<InstallmentResponseDto>>.Failure("Premi tidak ditemukan.");

        var gridifyQuery = request.ToGridifyQuery();

        var query = _context.Installments
            .AsNoTracking()
            .Where(i => i.PremiId == request.PremiId)
            .ApplyFilteringAndOrdering(gridifyQuery);

        var count = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((gridifyQuery.Page - 1) * gridifyQuery.PageSize)
            .Take(gridifyQuery.PageSize)
            .ToListAsync(cancellationToken);

        var data = items.Adapt<IEnumerable<InstallmentResponseDto>>()!;

        return Result<PaginatedResult<InstallmentResponseDto>>.Success(new PaginatedResult<InstallmentResponseDto>
        {
            Data = data,
            Count = count,
            Page = gridifyQuery.Page,
            PageSize = gridifyQuery.PageSize,
            TotalPages = (int)Math.Ceiling(count / (double)gridifyQuery.PageSize)
        });
    }
}
