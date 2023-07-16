using Application.DTOs.UserDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ChatDtos
{
    public class RoomChatMessageDto : AuditableEntity
    {
        public string Content { get; set; }
        public bool IsSeen { get; set; }
        public UserInfoDto Sender { get; set; }
    }
}
