using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Models;

namespace Core.Models
{
    [Table("item_images")]
    public class ItemImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string ImageUri { get; set; }
        [Required]
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
    }
}