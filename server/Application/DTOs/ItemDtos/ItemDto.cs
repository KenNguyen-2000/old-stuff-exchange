using Core.Models;
using Application.DTOs.UserDtos;

namespace Application.DTOs.ItemDtos
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public double Price { get; set; }
        public string Location { get; set; }
        public ItemStatus Status { get; set; }
        public ICollection<ItemImage> Images { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public UserInfoDto User { get; set; }
        public Category Category { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
