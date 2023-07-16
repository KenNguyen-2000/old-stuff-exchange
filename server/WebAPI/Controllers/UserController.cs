using System.Security.Claims;
using Application.DTOs.UserDtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/v1/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var userList = await _userService.GetListAsync();
            if (!userList.Succeeded)
            {
                return BadRequest(userList);
            }

            return Ok(userList);
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var userRes = await _userService.GetByIdAsync(userId);
            if (!userRes.Succeeded)
            {
                return NotFound(userRes);
            }

            return Ok(userRes);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{userId:int}")]
        public async Task<IActionResult> DeleteUserById(int userId)
        {
            var result = await _userService.DeleteAsync(userId);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto userUpdateDto)
        {
            var result = await _userService.UpdateAsync(userUpdateDto);
            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPatch("update-avatar")]
        public async Task<IActionResult> UpdateAvatar([FromBody] UpdateAvatarDto userUpdateDto)
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = identity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                userUpdateDto.Id = int.Parse(userId);
                var result = await _userService.UpdateAvatar(userUpdateDto);
                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }
            }


            return Unauthorized("Token invalid");
        }
    }
}
