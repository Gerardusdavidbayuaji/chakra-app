using ChakraApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.Application.Common;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
