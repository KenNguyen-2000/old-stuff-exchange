using Application.Contracts;
using Application.DTOs;
using Application.DTOs.ChatDtos;
using Application.DTOs.MessageDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;

namespace Application
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IRoomChatRepository _roomChatRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository messageRepository, IRoomChatRepository roomChatRepository, IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepository = messageRepository;
            _roomChatRepository = roomChatRepository;
            _userRepository = userRepository;
        }

        public async Task<Response<MessageDto>> AddAsync(CreateMessageDto createMessageDto)
        {
            var newMessage = new Message()
            {
                Content = createMessageDto.Content,
                SenderId = createMessageDto.SenderId,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };

            var existingRoom = await _roomChatRepository.GetAsync(r => r.Id == createMessageDto.RoomId || (r.Users.Any(u => u.Id == createMessageDto.SenderId) && r.Users.Any(u => u.Id == createMessageDto.RecieverId)));

            if (existingRoom == null)
            {
                var getReceiver = await _userRepository.GetByIdAsync(createMessageDto.RecieverId);
                var getSender = await _userRepository.GetByIdAsync(createMessageDto.SenderId);

                existingRoom = new RoomChat()
                {
                    Name = $"Room Chat {createMessageDto.SenderId}-{createMessageDto.RecieverId}",
                    Users = new List<User> { getReceiver, getSender }
                };

                await _roomChatRepository.AddAsync(existingRoom);
            }

            newMessage.RoomId = existingRoom.Id;

            await _messageRepository.AddAsync(newMessage);
            var mappedMessage = _mapper.Map<MessageDto>(newMessage);
            return new Response<MessageDto>(mappedMessage, "Add message successfully!");
        }

        public async Task<Response<MessageDto>> UpdateAsync(UpdateMessageDto updateMessagedto)
        {
            var getMessage = await _messageRepository.GetByIdAsync(updateMessagedto.Id);

            if (getMessage != null)
            {
                getMessage.Content = updateMessagedto.Content;
                var updatedMessage = await _messageRepository.UpdateAsync(getMessage);
                var mappedMessage = _mapper.Map<MessageDto>(updatedMessage);
                return new Response<MessageDto>(mappedMessage, "Update message successfully!");
            }

            throw new NotImplementedException();
        }

        public async Task<Response<RoomChatDto>> GetListRoomChatAsync(int userId)
        {
            var roomList = await _roomChatRepository.GetListAsync(r => r.Users.Any(u => u.Id == userId));
            var mappedRoomList = _mapper.Map<IEnumerable<RoomChatDto>>(roomList);

            return new Response<RoomChatDto>(mappedRoomList, "Get list room chat successfully!", mappedRoomList.Count());
        }
    }
}