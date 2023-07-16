using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.UserDtos
{
    public class UpdateAvatarDto
    {
        public int Id { get; set; }
        [Required]
        public string ImageUri { get; set; }
    }
}