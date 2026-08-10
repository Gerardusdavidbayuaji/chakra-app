using ChakraApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Common;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Premi> Premi { get; }
    DbSet<Installment> Installments { get; }
    DbSet<OutboxMessage> OutboxMessages { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
