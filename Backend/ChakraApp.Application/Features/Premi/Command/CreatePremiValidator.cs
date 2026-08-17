using FluentValidation;

namespace ChakraApp.Application.Features.Premi.Commands;

public class CreatePremiValidator : AbstractValidator<CreatePremiCommand>
{
    public CreatePremiValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("UserId tidak boleh kosong.");

        RuleFor(x => x.TotalAmount)
            .GreaterThan(0).WithMessage("TotalAmount harus lebih besar dari nol.");

        RuleFor(x => x.Tenor)
            .GreaterThan(0).WithMessage("Tenor harus lebih besar dari nol.");

        RuleFor(x => x.DueDay)
            .InclusiveBetween(1, 31).WithMessage("DueDay harus antara 1 dan 31.");

        RuleFor(x => x.GracePeriodDays)
            .GreaterThanOrEqualTo(0).WithMessage("GracePeriodDays tidak boleh negatif.");

        RuleFor(x => x.StartDate)
            .NotEmpty().WithMessage("StartDate tidak boleh kosong.");
    }
}
