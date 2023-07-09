using Application.Contracts;
using Application.DTOs.ChatDtos;
using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly OldStuffExchangeContext _context;

        public ChatRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }

        public Task<Message> AddAsync(Message entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Message Get(Expression<Func<Message, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<Message> GetAsync(Expression<Func<Message, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<Message> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Message>> GetListAsync(Expression<Func<Message, bool>> predicate = null)
        {
            return predicate == null ?
            await _context.Messages.Include(i => i.Sender)
            .Include(i => i.RoomChat).ToListAsync()
           : await _context.Messages.Where(predicate)
           .Include(i => i.Sender)
           .Include(i => i.RoomChat).ToListAsync();
        }


        public async Task<RoomChat> FindRoomChatAsync(FindRoomChatDto findRoomChatDto)
        {
            var roomChat = await _context.RoomChats.Include(r => r.Users)
                .FirstOrDefaultAsync(r => r.Users.Any(u => u.Id == findRoomChatDto.SenderId) && r.Users.Any(u => u.Id == findRoomChatDto.RecieverId));
            return roomChat;
        }

        public async Task SendMessageAsync(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
        }

        public Task<Message> UpdateAsync(Message entity)
        {
            throw new NotImplementedException();
        }

        public async Task AddRoomChat(RoomChat roomChat)
        {
            _context.Add(roomChat);
            await _context.SaveChangesAsync();
        }
    }
}
