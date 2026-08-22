using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Installments.Queries;
using MediatR;

namespace ChakraApp.API.Endpoints;

public static class InstallmentEndpoint
{
    public static void MapInstallmentEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api").WithTags("Installments");

        group.MapGet("/premi/{premiId:guid}/installments", async (Guid premiId, IMediator mediator,
            [AsParameters] GetInstallmentsByPremiIdQuery query) =>
        {
            query.PremiId = premiId;
            var result = await mediator.Send(query);
            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Data retrieved successfully"))
                : Results.NotFound(ApiErrorResponse.Error(result.Error!, 404));
        })
        .WithName("GetInstallmentsByPremiId");

        group.MapGet("/installments/{id:guid}", async (Guid id, IMediator mediator) =>
        {
            var result = await mediator.Send(new GetInstallmentByIdQuery(id));
            return result.IsSuccess
                ? Results.Ok(ApiResponse<object>.Success(result.Data!, 200, "Data retrieved successfully"))
                : Results.NotFound(ApiErrorResponse.Error(result.Error!, 404));
        })
        .WithName("GetInstallmentById");
    }
}
