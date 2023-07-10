using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.MessageDtos
{
    public class UpdateMessageDto
    {
        [Required]
        public int Id;
        [Required]
        public string Content;
    }
}