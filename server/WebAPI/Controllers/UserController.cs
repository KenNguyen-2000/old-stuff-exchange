using Application.DTOs.UserDtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId:Guid}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var userRes = await _userService.GetByIdAsync(userId);
            if(!userRes.Succeeded)
            {
                return NotFound(userRes);
            }

            return Ok(userRes);
        }

        [HttpDelete("delete/{userId:Guid}")]
        public async Task<IActionResult> DeleteUserById(Guid userId)
        {
            var result = await _userService.DeleteAsync(userId);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto userUpdateDto)
        {
            var result = await _userService.UpdateAsync(userUpdateDto);
            if(!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
