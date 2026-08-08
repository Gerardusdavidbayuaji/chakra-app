using ChakraApp.Domain.Entities;

namespace ChakraApp.Application.Common;

public interface ICurrentUserService
{
    string? SupabaseAuthId { get; }
    string? Email { get; }
    Guid? DatabaseUserId { get; }
    User? GetCurrentUser();
}
