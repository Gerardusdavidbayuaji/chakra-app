using ChakraApp.API.Configurations;
using ChakraApp.API.Endpoints;
using ChakraApp.API.Middlewares;
using ChakraApp.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddPersistence(builder.Configuration)
    .AddMediatRSetup()
    .AddValidationSetup()
    .AddApplicationSetup()
    .AddOpenApiSetup()
    .AddAuthSetup(builder.Configuration);

var app = builder.Build();

app.Logger.LogInformation("Environment: {Environment}", app.Environment.EnvironmentName);
app.Logger.LogInformation("Application: {App}", app.Environment.ApplicationName);

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<EnsureUserMiddleware>();

app.UseOpenApiSetup();
app.UseCors();

app.MapAuthEndpoints();
app.MapUserEndpoints();


app.Run();
