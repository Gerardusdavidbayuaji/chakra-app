using ChakraApp.Application.Common;
using Microsoft.AspNetCore.Authorization;

namespace ChakraApp.API.Endpoints;

public static class AuthEndpoint
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        group.MapGet("/me", [Authorize] (ICurrentUserService currentUser) =>
        {
            return Results.Ok(new { UserId = currentUser.UserId });
        })
        .WithName("GetMe");
    }
}
