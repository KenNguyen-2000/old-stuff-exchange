using Application.DTOs.OrderDtos;
using Core.Models;

namespace Application.Contracts
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
    }
}