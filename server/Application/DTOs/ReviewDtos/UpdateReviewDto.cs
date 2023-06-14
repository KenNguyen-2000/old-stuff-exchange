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
        public Guid Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public Guid ItemId { get; set; }
        public Guid UserId { get; set; }
    }
}
