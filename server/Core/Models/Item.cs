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
        [Display(Name = "Default")]
        Default,
        [Display(Name = "Active")]
        Active,
        [Display(Name = "Inactive")]
        Inactive,
        [Display(Name = "Deleted")]
        Deleted
    }

    [Table("items")]
    public class Item : AuditableEntity
    {
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
        [Required]
        public int UserId { get; set; }
        [Required]
        public int CategoryId { get; set; }

        //Relationship
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; } = null;
        public virtual Order Order { get; set; } = null;
        public virtual Bill Bill { get; set; } = null;

        [ForeignKey(nameof(CategoryId))]
        public virtual Category Category { get; set; }
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}