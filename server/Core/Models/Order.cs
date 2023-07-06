using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public enum OrderStatus
    {
        In_Progress,
        Accepted,
        Cancelled,
        Finished
    }
    public class Order : AuditableEntity
    {
        [Required]
        public int ItemId { get; set; }
        [Required]
        public int UserId { get; set; }

        // Relationship
        [ForeignKey(nameof(ItemId))]
        public virtual Item Item { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public virtual OrderStatus Status { get; set; } = OrderStatus.In_Progress;
        
    }
}