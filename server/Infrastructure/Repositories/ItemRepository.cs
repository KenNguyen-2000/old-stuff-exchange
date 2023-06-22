using Application.Contracts;
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
    public class ItemRepository : IItemRepository
    {
        private readonly OldStuffExchangeContext _context;

        public ItemRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }


        public async Task<Item> AddAsync(Item newItem)
        {
            await _context.Items.AddAsync(newItem);
            await _context.SaveChangesAsync();

            return newItem;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var deletedItem = await _context.Items.FindAsync(id);
            _context.Items.Remove(deletedItem);
            var data = await _context.SaveChangesAsync();
            if (data > 0)
            {
                return false;
            }
            return true;
        }

        public Item Get(Expression<Func<Item, bool>> filter)
        {
            return _context.Items.FirstOrDefault(filter);
        }

        public async Task<Item> GetAsync(Expression<Func<Item, bool>> predicate)
        {
            return await _context.Items.FirstOrDefaultAsync(predicate);
        }

        public async Task<Item> GetByIdAsync(Guid id)
        {
            return await _context.Items.FindAsync(id);
        }

        public async Task<IEnumerable<Item>> GetListAsync(Expression<Func<Item, bool>> predicate = null)
        {
            return predicate == null ? await _context.Items.Include(i => i.User).ToListAsync() : await _context.Items.Where(predicate).Include(i => i.User).ToListAsync();
        }

        public async Task<Item> UpdateAsync(Item item)
        {
            _context.Items.Update(item);
            await _context.SaveChangesAsync();

            return item;
        }
    }
}
