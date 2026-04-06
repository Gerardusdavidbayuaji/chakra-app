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

public class UserResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? TelegramChatId { get; set; }
    public DateTime CreatedAt { get; set; }
}
