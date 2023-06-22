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
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
        [Required]
        public Guid SellerId { get; set; }
        public User Seller { get; set; }
        [Required]
        public Guid BuyerId { get; set; }
        public User Buyer { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.In_Progress;
    }
}