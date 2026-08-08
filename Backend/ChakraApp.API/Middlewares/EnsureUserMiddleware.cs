using System.Security.Claims;
using ChakraApp.Application.Common;
using ChakraApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChakraApp.API.Middlewares;

public class EnsureUserMiddleware
{
    private readonly RequestDelegate _next;

    public EnsureUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IApplicationDbContext dbContext)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var supabaseAuthId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = context.User.FindFirstValue(ClaimTypes.Email);

            if (!string.IsNullOrEmpty(supabaseAuthId) && !string.IsNullOrEmpty(email))
            {
                var user = await dbContext.Users
                    .FirstOrDefaultAsync(u => u.SupabaseAuthId == supabaseAuthId);

                if (user == null)
                {
                    var name = email.Contains('@') ? email[..email.IndexOf('@')] : email;

                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        Name = name,
                        Email = email,
                        SupabaseAuthId = supabaseAuthId,
                        TelegramChatId = Guid.NewGuid().ToString(),
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };

                    dbContext.Users.Add(user);

                    try
                    {
                        await dbContext.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        // Race condition: another request already created this user
                        user = await dbContext.Users
                            .FirstOrDefaultAsync(u => u.SupabaseAuthId == supabaseAuthId);
                    }
                }

                context.Items["CurrentUser"] = user;
            }
        }

        await _next(context);
    }
}
