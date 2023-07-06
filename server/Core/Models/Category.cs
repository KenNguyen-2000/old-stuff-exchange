using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    [Table("categories")]
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string ImageUri { get; set; }
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}