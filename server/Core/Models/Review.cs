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
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [MinLength(1)]
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; } = DateTime.Now;
        [Required]
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
