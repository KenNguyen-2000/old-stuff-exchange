using Application.DTOs.ChatDtos;
using Application.DTOs.MessageDtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        private readonly IMessageService _messageService;
        private readonly IHttpContextAccessor _contextAccessor;


        public ChatHub(IChatService chatService, IMessageService messageService, IHttpContextAccessor contextAccessor)
        {
            _chatService = chatService;
            _messageService = messageService;
            _contextAccessor = contextAccessor;
        }
        // public async Task NewMessage(int userId, string message)
        // {
        //     await Clients.All.SendAsync("messageReceived", userId, message);
        // }

        // public override async Task OnConnectedAsync()
        // {
        //     var userId = GetUserId();
        //     var roomId = GetRoomId();

        //     var messages = await _chatService.GetListAsync(roomId, userId);

        //     foreach (var message in messages)
        //     {
        //         await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", message.RoomChat.Id, message.Sender.Id, message.Content);
        //     }

        //     await base.OnConnectedAsync();
        // }

        [Authorize]
        public async Task SendMessage([FromBody] CreateMessageDto createMessageDto)
        {
            try
            {
                var userId = _contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


                createMessageDto.SenderId = int.Parse(userId);

                await Clients.User(createMessageDto.RecieverId.ToString()).SendAsync("ReceiveMessage", createMessageDto.SenderId, createMessageDto.RecieverId, createMessageDto.Content);

                var newMessage = await _messageService.AddAsync(createMessageDto);

            }
            catch (System.Exception e)
            {
                Console.WriteLine(e);
            }

        }

        private int GetUserId(IHttpContextAccessor _httpContextAccessor)
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
    }
}
