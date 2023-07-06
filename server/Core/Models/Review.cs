using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    [Table("reviews")]
    public class Review : AuditableEntity
    {
        [Required]
        [MinLength(1)]
        public string Content { get; set; }
        public int Rating { get; set; }
        [Required]
        public int ItemId { get; set; }
        [Required]
        public int UserId { get; set; }

        // Relationship
        public virtual User User { get; set; }
        public virtual Item Item { get; set; }
    }
}
