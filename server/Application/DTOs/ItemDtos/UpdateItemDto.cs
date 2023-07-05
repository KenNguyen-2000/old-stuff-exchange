using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Application.DTOs.ItemDtos
{
    public class UpdateItemDto
    {
        [Required]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public double Price { get; set; }
        public string Location { get; set; }
        public ItemStatus Status { get; set; }
        public Guid CategoryId { get; set; }
        public string[] Images { get; set; }
        [JsonIgnore]
        public DateTime Updated { get; set; } = DateTime.Now;
        [Required]
        [JsonIgnore]
        public Guid UserId { get; set; }
    }
}
