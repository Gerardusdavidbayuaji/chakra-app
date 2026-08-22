using ChakraApp.Application.Common;
using ChakraApp.Application.Features.Midtrans.Command;
using ChakraApp.Application.Features.Midtrans.Dtos;
using MediatR;

namespace ChakraApp.API.Endpoints;

public static class MidtransWebhookEndpoint
{
    public static void MapMidtransWebhookEndpoints(this
        WebApplication app)
    {
        var group =
            app.MapGroup("/api/midtrans").WithTags("Midtrans");

        group.MapPost("/webhook", async
                (MidtransNotificationDto notification, IMediator mediator) =>
            {
                var result = await mediator.Send(new
                    ProcessMidtransWebhookCommand(notification));

                return result.IsSuccess
                    ? Results.Ok(ApiResponse<object>.Success(
                        new { message = result.Data }, 200,
                        "Notification processed"))
                    :
                    Results.BadRequest(ApiErrorResponse.Error(result.Error!,
                        400));
            })
            .AllowAnonymous()
            .WithName("MidtransWebhook");
    }
}