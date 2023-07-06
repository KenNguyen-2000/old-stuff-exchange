using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.AuthDtos
{
    public class LoginRequest
    {
        [DefaultValue("admin")]
        public string Username { get; set; }
        [DefaultValue("1")]
        public string Password { get; set; }
    }
}
