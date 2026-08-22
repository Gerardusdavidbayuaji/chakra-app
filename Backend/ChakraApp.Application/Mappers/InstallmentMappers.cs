using ChakraApp.Application.Features.Installments.Dtos;
using ChakraApp.Domain.Entities;
using Mapster;

namespace ChakraApp.Application.Mappers;

public static class InstallmentMappers
{
    public static InstallmentResponseDto ToResponseDto(this Installment installment) =>
        installment.Adapt<InstallmentResponseDto>()!;
}
