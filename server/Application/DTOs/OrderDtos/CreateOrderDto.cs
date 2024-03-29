using Core.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Application.DTOs.OrderDtos
{
    public class CreateOrderDtos
    {
        [Required]
        public int ItemId { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        [JsonIgnore]
        public OrderStatus Status { get; set; } = OrderStatus.In_Progress;
    }
}