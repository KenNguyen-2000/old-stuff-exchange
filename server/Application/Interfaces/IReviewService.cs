using Application.DTOs;
using Application.DTOs.ReviewDtos;
using Core.Models;
using System.Linq.Expressions;

namespace Application.Interfaces
{
    public interface IReviewService
    {
        Task<Response<Review>> AddAsync(CreateReviewDto createReviewDto);
        Task<Response<ReviewDto>> GetListAsync(Expression<Func<Review, bool>> filter = null);
        Task<Response<ReviewDto>> GetByIdAsync(int id);
        Task<Response<ReviewDto>> UpdateAsync(UpdateReviewDto review);
        Task<Response<string>> DeleteAsync(int id);
        Task<Response<ReviewDto>> GetAsync(Expression<Func<Review, bool>> filter);
    }
}
