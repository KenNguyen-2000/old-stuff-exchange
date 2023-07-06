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
    public class ReviewRepository : IReviewRepository
    {
        private readonly OldStuffExchangeContext _context;

        public ReviewRepository(OldStuffExchangeContext context)
        {
            _context = context;
        }

        public async Task<Review> AddAsync(Review entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deletedReview = await _context.Reviews.FindAsync(id);
            _context.Reviews.Remove(deletedReview);
            var data = await _context.SaveChangesAsync();
            if (data > 0)
            {
                return false;
            }
            return true;
        }

        public Review Get(Expression<Func<Review, bool>> filter)
        {
            return _context.Reviews.FirstOrDefault(filter);
        }

        public async Task<Review> GetAsync(Expression<Func<Review, bool>> predicate)
        {
            return await _context.Reviews.FirstOrDefaultAsync(predicate);
        }

        public async Task<Review> GetByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<IEnumerable<Review>> GetListAsync(Expression<Func<Review, bool>> predicate = null)
        {
            return predicate == null ? await _context.Reviews.ToListAsync() : await _context.Reviews.Where(predicate).ToListAsync();
        }

        public async Task<Review> UpdateAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();

            return review;
        }
    }
}
