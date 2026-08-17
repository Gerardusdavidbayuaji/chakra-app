using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Premi.Commands;
using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Application.Features.Premi.Queries;
using MediatR;

namespace ChakraApp.API.Endpoints;

public static class PremiEndpoint
{
    public static void MapPremiEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/premi").WithTags("Premi");

        group.MapGet("/", async (IMediator mediator, [AsParameters] GetPaginationPremiQuery query) =>
        {
            var result = await mediator.Send(query);
            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Data retrieved successfully"))
                : Results.BadRequest(ApiErrorResponse.Error(result.Error!, 400));
        })
        .WithName("GetPremi");

        group.MapGet("/{id:guid}", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new GetPremiByIdQuery(id));
            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Data retrieved successfully"))
                : Results.NotFound(ApiErrorResponse.Error(result.Error!, 404));
        })
        .WithName("GetPremiById");

        group.MapPost("/", async (CreatePremiRequestDto dto, IMediator mediator) =>
        {
            var command = new CreatePremiCommand(dto.UserId, dto.TotalAmount, dto.Tenor, dto.DueDay, dto.GracePeriodDays, dto.StartDate);
            var result = await mediator.Send(command);

            if (!result.IsSuccess)
            {
                return result.Errors != null
                    ? Results.BadRequest(ApiErrorResponse.Validation(result.Error!, result.Errors, 400))
                    : Results.BadRequest(ApiErrorResponse.Error(result.Error!, 400));
            }

            return Results.Created(
                $"/api/premi/{result.Data!.Id}",
                ApiResponse<object>.Success(result.Data, 201, "Data created successfully"));
        })
        .WithName("CreatePremi");

        group.MapPut("/{id:guid}", async (Guid id, UpdatePremiRequestDto dto, IMediator mediator) =>
        {
            var command = new UpdatePremiCommand(id, dto.TotalAmount, dto.Tenor, dto.DueDay, dto.GracePeriodDays, dto.StartDate);
            var result = await mediator.Send(command);

            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Data updated successfully"))
                : Results.BadRequest(ApiErrorResponse.Error(result.Error!, 400));
        })
        .WithName("UpdatePremi");

        group.MapPatch("/{id:guid}/cancel", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new CancelPremiCommand(id));
            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Premi cancelled successfully"))
                : Results.BadRequest(ApiErrorResponse.Error(result.Error!, 400));
        })
        .WithName("CancelPremi");
    }
}
