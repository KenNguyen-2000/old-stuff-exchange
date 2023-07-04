using Application.DTOs;
using Application.DTOs.ItemDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IItemService
    {
        Task<Response<ItemDto>> AddAsync(CreateItemDto item);
        Task<Response<ItemDto>> GetListAsync();
        Task<Response<ItemDto>> GetByIdAsync(Guid id);
        Task<Response<Item>> UpdateAsync(UpdateItemDto item);
        Task<Response<string>> DeleteAsync(Guid id);
        Task<Response<ItemDto>> GetAsync(Expression<Func<Item, bool>> filter);
        Task<Response<string>> ChangeItemStatusAsync(ChangeItemStatusDto changeItemStatusDto);

    }
}
