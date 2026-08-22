using ChakraApp.Domain.Entities;
using ChakraApp.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChakraApp.Infrastructure.Configuration;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("AuditLogs");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Entity)
            .IsRequired()
            .HasMaxLength(EfConstants.Length.Normal);

        builder.Property(x => x.EntityId).IsRequired();

        builder.Property(x => x.Action)
            .IsRequired()
            .HasMaxLength(EfConstants.Length.Normal);

        builder.Property(x => x.Metadata)
            .HasColumnType("jsonb");

        builder.HasIndex(x => new { x.Entity, x.EntityId });

        builder.Property(x => x.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}
