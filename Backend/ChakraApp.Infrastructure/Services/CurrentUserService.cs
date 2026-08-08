using System.Security.Claims;
using ChakraApp.Application.Common;
using ChakraApp.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace ChakraApp.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? SupabaseAuthId =>
        _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? Email =>
        _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email);

    public Guid? DatabaseUserId => GetCurrentUser()?.Id;

    public User? GetCurrentUser()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return null;

        httpContext.Items.TryGetValue("CurrentUser", out var user);
        return user as User;
    }
}
