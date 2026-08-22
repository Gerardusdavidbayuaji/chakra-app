using System.Text.Json.Serialization;

namespace ChakraApp.Application.Features.Midtrans.Dtos;

public class MidtransNotificationDto
{
    public string OrderId { get; set; } = string.Empty;
    public string TransactionStatus { get; set; } = string.Empty;
    public string StatusCode { get; set; } = string.Empty;
    public string GrossAmount { get; set; } = string.Empty;
    public string SignatureKey { get; set; } = string.Empty;
    public string? FraudStatus { get; set; } 
    public string? PaymentType { get; set; } 
    public string? TransactionId { get; set; } 
    public string? TransactionTime { get; set; } 
}

