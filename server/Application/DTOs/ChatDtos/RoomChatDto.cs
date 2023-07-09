using Application.DTOs.ChatDtos;
using Application.DTOs.UserDtos;
using Core.Models;

namespace Application.DTOs
{
    public class RoomChatDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserRoomChat> UserRoomChats { get; set; }
        public ICollection<UserInfoDto> Users { get; set; }
        public ICollection<RoomChatMessageDto> Messages { get; set; }
    }
}