using System.ComponentModel.DataAnnotations;
using Core.Models;

namespace Application.DTOs.OrderDtos
{
    public class ChangeOrderStatusDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public OrderStatus Status { get; set; }
    }
}