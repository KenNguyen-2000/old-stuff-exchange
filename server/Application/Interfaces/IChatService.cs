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
        Task<MessageDto> SendMessage(SendMessageDto sendMessageDto, int recieverId);
        Task<IEnumerable<MessageDto>> GetListAsync(int roomId, int senderId);
        Task JoinRoom(int roomId);
        Task LeaveRoom(int roomId);
        Task<IEnumerable<RoomChatDto>> GetListRoomChatAsync(int userId);


    }
}
