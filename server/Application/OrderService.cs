using System.Linq.Expressions;
using Application.Contracts;
using Application.DTOs;
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

        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<Response<Order>> AddAsync(CreateOrderDtos createOrderDtos)
        {
            Order mappedOrderDto = _mapper.Map<Order>(createOrderDtos);
            Order newOrder = await _orderRepository.AddAsync(mappedOrderDto);

            return new Response<Order>(newOrder);
        }

        public Task<Response<string>> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Response<OrderDtos>> GetAsync(Expression<Func<Order, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<Response<OrderDtos>> GetByIdAsync(Guid id)
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

            getOrder.Status = changeOrderStatusDto.Status;
            var updatedOrder = await _orderRepository.UpdateAsync(getOrder);
            var mappedUpdatedOrder = _mapper.Map<OrderDtos>(updatedOrder);
            return new Response<OrderDtos>(mappedUpdatedOrder);
        }
    }
}