using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ItemDtos;
using Application.DTOs.OrderDtos;
using Application.DTOs.ReviewDtos;
using Application.DTOs.UserDtos;
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
        private readonly IUserService _userService;
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public ItemService(IItemRepository itemRepository, IUserService userService, IOrderService orderService, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _userService = userService;
            _orderService = orderService;
            _mapper = mapper;
        }

        public async Task<Response<ItemDto>> AddAsync(CreateItemDto item)
        {
            try
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
                if (itemCreated == null)
                {
                    return new Response<ItemDto>("Create item failure!");
                }

                var mappedItem = _mapper.Map<ItemDto>(itemCreated);
                await _userService.UpdatePointsAsync(mappedItem.User.Id, 2);

                return new Response<ItemDto>(mappedItem, "Create item success");
            }
            catch (System.Exception error)
            {
                Console.WriteLine(error);
                return new Response<ItemDto>("Something went wrong");
            }
        }

        public async Task<Response<string>> ChangeItemStatusAsync(ChangeItemStatusDto changeItemStatusDto)
        {
            var getItem = await _itemRepository.GetByIdAsync(changeItemStatusDto.Id);

            if (getItem != null)
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

            if (getItem != null)
            {
                var itemNeedUpdate = _mapper.Map<UpdateItemDto, Item>(item, getItem);

                var itemUpdated = await _itemRepository.UpdateAsync(itemNeedUpdate);

                return new Response<Item>(itemUpdated, "Update item success");
            }

            return new Response<Item>("Item not found!");
        }

        public async Task<Response<Item>> PurchaseItemAsync(Guid itemId, Guid userId)
        {
            var getItem = await _itemRepository.GetByIdAsync(itemId);
            if (getItem == null)
            {
                return new Response<Item>("Item with id not found");
            }

            if (await _userService.IsOwner(userId, getItem))
            {
                return new Response<Item>("Forbidden");
            }

            var sellerRes = await _userService.UpdatePointsAsync(getItem.UserId, getItem.Price / 2 * -1);

            if (!sellerRes.Succeeded)
                return new Response<Item>(sellerRes.Message);


            var buyerRes = await _userService.GetByIdAsync(userId);

            if (!buyerRes.Succeeded)
                return new Response<Item>(buyerRes.Message);

            if (buyerRes.Data.Points < getItem.Price)
                return new Response<Item>("Points is not enough to make an action!");

            await _userService.UpdatePointsAsync(buyerRes.Data.Id, getItem.Price / 2 * -1);
            CreateOrderDtos newOrder = new()
            {
                ItemId = getItem.Id,
                UserId = userId,
            };
            var orderRes = await _orderService.AddAsync(newOrder);

            if (!orderRes.Succeeded)
                return new Response<Item>(orderRes.Message);

            getItem.Status = ItemStatus.Inactive;
            var itemUpdated = await _itemRepository.UpdateAsync(getItem);

            return new Response<Item>(itemUpdated, "Purchase item success");
        }
    }
}
