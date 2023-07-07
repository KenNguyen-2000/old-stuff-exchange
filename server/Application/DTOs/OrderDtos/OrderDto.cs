using Application.DTOs.ItemDtos;
using Application.DTOs.UserDtos;
using Core.Models;
using System.Text.Json.Serialization;

namespace Application.DTOs.OrderDtos
{
    public class OrderDtos : AuditableEntity
    {
        public ItemDto Item { get; set; }
        public UserItemDto User { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
    }
}