using System.Linq.Expressions;
using Application.Contracts;
using Core.Models;
using Infrastructure.Context;

namespace Infrastructure.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly OldStuffExchangeContext _context;

        public MessageRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }

        public async Task<Message> AddAsync(Message entity)
        {
            _context.Messages.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
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

        public Task<IEnumerable<Message>> GetListAsync(Expression<Func<Message, bool>> predicate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Message> UpdateAsync(Message entity)
        {
            _context.Messages.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
    }
}