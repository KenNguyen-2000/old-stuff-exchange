using Application.Contracts;
using Application.DTOs.ItemDtos;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public ItemRepository(OldStuffExchangeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<Item> AddAsync(Item newItem)
        {
            await _context.Items.AddAsync(newItem);
            await _context.SaveChangesAsync();

            await _context.Entry(newItem).Reference(i => i.User).LoadAsync();

            return newItem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem == null)
                return false;

            existingItem.Status = ItemStatus.Deleted;
            existingItem.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();

            return true;
        }

        public Item Get(Expression<Func<Item, bool>> filter)
        {
            return _context.Items.FirstOrDefault(filter);
        }

        public async Task<Item> GetAsync(Expression<Func<Item, bool>> predicate)
        {
            return await _context.Items
                .Include(item => item.User)
                .Include(item => item.Category)
                .Include(i => i.Images)
                .FirstOrDefaultAsync(predicate);
        }

        public async Task<Item> GetByIdAsync(int id)
        {
            return await _context.Items.FirstOrDefaultAsync(item => item.Id == id);
        }

        public async Task<IEnumerable<Item>> GetListAsync(Expression<Func<Item, bool>> predicate = null)
        {
            return predicate == null ? await _context.Items.Include(i => i.User).Include(i => i.Images).Include(i => i.Category).ToListAsync()
            : await _context.Items.Where(predicate).Include(i => i.User).Include(i => i.Images).Include(i => i.Category).ToListAsync();
        }

        public async Task<Item> UpdateAsync(Item item)
        {
            _context.Items.Update(item);
            await _context.SaveChangesAsync();

            return item;
        }

        public async Task<bool> DeleteItemImages(int itemId)
        {
            var imagesToDelete = _context.ItemImages.Where(e => e.ItemId == itemId);
            _context.ItemImages.RemoveRange(imagesToDelete);
            var data = await _context.SaveChangesAsync();
            return data > 0;
        }
    }
}
