using Application.DTOs.ItemDtos;
using Core.Models;
using System.Text.Json.Serialization;

namespace Application.DTOs.OrderDtos
{
    public class OrderDtos
    {
        public int Id { get; set; }
        public ItemDto Item { get; set; }
        public int SellerId { get; set; }
        public int BuyerId { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public OrderStatus Status { get; set; }
    }
}