using Core.Models;

namespace Application.DTOs.OrderDtos
{
    public class OrderDtos
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        public OrderStatus Status { get; set; }
    }
}