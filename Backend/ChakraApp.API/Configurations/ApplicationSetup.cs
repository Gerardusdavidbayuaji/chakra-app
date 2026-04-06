namespace ChakraApp.API.Configurations;

public static class ApplicationSetup
{
    public static IServiceCollection AddApplicationSetup(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

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
