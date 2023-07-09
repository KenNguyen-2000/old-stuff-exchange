using Application.DTOs.ChatDtos;
using Application.Hubs;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("/api/v1/chats")]
    public class ChatController : Controller
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }



        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto sendMessageDto)
        {
            if (HttpContext.User.Identity is ClaimsIdentity claimsIdentity)
            {
                var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)!.Value;
                await _chatService.SendMessage(sendMessageDto, int.Parse(userId));
            }
            // Save the message to the database


            return Ok();
        }

        [HttpPost("join/{roomId:int}")]
        public async Task<IActionResult> JoinRoom(int roomId)
        {
            await _chatService.JoinRoom(roomId);
            return Ok();
        }

        [HttpPost("leave/{roomId:int}")]
        public async Task<IActionResult> LeaveRoom(int roomId)
        {
            await _chatService.LeaveRoom(roomId);
            return Ok();
        }
    }
}
