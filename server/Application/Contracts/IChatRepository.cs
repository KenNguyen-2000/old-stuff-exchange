using Application.DTOs.ChatDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts
{
    public interface IChatRepository : IBaseRepository<Message>
    {
        public Task SendMessageAsync(Message message);
        public Task<RoomChat> FindRoomChatAsync(FindRoomChatDto findRoomChatDto);
        public Task AddRoomChat(RoomChat roomChat);
    }
}
