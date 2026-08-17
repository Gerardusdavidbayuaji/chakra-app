using ChakraApp.Application.Common;
using ChakraApp.Domain.Entities.Enums;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Services;

public class PremiCompletionService
{
    private readonly IApplicationDbContext _context;

    public PremiCompletionService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CheckAndCompletePremiAsync(Guid premiId, CancellationToken cancellationToken = default)
    {
        var allPaid = await _context.Installments
            .Where(i => i.PremiId == premiId)
            .AllAsync(i => i.Status == InstallmentStatus.Paid, cancellationToken);

        if (!allPaid)
            return;

        var premi = await _context.Premi
            .FirstOrDefaultAsync(p => p.Id == premiId, cancellationToken);

        if (premi is null || premi.Status != PremiStatus.Active)
            return;

        premi.Status = PremiStatus.Complated;
        premi.UpdatedAt = DateTime.UtcNow;
    }
}
