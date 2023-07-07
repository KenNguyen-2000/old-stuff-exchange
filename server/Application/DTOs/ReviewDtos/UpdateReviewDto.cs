using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ReviewDtos
{
    public class UpdateReviewDto
    {
        [Required]
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int ItemId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
