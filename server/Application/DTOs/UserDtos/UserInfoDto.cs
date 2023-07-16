﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.UserDtos
{
    public class UserInfoDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }

        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public double Points { get; set; }
        public string Role { get; set; }
        public string ImageUri { get; set; }
    }
}
