using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    [Table("bills")]
    public class Bill : AuditableEntity
    {
        [Required]
        public int UserId { get; set; }
        public int ItemId { get; set; }

        // Relationship
        public virtual Item Item { get; set; }
        public virtual User User { get; set; }
    }
}
