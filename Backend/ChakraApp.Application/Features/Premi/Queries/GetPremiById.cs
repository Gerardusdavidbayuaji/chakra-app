using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Application.Mappers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Features.Premi.Queries;

public record GetPremiByIdQuery(Guid Id) : IRequest<Result<PremiResponseDto>>;

public class GetPremiByIdQueryHandler : IRequestHandler<GetPremiByIdQuery, Result<PremiResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public GetPremiByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PremiResponseDto>> Handle(GetPremiByIdQuery request, CancellationToken cancellationToken)
    {
        var premi = await _context.Premi
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (premi == null)
            return Result<PremiResponseDto>.Failure("Premi tidak ditemukan.");

        return Result<PremiResponseDto>.Success(premi.ToResponseDto());
    }
}