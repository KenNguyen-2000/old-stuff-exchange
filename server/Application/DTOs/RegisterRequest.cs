using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class RegisterRequest
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        [Required]
        public string Dob { get; set; }
        [Required]
        public string Address { get; set; }
        public int Points { get; set; }
        public string Role { get; set; }
    }
}
