using System;
using System.Linq.Expressions;
using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ItemDtos;
using Application.DTOs.OrderDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;

namespace Application
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IItemService _itemService;
        private readonly IUserService _userService;

        public OrderService(IOrderRepository orderRepository, IMapper mapper, IItemService itemService, IUserService userService)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _itemService = itemService;
            _userService = userService;
        }

        public async Task<Response<Order>> AddAsync(CreateOrderDtos createOrderDtos)
        {
            var getItem = await _itemService.GetByIdAsync(createOrderDtos.ItemId);
            if (getItem.Data == null)
            {
                return new Response<Order>("Item with id not found");
            }
            ItemDto item = getItem.Data;

            if (item.User.Id == createOrderDtos.UserId)
            {
                return new Response<Order>("Owner of item cannot make the order");
            }


            item.Status = ItemStatus.Inactive.ToString();
            var mappedItem = _mapper.Map<UpdateItemDto>(item);
            var itemUpdatedRes = await _itemService.UpdateAsync(mappedItem);

            if (!itemUpdatedRes.Succeeded) return new Response<Order>(itemUpdatedRes.Message);

            Order mappedOrderDto = _mapper.Map<Order>(createOrderDtos);
            Order order = await _orderRepository.AddAsync(mappedOrderDto);

            return new Response<Order>(order, "Create order successfully!");
        }

        public Task<Response<string>> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Response<OrderDtos>> GetAsync(Expression<Func<Order, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<Response<OrderDtos>> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Response<OrderDtos>> GetListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Response<Item>> UpdateAsync(OrderDtos item)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<OrderDtos>> UpdateStatusAsync(ChangeOrderStatusDto changeOrderStatusDto)
        {
            var getOrder = await _orderRepository.GetByIdAsync(changeOrderStatusDto.Id);

            if (getOrder == null)
                return new Response<OrderDtos>("Order not found!");

            switch (changeOrderStatusDto.Status)
            {
                case OrderStatus.Accepted:
                    {
                        bool success = await ConfirmOrder(getOrder);
                        if (!success)
                            return new Response<OrderDtos>("Accept order failure");
                        getOrder.Status = changeOrderStatusDto.Status;
                        break;
                    }
                case OrderStatus.Cancelled:
                    {
                        if (getOrder.Status == OrderStatus.Accepted)
                        {
                            bool success = await CancelAcceptedOrder(getOrder);
                            if (!success) return new Response<OrderDtos>("Cancel failure");
                            getOrder.Status = changeOrderStatusDto.Status;
                        }
                        break;
                    }
                case OrderStatus.Finished:
                    {
                        bool success = await FinishOrder(getOrder);
                        if (!success)
                            return new Response<OrderDtos>("Accept order failure");
                        getOrder.Status = changeOrderStatusDto.Status;
                        break;
                    }
            }

            var updatedOrder = await _orderRepository.UpdateAsync(getOrder);
            var mappedUpdatedOrder = _mapper.Map<OrderDtos>(updatedOrder);


            return new Response<OrderDtos>(mappedUpdatedOrder);
        }

        private async Task<bool> CancelAcceptedOrder(Order order)
        {
            try
            {
                var getItem = await _itemService.GetByIdAsync(order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2);

                if (!sellerRes.Succeeded)
                    return false;

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return false;

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        private async Task<bool> ConfirmOrder(Order order)
        {
            try
            {
                var getItem = await _itemService.GetByIdAsync(order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;
                ItemDto item = getItem.Data;

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2 * -1);

                if (!sellerRes.Succeeded)
                    return false;

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return false;

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2 * -1);
                item.Status = ItemStatus.Inactive.ToString();
                var mappedItem = _mapper.Map<UpdateItemDto>(item);
                var itemUpdatedRes = await _itemService.UpdateAsync(mappedItem);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        private async Task<bool> FinishOrder(Order order)
        {
            try
            {
                var getItem = await _itemService.GetByIdAsync(order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2 * -1);

                if (!sellerRes.Succeeded)
                    return false;

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return false;

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2 * -1);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}