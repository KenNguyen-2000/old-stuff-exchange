using Application.DTOs;
using Application.DTOs.ChatDtos;
using Application.DTOs.MessageDtos;

namespace Application.Interfaces
{
    public interface IMessageService
    {
        Task<MessageDto> AddAsync(CreateMessageDto createMessageDto);
        Task<MessageDto> UpdateAsync(UpdateMessageDto updateMessagedto);
        Task<IEnumerable<RoomChatDto>> GetListRoomChatAsync(int userId);
    }
}