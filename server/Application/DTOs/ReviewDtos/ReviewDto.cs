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
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public Item Item { get; set; }
        public User User { get; set; }
    }
}
