using Core.Models;
using Application.DTOs.UserDtos;
using Application.DTOs.CateoryDtos;

namespace Application.DTOs.ItemDtos
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public double Price { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public ICollection<ItemImageDto> Images { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public UserItemDto User { get; set; }
        public CategoryDto Category { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
