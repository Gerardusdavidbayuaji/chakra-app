using ChakraApp.Domain.Entities.Enums;

namespace ChakraApp.Domain.Entities;

public class Installment
{
    public Guid Id { get; set; }
    public Guid PremiId { get; set; }
    public DateOnly DueDate { get; set; }
    public decimal Amount { get; set; }
    public InstallmentStatus Status { get; set; }
    public string? MidtransOrderId { get; set; }
    public DateTime? PaidAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public Premi Premi { get; set; } = null!;
}
