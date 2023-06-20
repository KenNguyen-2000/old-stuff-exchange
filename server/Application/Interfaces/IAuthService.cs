using Application.DTOs;
using Application.DTOs.AuthDtos;
using Application.DTOs.UserDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuthService
    {
        Response<UserInfoDto> Login(LoginRequest loginRequest);
        Task<Response<User>> Register(RegisterRequest registerRequest);
        Response<string> CreateAccessToken(UserInfoDto userInfoDto);
        Response<UserInfoDto> LoginGoogle(string googleToken);

    }
}
