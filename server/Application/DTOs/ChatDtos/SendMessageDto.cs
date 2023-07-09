using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.DTOs.ChatDtos
{
    public class SendMessageDto
    {
        public int? RoomId { get; set; }
        [Required]
        public int SenderId { get; set; }
        [Required]
        public int RecieverId { get; set; }
        [Required]
        public string Content { get; set; }
        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        [JsonIgnore]
        public DateTime UpdatedDate { get; set; }
    }
}
