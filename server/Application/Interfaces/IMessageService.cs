using Application.DTOs;
using Application.DTOs.ChatDtos;
using Application.DTOs.MessageDtos;

namespace Application.Interfaces
{
    public interface IMessageService
    {
        Task<Response<MessageDto>> AddAsync(CreateMessageDto createMessageDto);
        Task<Response<MessageDto>> UpdateAsync(UpdateMessageDto updateMessagedto);
        Task<Response<RoomChatDto>> GetListRoomChatAsync(int userId);
    }
}