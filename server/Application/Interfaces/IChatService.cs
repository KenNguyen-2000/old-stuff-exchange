using Application.DTOs.ItemDtos;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.ChatDtos;
using Core.Models;

namespace Application.Interfaces
{
    public interface IChatService
    {
        public Task<MessageDto> SendMessage(SendMessageDto sendMessageDto, int recieverId);
        public Task<IEnumerable<MessageDto>> GetListAsync(int roomId, int senderId);
        public Task JoinRoom(int roomId);
        public Task LeaveRoom(int roomId);
        public Task<IEnumerable<RoomChatDto>> GetListRoomChatAsync(int userId);


    }
}
