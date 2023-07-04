using Core.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Application.DTOs.OrderDtos
{
    public class CreateOrderDtos
    {
        [Required]
        public Guid ItemId { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
        [JsonIgnore]
        public OrderStatus Status { get; set; } = OrderStatus.In_Progress;
    }
}