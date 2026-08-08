param (
    [Parameter(Mandatory=$true)][string]$MigrationName
)

dotnet ef migrations add $MigrationName `
    --project ChakraApp.Infrastructure/ChakraApp.Infrastructure.csproj `
    --startup-project ChakraApp.API/ChakraApp.API.csproj
