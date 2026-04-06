using ChakraApp.Application.Features.Users.Commands;
using ChakraApp.Application.Features.Users.Queries;
using ChakraApp.Application.Users.Dtos;
using MediatR;

namespace ChakraApp.API.Endpoints;

public static class UserEndpoint
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/users").WithTags("Users");

        group.MapGet("/", async (IMediator mediator) =>
        {
            var result = await mediator.Send(new GetUsersQuery());
            return result.IsSuccess ? Results.Ok(result.Data) : Results.BadRequest(result.Error);
        })
        .WithName("GetUsers");

        group.MapPost("/", async (CreateUserRequestDto dto, IMediator mediator) =>
        {
            var command = new CreateUserCommand(dto.Name, dto.Email, dto.Password, dto.TelegramChatId);
            var result = await mediator.Send(command);
            return result.IsSuccess
                ? Results.Created($"/api/users/{result.Data!.Id}", result.Data)
                : Results.BadRequest(result.Error);
        })
        .WithName("CreateUser");
    }
}
