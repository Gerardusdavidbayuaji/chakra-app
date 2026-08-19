namespace ChakraApp.Domain.Entities;

public class AuditLog
{
    public Guid Id { get; set; }
    public required string Entity { get; set; }
    public Guid EntityId { get; set; }
    public required string Action { get; set; }
    public string? Metadata { get; set; }
    public DateTime CreatedAt { get; set; }
}
