using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Models;

namespace Core.Models
{
    [Table("item_images")]
    public class ItemImage : BaseEntity
    {
        [Required]
        public string ImageUri { get; set; }
        [Required]
        public int ItemId { get; set; }

        // Relationship
        public virtual Item Item { get; set; }
    }
}