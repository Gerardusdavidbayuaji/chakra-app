using ChakraApp.Domain.Entities;
using ChakraApp.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChakraApp.Infrastructure.Configuration;

public class InstallmentConfiguration : IEntityTypeConfiguration<Installment>
{
    public void Configure(EntityTypeBuilder<Installment> builder)
    {
        builder.ToTable("Installments");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.DueDate).IsRequired();

        builder.Property(x => x.Amount)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.Status)
            .HasConversion<string>()
            .HasMaxLength(EfConstants.Length.Short)
            .IsRequired();

        builder.Property(x => x.MidtransOrderId)
            .HasMaxLength(EfConstants.Length.Long);

        builder.HasOne(x => x.Premi)
            .WithMany(p => p.Installments)
            .HasForeignKey(x => x.PremiId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.PremiId);

        builder.Property(x => x.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}
