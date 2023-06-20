using Application.DTOs;
using Application.DTOs.AuthDtos;
using Application.DTOs.UserDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using Microsoft.AspNetCore.Identity;
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
            if (res.Data == null)
            {
                return new Response<UserInfoDto>("Bad credentials", success: false);
            }

            if (!VerifyPasswordHash(loginRequest.Password, res.Data.PasswordHash, res.Data.PasswordSalt))
            {
                return new Response<UserInfoDto>("Bad credentials", success: false);
            }

            return new Response<UserInfoDto>(_mapper.Map<UserInfoDto>(res.Data), "Login successfully!");
        }

        public async Task<Response<User>> Register(RegisterRequest registerRequest)
        {
            var user = await _userService.GetAsync(u => u.Username == registerRequest.Username);
            if (user.Data != null)
            {
                return new Response<User>($"Username {registerRequest.Username} already existed!");
            }
            byte[] passwordHash, passwordSalt;
            HashPassword(registerRequest.Password, out passwordHash, out passwordSalt);
            var newUser = new User()
            {
                FullName = registerRequest.FullName,
                Username = registerRequest.Username,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Email = registerRequest.Email,
                IsEmailConfirmed = false,
                PhoneNumber = registerRequest.PhoneNumber,
                Dob = registerRequest.Dob,
                Address = registerRequest.Address,
                Points = 100,
                Role = UserRole.User
            };
            _userService.Add(newUser);
            return new Response<User>(newUser, "Register successfully!");
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var algorithm = SHA512.Create();
            var computedHash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != passwordHash[i])
                {
                    return false;
                }
            }
            return true;
        }

        private static void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var algorithm = SHA512.Create();
            passwordSalt = new HMACSHA512().Key;
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            passwordHash = algorithm.ComputeHash(passwordBytes);
        }

        public Response<string> CreateAccessToken(UserInfoDto userInfoDto)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();

            if (!string.IsNullOrEmpty(userInfoDto.Email))
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Email, userInfoDto.Email));
            }
            claims.AddRange(new[]{
                new Claim(JwtRegisteredClaimNames.Sub, userInfoDto.Username),
                new Claim(ClaimTypes.NameIdentifier, userInfoDto.Id.ToString()),
                new Claim("Id", userInfoDto.Id.ToString()),
                new Claim(ClaimTypes.Name, userInfoDto.FullName.ToString()),
                new Claim(ClaimTypes.Role, userInfoDto.Role)
            })
            ;

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return new Response<string>(tokenString, "Login Successfully!");
        }

        public Response<UserInfoDto> LoginGoogle(string googleToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var data = handler.ReadToken(googleToken);

            return new Response<UserInfoDto>("Login success");
        }
    }
}
