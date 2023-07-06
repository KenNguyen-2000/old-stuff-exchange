using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Voucher : AuditableEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}