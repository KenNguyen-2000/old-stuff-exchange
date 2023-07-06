using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class AuditableEntity : BaseEntity
    {
        public int? CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public int? UpdatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
