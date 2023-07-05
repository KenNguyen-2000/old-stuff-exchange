using System.Linq.Expressions;
using Application.Contracts;
using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly OldStuffExchangeContext _context;

        public CategoryRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }


        public Task<Category> AddAsync(Category entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Category Get(Expression<Func<Category, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetAsync(Expression<Func<Category, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<Category> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<IEnumerable<Category>> GetListAsync(Expression<Func<Category, bool>> predicate = null)
        {
            return predicate == null ? await _context.Categories.ToListAsync()
            : await _context.Categories.Where(predicate).ToListAsync();
        }

        public Task<Category> UpdateAsync(Category entity)
        {
            throw new NotImplementedException();
        }
    }
}