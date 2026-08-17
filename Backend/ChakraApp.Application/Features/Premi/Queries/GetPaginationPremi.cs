using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Dtos;
using Gridify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Premi.Queries;

public class GetPaginationPremiQuery : PaginatedRequest, IRequest<Result<PaginatedResult<PremiResponseDto>>>;

public class GetPaginationPremiQueryHandler : IRequestHandler<GetPaginationPremiQuery, Result<PaginatedResult<PremiResponseDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetPaginationPremiQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PaginatedResult<PremiResponseDto>>> Handle(GetPaginationPremiQuery request, CancellationToken cancellationToken)
    {
        var gridifyQuery = request.ToGridifyQuery();

        var query = _context.Premi
            .AsNoTracking()
            .ApplyFilteringAndOrdering(gridifyQuery);

        var count = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((gridifyQuery.Page - 1) * gridifyQuery.PageSize)
            .Take(gridifyQuery.PageSize)
            .ToListAsync(cancellationToken);

        var data = items.Adapt<IEnumerable<PremiResponseDto>>()!;

        return Result<PaginatedResult<PremiResponseDto>>.Success(new PaginatedResult<PremiResponseDto>
        {
            Data = data,
            Count = count,
            Page = gridifyQuery.Page,
            PageSize = gridifyQuery.PageSize,
            TotalPages = (int)Math.Ceiling(count / (double)gridifyQuery.PageSize)
        });
    }
}