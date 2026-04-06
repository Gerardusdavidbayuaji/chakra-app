using ChakraApp.Application.Common;
using ChakraApp.Application.Users.Dtos;
using ChakraApp.Domain.Entities.Enums;
using MediatR;

namespace ChakraApp.Application.Features.Users.Commands;

public record CreateUserCommand(
    string Name,
    string Email,
    string Password,
    string? TelegramChatId
) : IRequest<Result<UserResponseDto>>;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Result<UserResponseDto>>
{
    private readonly IApplicationDbContext _context;

    public CreateUserCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<UserResponseDto>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var emailExists = _context.Users.Any(u => u.Email == request.Email);
        if (emailExists)
            return Result<UserResponseDto>.Failure("Email sudah terdaftar.");

        // TODO: ganti dengan password hashing yang proper (BCrypt / PBKDF2)
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Email = request.Email,
            Password = request.Password,
            TelegramChatId = request.TelegramChatId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<UserResponseDto>.Success(new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            TelegramChatId = user.TelegramChatId,
            CreatedAt = user.CreatedAt
        });
    }
}
