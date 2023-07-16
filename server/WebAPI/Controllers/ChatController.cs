using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/v1/chats")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public ChatController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [Authorize]
        [HttpGet("rooms")]
        public async Task<IActionResult> GetUserRoomChats()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userId = identity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                var userList = await _messageService.GetListRoomChatAsync(int.Parse(userId));

                if (userList.Succeeded)
                    return Ok(userList);
                else
                    return BadRequest(userList);
            }
            return Unauthorized("Invalid token");
        }

    }
}
