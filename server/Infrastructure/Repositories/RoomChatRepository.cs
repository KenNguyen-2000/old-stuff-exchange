using System.Linq.Expressions;
using Application.Contracts;
using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RoomChatRepository : IRoomChatRepository
    {
        private readonly OldStuffExchangeContext _context;

        public RoomChatRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }
        public Task<RoomChat> AddAsync(RoomChat entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public RoomChat Get(Expression<Func<RoomChat, bool>> filter)
        {
            return _context.RoomChats.Include(r => r.Users).FirstOrDefault(filter);
        }

        public async Task<RoomChat> GetAsync(Expression<Func<RoomChat, bool>> predicate)
        {
            return await _context.RoomChats.Include(r => r.Users).FirstOrDefaultAsync(predicate);
        }

        public async Task<RoomChat> GetByIdAsync(int id)
        {
            return await _context.RoomChats.FindAsync(id);
        }

        public async Task<IEnumerable<RoomChat>> GetListAsync(Expression<Func<RoomChat, bool>> predicate = null)
        {
            return predicate == null ? await _context.RoomChats
            .Include(r => r.Users)
            .Include(r => r.Messages)
            .ToListAsync() : await _context.RoomChats.Where(predicate)
            .Include(r => r.Users)
            .Include(r => r.Messages)
            .ToListAsync();
        }

        public Task<RoomChat> UpdateAsync(RoomChat entity)
        {
            throw new NotImplementedException();
        }
    }
}