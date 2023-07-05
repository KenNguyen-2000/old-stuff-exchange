using Application.DTOs;
using Application.DTOs.CateoryDtos;
using Core.Models;

namespace Application.Interfaces
{
    public interface ICategoryService
    {

        // Task<Response<ItemDto>> AddAsync(CreateItemDto item);
        Task<Response<CategoryDto>> GetListAsync();
        Task<Response<CategoryDto>> GetByIdAsync(Guid id);

    }
}