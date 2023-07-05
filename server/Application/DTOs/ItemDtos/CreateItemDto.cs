using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
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
        public Guid CategoryId { get; set; }
        [Required]
        [JsonIgnore]
        public ItemStatus Status { get; set; } = ItemStatus.Default;
        public string[] Images { get; set; } = Array.Empty<string>();
        [JsonIgnore]
        public DateTime Created { get; set; } = DateTime.Now;
        [JsonIgnore]
        public DateTime Updated { get; set; } = DateTime.Now;
        [Required]
        [JsonIgnore]
        public Guid UserId { get; set; }
    }
}
