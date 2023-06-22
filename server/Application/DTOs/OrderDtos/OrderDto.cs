using Core.Models;

namespace Application.DTOs.OrderDtos
{
    public class OrderDtos
    {
        public Guid Id { get; set; }
        public Guid ItemId { get; set; }
        public Guid SellerId { get; set; }
        public Guid BuyerId { get; set; }
        public OrderStatus Status { get; set; }
    }
}