using System;
using System.Linq.Expressions;
using System.Net;
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
            var getItem = await _itemService.GetAsync(i => i.Id == createOrderDtos.ItemId);
            if (getItem.Data == null)
            {
                return new Response<Order>("Item with id not found");
            }
            ItemDto item = getItem.Data;

            if (item.User.Id == createOrderDtos.UserId)
            {
                return new Response<Order>("Owner of item cannot make the order");
            }


            item.Status = ItemStatus.Inactive;
            var mappedItem = _mapper.Map<UpdateItemDto>(item);
            var itemUpdatedRes = await _itemService.UpdateAsync(mappedItem);

            if (!itemUpdatedRes.Succeeded) return new Response<Order>(itemUpdatedRes.Message);

            Order mappedOrderDto = _mapper.Map<Order>(createOrderDtos);
            mappedOrderDto.CreatedDate = DateTime.Now;

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

        public async Task<Response<OrderDtos>> GetByIdAsync(int id)
        {
            try
            {
                var order = await _orderRepository.GetAsync(o => o.Id == id);
                if (order == null)
                {
                    return new Response<OrderDtos>($"OrderId {id} not found!", status: HttpStatusCode.NotFound);
                }
                var orderMapped = _mapper.Map<OrderDtos>(order);
                return new Response<OrderDtos>(orderMapped, $"Get orderId {id} success");
            }
            catch (System.Exception)
            {
                return new Response<OrderDtos>($"Get orderId {id} failure", status: HttpStatusCode.InternalServerError);
            }
        }

        public async Task<Response<OrderDtos>> GetListAsync()
        {
            try
            {
                var orderList = await _orderRepository.GetListAsync();
                var orderListMapped = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDtos>>(orderList);

                return new Response<OrderDtos>(orderListMapped, "Get order list success", orderListMapped.Count());
            }
            catch (System.Exception)
            {

                return new Response<OrderDtos>("Get order list failed!");
            }
        }

        public async Task<Response<OrderDtos>> GetUserOrderListAsync(int userId)
        {
            try
            {
                var userItems = await _itemService.GetUserItemListAsync(userId);
                var orderList = await _orderRepository.GetListAsync(o => o.UserId == userId || (o.Item.UserId == userId));
                var orderListMapped = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDtos>>(orderList);

                return new Response<OrderDtos>(orderListMapped, "Get order list success", orderListMapped.Count());
            }
            catch (System.Exception ex)
            {
                return new Response<OrderDtos>(ex.Message);
            }
        }

        public Task<Response<Item>> UpdateAsync(OrderDtos item)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<OrderDtos>> UpdateStatusAsync(ChangeOrderStatusDto changeOrderStatusDto)
        {
            var getOrder = await _orderRepository.GetByIdAsync(changeOrderStatusDto.Id);

            if (getOrder == null)
                return new Response<OrderDtos>("Order not found!", status: HttpStatusCode.NotFound);

            switch (changeOrderStatusDto.Status)
            {
                case OrderStatus.Accepted:
                    {
                        var success = await ConfirmOrder(changeOrderStatusDto.UserId, getOrder);
                        if (!success.Succeeded)
                            return new Response<OrderDtos>(success.Message, status: success.Status);
                        getOrder.Status = changeOrderStatusDto.Status;
                        break;
                    }
                case OrderStatus.Cancelled:
                    {
                        if (getOrder.Status == OrderStatus.Accepted)
                        {
                            var success = await CancelAcceptedOrder(getOrder);
                            if (!success.Succeeded) return new Response<OrderDtos>("Cancel failure");
                            getOrder.Status = changeOrderStatusDto.Status;
                        }
                        break;
                    }
                case OrderStatus.Finished:
                    {
                        var success = await FinishOrder(getOrder);
                        if (!success.Succeeded)
                            return new Response<OrderDtos>("Accept order failure");
                        getOrder.Status = changeOrderStatusDto.Status;
                        break;
                    }
            }
            getOrder.UpdatedDate = DateTime.Now;
            var updatedOrder = await _orderRepository.UpdateAsync(getOrder);
            var mappedUpdatedOrder = _mapper.Map<OrderDtos>(updatedOrder);


            return new Response<OrderDtos>(mappedUpdatedOrder, "Change order status successfully!");
        }

        private async Task<Response<string>> CancelAcceptedOrder(Order order)
        {
            try
            {
                var getItem = await _itemService.GetByIdAsync(order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2);

                if (!sellerRes.Succeeded)
                    return new Response<string>(sellerRes.Message);

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return new Response<string>("Buyer dont have enough points in account");

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2);

                return new Response<string>("Cancel order successfully!", success: true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Response<string>("Cancel order failure!", status: HttpStatusCode.InternalServerError);
            }
        }

        private async Task<Response<string>> ConfirmOrder(int userId, Order order)
        {
            try
            {
                var getItem = await _itemService.GetAsync(i => i.Id == order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;
                ItemDto item = getItem.Data;

                if (userId != getSeller.Id)
                    return new Response<string>("Only seller can confirm order", status: HttpStatusCode.Forbidden);

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2 * -1);

                if (!sellerRes.Succeeded)
                    return new Response<string>(sellerRes.Message, status: HttpStatusCode.BadRequest);

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return new Response<string>("Buyer does not have enough deposit points in account!", status: HttpStatusCode.BadRequest);

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2 * -1);
                item.Status = ItemStatus.Inactive;
                var mappedItem = _mapper.Map<UpdateItemDto>(item);
                var itemUpdatedRes = await _itemService.UpdateAsync(mappedItem);

                return new Response<string>("Confirm order successfully!", success: true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Response<string>("Confirm order failure!", status: HttpStatusCode.InternalServerError);
            }
        }

        private async Task<Response<string>> FinishOrder(Order order)
        {
            try
            {
                var getItem = await _itemService.GetAsync(i => i.Id == order.ItemId);
                var getBuyer = await _userService.GetByIdAsync(order.UserId);
                var getSeller = getItem.Data.User;

                var sellerRes = await _userService.UpdatePointsAsync(getSeller.Id, getItem.Data.Price / 2 * 1 + getItem.Data.Price);

                if (!sellerRes.Succeeded)
                    return new Response<string>(sellerRes.Message);

                if (getBuyer.Data.Points < getItem.Data.Price)
                    return new Response<string>("Buyer does not have enough points!");

                await _userService.UpdatePointsAsync(getBuyer.Data.Id, getItem.Data.Price / 2 * -1);

                return new Response<string>("Finish order successfully!", success: true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Response<string>("Finish order failure!", status: HttpStatusCode.InternalServerError);
            }
        }
    }
}