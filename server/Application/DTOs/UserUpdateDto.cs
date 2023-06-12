using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class UserUpdateDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }
        public string Dob { get; set; }
        public string Address { get; set; }
        public int Points { get; set; }
        public string Role { get; set; }
    }
}
