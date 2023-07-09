using Application.DTOs.ChatDtos;
using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHubContext _hubContext;

        public ChatHub(IChatService chatService, IHttpContextAccessor httpContextAccessor, IHubContext hubContext)
        {
            _chatService = chatService;
            _httpContextAccessor = httpContextAccessor;
            _hubContext = hubContext;
        }
        public async Task NewMessage(int userId, string message)
        {
            await Clients.All.SendAsync("messageReceived", userId, message);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = GetUserId();
            var roomId = GetRoomId();

            var messages = await _chatService.GetListAsync(roomId, userId);

            foreach (var message in messages)
            {
                await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", message.RoomChat.Id, message.Sender.Id, message.Content);
            }

            await base.OnConnectedAsync();
        }

        public async Task SendMessage([FromBody] SendMessageDto sendMessageDto)
        {
            await _chatService.SendMessage(sendMessageDto, GetUserId());

            await Clients.Group(sendMessageDto.RoomId.ToString()).SendAsync("ReceiveMessage", sendMessageDto.RoomId, sendMessageDto.SenderId, sendMessageDto.Content);
            await _hubContext.Clients.Group(sendMessageDto.RoomId.ToString()).SendAsync("ReceiveMessage", sendMessageDto.RoomId, sendMessageDto.SenderId, sendMessageDto.Content);
        }

        private int GetUserId()
        {
            // Implement your logic to retrieve the user ID
            var httpContext = _httpContextAccessor.HttpContext;
            // Example: Get user ID from claims
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            // Return the user ID as an integer
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
            // Return a default value or throw an exception if the user ID is not available
            throw new InvalidOperationException("User ID not found.");
        }

        private int GetRoomId()
        {
            // Implement your logic to retrieve the room ID
            var httpContext = _httpContextAccessor.HttpContext;
            // Example: Retrieve the room ID from query string
            var roomId = httpContext.Request.Query["roomId"].ToString();
            // Return the room ID as an integer
            return Convert.ToInt32(roomId);
        }
    }
}
