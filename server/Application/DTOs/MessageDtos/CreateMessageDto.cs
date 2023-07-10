using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.MessageDtos
{
    public class CreateMessageDto
    {
        [Required]
        public string Content { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public int SenderId { get; set; }
        [Required]
        public int RecieverId { get; set; }
    }
}