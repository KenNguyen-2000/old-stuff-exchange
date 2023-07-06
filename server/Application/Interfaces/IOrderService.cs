using System.Linq.Expressions;
using Application.DTOs;
using Application.DTOs.OrderDtos;
using Core.Models;

namespace Application.Interfaces
{
    public interface IOrderService
    {
        Task<Response<Order>> AddAsync(CreateOrderDtos createOrderDtos);
        Task<Response<OrderDtos>> GetListAsync();
        Task<Response<OrderDtos>> GetByIdAsync(int id);
        Task<Response<Item>> UpdateAsync(OrderDtos orderDtos);
        Task<Response<string>> DeleteAsync(int id);
        Task<Response<OrderDtos>> GetAsync(Expression<Func<Order, bool>> filter);

        Task<Response<OrderDtos>> UpdateStatusAsync(ChangeOrderStatusDto changeOrderStatusDto);
    }
}