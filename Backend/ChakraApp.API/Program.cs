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
    .AddOpenApiSetup()
    .AddAuthSetup(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseOpenApiSetup();
app.UseCors();

app.MapAuthEndpoints();
app.MapUserEndpoints();


app.Run();
