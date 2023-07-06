using Application.DTOs.ReviewDtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/v1/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }
        // GET: api/<ReviewController>
        [HttpGet]
        public async Task<IActionResult> GetItemReviews([FromQuery(Name = "itemId")] int itemId)
        {
            var result = await _reviewService.GetListAsync(r => r.ItemId == itemId);
            if (!result.Succeeded)
            {
                return BadRequest(result.Message);
            }

            return Ok(result);
        }

        // GET api/<ReviewController>/5
        [HttpGet("{reviewId:int}")]
        public async Task<IActionResult> GetReviewById(int reviewId)
        {
            var result = await _reviewService.GetByIdAsync(reviewId);
            if (!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        // POST api/<ReviewController>
        [Authorize]
        [HttpPost]
        public  async Task<IActionResult> CreateReview([FromBody] CreateReviewDto createReviewDto)
        {
            var result = await _reviewService.AddAsync(createReviewDto);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        // PUT api/<ReviewController>/5
        [Authorize]
        [HttpPut("{reviewId:int}")]
        public async Task<IActionResult> UpdateItemReview(int reviewId, [FromBody] UpdateReviewDto updateReviewDto)
        {
            var result = await _reviewService.UpdateAsync(updateReviewDto);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        // DELETE api/<ReviewController>/5
        [Authorize]
        [HttpDelete("{reviewId:int}")]
        public async Task<IActionResult> Delete(int reviewId)
        {
            var result = await _reviewService.DeleteAsync(reviewId);
            if (!result.Succeeded)
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}
