using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ItemDtos
{
    public class ChangeItemStatusDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public ItemStatus Status { get; set; }
    }
}
