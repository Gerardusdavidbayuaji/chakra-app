using ChakraApp.Application;

namespace ChakraApp.API.Configurations;

public static class MediatRSetup
{
    public static IServiceCollection AddMediatRSetup(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(typeof(ApplicationAssemblyReference).Assembly);
        });

        return services;
    }
}
