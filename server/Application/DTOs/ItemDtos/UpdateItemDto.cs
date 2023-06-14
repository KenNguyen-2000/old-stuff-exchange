﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string[] Images { get; set; }
        public DateTime Updated { get; set; } = DateTime.Now;
        [Required]
        public Guid UserId { get; set; }
    }
}