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
        Inactive
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
        [NotMapped]
        public string[] Images { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; } = DateTime.Now;
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Order Order { get; set; }
        public Bill Bill { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}
