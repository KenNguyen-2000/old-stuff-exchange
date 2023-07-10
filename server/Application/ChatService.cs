using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ChatDtos;
using Application.Interfaces;
using Application.Hubs;
using AutoMapper;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using AutoMapper.Execution;

namespace Application
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IRoomChatRepository _roomChatRepository;


        public ChatService(IChatRepository chatRepository, IMapper mapper, IHubContext<ChatHub> hubContext, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository, IRoomChatRepository roomChatRepository)
        {
            _chatRepository = chatRepository;
            _mapper = mapper;
            _hubContext = hubContext;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _roomChatRepository = roomChatRepository;
        }

        public async Task<IEnumerable<MessageDto>> GetListAsync(int roomId, int senderId)
        {
            var messages = await _chatRepository.GetListAsync(m => m.RoomId == roomId && m.SenderId == senderId);
            var mappedMessages = _mapper.Map<IEnumerable<MessageDto>>(messages);


            return mappedMessages;
        }

        public async Task<IEnumerable<RoomChatDto>> GetListRoomChatAsync(int userId)
        {
            var roomList = await _roomChatRepository.GetListAsync(r => r.Users.Any(u => u.Id == userId));
            var mappedRoomList = _mapper.Map<IEnumerable<RoomChatDto>>(roomList);

            return mappedRoomList;
        }

        public async Task JoinRoom(int roomId)
        {
            await _hubContext.Groups.AddToGroupAsync(GetCurrentConnectionId(), roomId.ToString());
        }

        public async Task LeaveRoom(int roomId)
        {
            await _hubContext.Groups.RemoveFromGroupAsync(GetCurrentConnectionId(), roomId.ToString());
        }

        public async Task<MessageDto> SendMessage(SendMessageDto sendMessageDto, int recieverId)
        {
            sendMessageDto.CreatedDate = DateTime.Now;
            sendMessageDto.UpdatedDate = DateTime.Now;


            var getSender = await _userRepository.GetByIdAsync(sendMessageDto.SenderId);
            var getReceiver = await _userRepository.GetByIdAsync(recieverId);

            RoomChat room = await _roomChatRepository.GetAsync(r => r.Users.Any(u => u.Id == getSender.Id) && r.Users.Any(u => u.Id == getReceiver.Id)); ;
            if (room == null)
            {
                room = new RoomChat()
                {
                    Name = $"{sendMessageDto.SenderId}-{recieverId}",
                    Users = new List<User> { _userRepository.Get(u => u.Id == sendMessageDto.SenderId), _userRepository.Get(u => u.Id == recieverId) }
                };
                await _chatRepository.AddRoomChat(room);

                UserRoomChat userRoomChat = new()
                {
                    RoomChatId = room.Id,
                    UserId = sendMessageDto.SenderId,
                };

            }
            sendMessageDto.RoomId = room.Id;

            var savedMessage = await _chatRepository.SendMessageAsync(_mapper.Map<Message>(sendMessageDto));

            return _mapper.Map<MessageDto>(savedMessage);
        }

        private string GetCurrentConnectionId()
        {
            return _httpContextAccessor.HttpContext.Connection.Id;
        }
    }
}
