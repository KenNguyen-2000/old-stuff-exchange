using System.Linq.Expressions;
using Application.Contracts;
using Application.DTOs.OrderDtos;
using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OldStuffExchangeContext _context;

        public OrderRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }

        public async Task<Order> AddAsync(Order newOrder)
        {
            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            return newOrder;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deletedOrder = await _context.Orders.FindAsync(id);
            _context.Orders.Remove(deletedOrder);
            var data = await _context.SaveChangesAsync();
            if (data > 0)
            {
                return false;
            }
            return true;
        }

        public Order Get(Expression<Func<Order, bool>> filter)
        {
            return _context.Orders.FirstOrDefault(filter);
        }

        public async Task<Order> GetAsync(Expression<Func<Order, bool>> predicate)
        {
            return await _context.Orders.FirstOrDefaultAsync(predicate);
        }

        public async Task<Order> GetByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetListAsync(Expression<Func<Order, bool>> predicate = null)
        {
            return predicate == null ? await _context.Orders.ToListAsync() : await _context.Orders.Where(predicate).ToListAsync();
        }

        public async Task<Order> UpdateAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}