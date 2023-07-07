using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ReviewDtos
{
    public class CreateReviewDto
    {
        [Required]
        [MinLength(6)]
        public string Content { get; set; }
        [Required]
        public int Rating { get; set; }
        [Required]
        public int ItemId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
