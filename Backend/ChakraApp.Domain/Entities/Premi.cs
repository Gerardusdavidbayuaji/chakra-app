using ChakraApp.Domain.Entities.Enums;

namespace ChakraApp.Domain.Entities;

public class Premi
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public decimal TotalAmount { get; set; }
    public int Tenor { get; set; }
    public DateOnly StartDate { get; set; }
    public PremiStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
    public ICollection<Installment> Installments { get; set; } = new List<Installment>();
}