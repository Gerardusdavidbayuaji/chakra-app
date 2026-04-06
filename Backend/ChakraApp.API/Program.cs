using ChakraApp.API.Configurations;
using ChakraApp.API.Endpoints;
using ChakraApp.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddPersistence(builder.Configuration)
    .AddMediatRSetup()
    .AddValidationSetup()
    .AddApplicationSetup()
    .AddOpenApiSetup();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.UseOpenApiSetup();
app.UseCors();

app.MapUserEndpoints();

app.Run();
