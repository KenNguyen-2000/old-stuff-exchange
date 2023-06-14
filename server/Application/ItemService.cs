using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ItemDtos;
using Application.DTOs.ReviewDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public ItemService(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<Response<Item>> AddAsync(CreateItemDto item)
        {
            var newItem = new Item()
            {
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Location = item.Location,
                Status = item.Status,
                UserId = item.UserId,
            };
           var itemCreated = await _itemRepository.AddAsync(newItem);
            if(itemCreated == null)
            {
                return new Response<Item>("Create item failure!");
            }

            return new Response<Item>(itemCreated, "Create item success");
        }

        public async Task<Response<string>> ChangeItemStatusAsync(ChangeItemStatusDto changeItemStatusDto)
        {
            var getItem = await _itemRepository.GetByIdAsync(changeItemStatusDto.Id);

            if(getItem != null)
            {
                var itemNeedToChange = _mapper.Map<ChangeItemStatusDto, Item>(changeItemStatusDto, getItem);
                var itemStatusChanged = await _itemRepository.UpdateAsync(itemNeedToChange);

                return new Response<string>("Item status updated!", success: true);
            }

            return new Response<string>("Item not found");
        }

        public async Task<Response<string>> DeleteAsync(Guid id)
        {
            var isDelete = await _itemRepository.DeleteAsync(id);
            if (isDelete)
            {
                return new Response<string>($"Delete itemId {id} successfully", success: true);
            }
            return new Response<string>($"Delete itemId {id} failure");
        }

        public async Task<Response<ItemDto>> GetAsync(Expression<Func<Item, bool>> filter)
        {
            var item = await _itemRepository.GetAsync(filter);
            if (item != null)
            {
                var itemMapped = _mapper.Map<ItemDto>(item);
                return new Response<ItemDto>(itemMapped, "Get item success!");
            }

            return new Response<ItemDto>("Get item failure");
        }

        public async Task<Response<ItemDto>> GetByIdAsync(Guid id)
        {
            var item = await _itemRepository.GetByIdAsync(id);
            if (item == null)
            {
                return new Response<ItemDto>($"Get itemId {id} failure");
            }
            var itemMapped = _mapper.Map<ItemDto>(item);
            return new Response<ItemDto>(itemMapped, $"Get itemId {id} success");
        }

        public async Task<Response<ItemDto>> GetListAsync()
        {
            var itemList = await _itemRepository.GetListAsync();
            var itemListMapped = _mapper.Map<IEnumerable<ItemDto>>(itemList);

            return new Response<ItemDto>(itemListMapped, "Get item list success", itemListMapped.Count());
        }

        public async Task<Response<Item>> UpdateAsync(UpdateItemDto item)
        {
            var getItem = await _itemRepository.GetByIdAsync(item.Id);

            if(getItem != null)
            {
                var itemNeedUpdate = _mapper.Map<UpdateItemDto, Item>(item, getItem);

                var itemUpdated = await _itemRepository.UpdateAsync(itemNeedUpdate);

                return new Response<Item>(itemUpdated, "Update item success");
            }

            return new Response<Item>("Item not found!");
        }
    }
}
