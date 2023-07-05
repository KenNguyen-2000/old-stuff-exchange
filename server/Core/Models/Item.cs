using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public enum ItemStatus
    {
        Default,
        Active,
        Inactive,
        Deleted
    }

    [Table("items")]
    public class Item
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public ItemStatus Status { get; set; }
        public ICollection<ItemImage> Images { get; set; } = new List<ItemImage>();
        public DateTime Created { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Updated { get; set; } = DateTime.Now;
        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Order Order { get; set; }
        public Bill Bill { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}
