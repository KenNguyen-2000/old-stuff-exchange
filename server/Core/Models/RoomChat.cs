using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class RoomChat
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        // Relationship
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<UserRoomChat> UserRoomChats { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
