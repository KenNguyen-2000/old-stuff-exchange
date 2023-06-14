using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ReviewDtos;
using Application.DTOs.UserDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public ReviewService(IReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        public async Task<Response<Review>> AddAsync(CreateReviewDto createReviewDto)
        {
            var newReview = _mapper.Map<Review>(createReviewDto);
            var reviewCreated = await _reviewRepository.AddAsync(newReview);

            if(reviewCreated == null)
            {
                return new Response<Review>($"Review itemId {createReviewDto.ItemId} failure");
            }

            return new Response<Review>(newReview, $"Review itemId {createReviewDto.ItemId} success");
        }

        public async Task<Response<string>> DeleteAsync(Guid id)
        {
            var isDelete = await _reviewRepository.DeleteAsync(id);
            if (isDelete)
            {
                return new Response<string>($"Delete reviewId {id} successfully", success: true);
            }
            return new Response<string>($"Delete reviewId {id} failure");
        }

        public async Task<Response<ReviewDto>> GetAsync(Expression<Func<Review, bool>> filter)
        {
            var review = await _reviewRepository.GetAsync(filter);
            if (review != null)
            {
                var userMapped = _mapper.Map<ReviewDto>(review);
                return new Response<ReviewDto>(userMapped, "Get review success!");
            }

            return new Response<ReviewDto>("Get review failure");
        }

        public async Task<Response<ReviewDto>> GetByIdAsync(Guid id)
        {
            var review = await _reviewRepository.GetByIdAsync(id);
            if(review == null)
            {
                return new Response<ReviewDto>($"Get reviewId {id} failure");
            }
            var reviewMapped = _mapper.Map<ReviewDto>(review);
            return new Response<ReviewDto>(reviewMapped, $"Get reviewId {id} success");
        }

        public async Task<Response<ReviewDto>> GetListAsync(Expression<Func<Review, bool>> filter)
        {
            var reviewList = await _reviewRepository.GetListAsync(filter);
            var reviewListMapped = _mapper.Map<IEnumerable<ReviewDto>>(reviewList);
            return new Response<ReviewDto>(reviewListMapped, "Get review list success", count: reviewListMapped.Count());
        }

        public async Task<Response<ReviewDto>> UpdateAsync(UpdateReviewDto updateReviewDto)
        {
            var getReview = await _reviewRepository.GetByIdAsync(updateReviewDto.Id);

            if (getReview != null)
            {
                var reviewNeedUpdate = _mapper.Map<UpdateReviewDto, Review>(updateReviewDto, getReview);


                var reviewUpdated = await _reviewRepository.UpdateAsync(reviewNeedUpdate);
                var reviewUpdatedMapped = _mapper.Map<ReviewDto>(reviewUpdated);

                return new Response<ReviewDto>(reviewUpdatedMapped ,"Update review success");
            }
            return new Response<ReviewDto>("Review not found for update");
        }
    }
}
