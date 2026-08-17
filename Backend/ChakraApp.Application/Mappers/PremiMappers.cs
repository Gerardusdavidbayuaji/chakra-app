using ChakraApp.Application.Features.Premi.Dtos;
using ChakraApp.Domain.Entities;
using Mapster;

namespace ChakraApp.Application.Mappers;

public static class PremiMappers
{
    public static PremiResponseDto ToResponseDto(this Premi premi) =>
        premi.Adapt<PremiResponseDto>()!;
}