using Application.Contracts;
using Application.DTOs;
using Application.DTOs.CateoryDtos;
using Application.DTOs.ItemDtos;
using Application.Interfaces;
using AutoMapper;

namespace Application
{
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<Response<CategoryDto>> GetByIdAsync(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
                return new Response<CategoryDto>("Category not found!");
            else
                return new Response<CategoryDto>(_mapper.Map<CategoryDto>(category), "Get category by Id successfully!");
        }

        public async Task<Response<CategoryDto>> GetListAsync()
        {
            var categoryList = await _categoryRepository.GetListAsync();
            var categoryListMapped = _mapper.Map<IEnumerable<CategoryDto>>(categoryList);

            return new Response<CategoryDto>(categoryListMapped, "Get item list success", categoryListMapped.Count());
        }
    }
}