using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ItemDtos
{
    public class CreateItemDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public ItemStatus Status { get; set; }
        public string[] Images { get; set; } = Array.Empty<string>();
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
        public Guid UserId { get; set; }
    }
}
