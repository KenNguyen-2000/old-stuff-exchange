using Core.Models;

namespace Application.DTOs.OrderDtos
{
    public class CreateOrderDtos
    {
        public Guid ItemId { get; set; }
        public Guid SellerId { get; set; }
        public Guid BuyerId { get; set; }
        public OrderStatus Status { get; set; }
    }
}