namespace ChakraApp.Application.Users.Dtos;

public class CreateUserRequestDto
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? TelegramChatId { get; set; }
}

public class UpdateUserRequestDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public string? TelegramChatId { get; set; }
}