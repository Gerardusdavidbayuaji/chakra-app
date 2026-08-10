using Microsoft.EntityFrameworkCore;
using ChakraApp.Application.Common;
using ChakraApp.Domain.Entities;

namespace ChakraApp.Infrastructure;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    } 
    
    public DbSet<User> Users {get; set;}
    public DbSet<Premi> Premi { get; set; }
    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}