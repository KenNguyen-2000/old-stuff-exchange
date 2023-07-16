using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Message : AuditableEntity
    {
        public string Content { get; set; }
        public int RoomId { get; set; }
        public int SenderId { get; set; }
        public bool IsSeen { get; set; }

        // Relationship
        [ForeignKey(nameof(SenderId))]
        public virtual User Sender { get; set; }
        [ForeignKey(nameof(RoomId))]
        public virtual RoomChat RoomChat { get; set; }
    }
}
