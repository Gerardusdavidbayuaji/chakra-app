using FluentValidation;

namespace ChakraApp.Application.Features.Users.Commands;

public class CreateUserValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nama tidak boleh kosong.")
            .MaximumLength(255);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email tidak boleh kosong.")
            .EmailAddress().WithMessage("Format email tidak valid.")
            .MaximumLength(255);

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password tidak boleh kosong.")
            .MinimumLength(8).WithMessage("Password minimal 8 karakter.");
    }
}
