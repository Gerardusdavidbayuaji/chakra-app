param (
    [string]$MigrationName = ""
)

$baseCommand = "dotnet ef database update --project ChakraApp.Infrastructure/ChakraApp.Infrastructure.csproj --startup-project ChakraApp.API/ChakraApp.API.csproj"

if (![string]::IsNullOrWhiteSpace($MigrationName)) {
    $baseCommand += " $MigrationName"
}

Invoke-Expression $baseCommand
