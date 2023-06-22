using Core.Models;

namespace Application.DTOs.OrderDtos
{
    public class CreateOrderDtos
    {
        public Guid ItemId { get; set; }
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.In_Progress;
    }
}