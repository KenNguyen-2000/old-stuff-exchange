using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(IUserService userService, IMapper mapper, IConfiguration configuration)
        {
            _userService = userService;
            _mapper = mapper;
            _configuration = configuration;
        }
        public Response<UserInfoDto> Login(LoginRequest loginRequest)
        {
            var res = _userService.GetByUsername(loginRequest.Username);
            if(res == null)
            {
                return new Response<UserInfoDto>("Bad credentials", success: false);
            }

            if(!VerifyPasswordHash(loginRequest.Password, res.Data.Password))
            {
                return new Response<UserInfoDto>("Bad credentials", success: false);
            }

            return new Response<UserInfoDto>(_mapper.Map<UserInfoDto>(res.Data), "Login successfully!");
        }

        public Response<User> Register(RegisterRequest registerRequest)
        {
            var user = _userService.GetByUsername(registerRequest.Username);
            if(user.Data != null)
            {
                return new Response<User>($"Username {registerRequest.Username} already existed!");
            }
            var newUser = new User()
            {
                FullName = registerRequest.FullName,
                Username = registerRequest.Username,
                Password = HashPassword(registerRequest.Password),
                Email = registerRequest.Email,
                IsEmailConfirmed = false,
                PhoneNumber = registerRequest.PhoneNumber,
                Dob = registerRequest.Dob,
                Address = registerRequest.Address,
                Points = 100,
                Role = "User"
            };
            _userService.Add(newUser);
            return new Response<User>(newUser, "Register successfully!");
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            // Verify the password hash and salt
            // You would implement the appropriate hashing and verification logic here
            // Example: using BCrypt
            // return BCrypt.Net.BCrypt.Verify(password, storedHash);

            // For demonstration purposes, we're assuming password validation logic here
            var passwordHash = HashPassword(password);
            return storedHash == passwordHash;
        }

        private static string HashPassword(string password)
        {
            // Hash the password using the salt
            // You would implement the appropriate hashing logic here
            // Example: using BCrypt
            // return BCrypt.Net.BCrypt.HashPassword(password, salt);

            // For demonstration purposes, we're using a simple hash algorithm here
            using var algorithm = SHA512.Create();
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = algorithm.ComputeHash(passwordBytes);
            return Convert.ToBase64String(hashBytes);
        }

        public Response<string> CreateAccessToken(UserInfoDto userInfoDto)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("Id", userInfoDto.Id.ToString()),
                new Claim("FullName", userInfoDto.FullName),
                new Claim("Username", userInfoDto.Username),
                new Claim("Email", userInfoDto.Email),
                new Claim("IsEmailConfirmed", userInfoDto.IsEmailConfirmed.ToString()),
                new Claim("PhoneNumber", userInfoDto.PhoneNumber),
                new Claim("Dob", userInfoDto.Dob),
                new Claim("Gender", userInfoDto.Gender.ToString()),
                new Claim("Address", userInfoDto.Address),
                new Claim("Points", userInfoDto.Points.ToString()),
                new Claim("Role", userInfoDto.Role)
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return new Response<string>(tokenString, "Login Successfully!");
        }
    }
}
