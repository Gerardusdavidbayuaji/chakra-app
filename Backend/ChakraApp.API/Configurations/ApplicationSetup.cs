using ChakraApp.Application.Features.Midtrans.Settings;
using ChakraApp.Application.Services;
using ChakraApp.Application.Services;

namespace ChakraApp.API.Configurations;

public static class ApplicationSetup
{
    public static IServiceCollection AddApplicationSetup(this IServiceCollection services,  IConfiguration configuration)
    {
        services.AddEndpointsApiExplorer();
        services.AddScoped<PremiCompletionService>();
        services.Configure<MidtransSettings>(configuration.GetSection(MidtransSettings.SectionsName));

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return services;
    }
}
