using Application.Contracts;
using Application.DTOs;
using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly OldStuffExchangeContext _context;

        public UserRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var deletedUser = await _context.Users.FindAsync(id);
            _context.Users.Remove(deletedUser);
            var data = await _context.SaveChangesAsync();
            if(data > 0)
            {
                return false;
            }
            return true;
        }

        public User Get(Expression<Func<User, bool>> filter)
        {
            return _context.Users.FirstOrDefault(filter);
        }

        public async Task<User> GetAsync(Expression<Func<User, bool>> predicate)
        {
            return await _context.Users.FirstOrDefaultAsync(predicate);
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<ICollection<User>> GetListAsync(Expression<Func<User, bool>> predicate = null)
        {
            return predicate == null ? await _context.Users.ToListAsync() : await _context.Users.Where(predicate).ToListAsync();
        }

        public async Task<User> UpdateAsync(User user)
        {
            
            _context.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

    }
}
