using Core.Models;
using Application.DTOs.UserDtos;
using Application.DTOs.CateoryDtos;
using System.Text.Json.Serialization;

namespace Application.DTOs.ItemDtos
{
    public class ItemDto : AuditableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public double Price { get; set; }
        public string Location { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ItemStatus Status { get; set; }
        public ICollection<ItemImageDto> Images { get; set; }
        public UserItemDto User { get; set; }
        public CategoryDto Category { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
