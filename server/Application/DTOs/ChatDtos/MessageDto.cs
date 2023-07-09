using Application.DTOs.UserDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ChatDtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public UserInfoDto Sender { get; set; }
        public RoomChat RoomChat { get; set; }
    }
}
