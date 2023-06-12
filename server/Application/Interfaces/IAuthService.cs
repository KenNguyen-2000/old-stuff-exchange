using Application.DTOs;
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
        Response<User> Register(RegisterRequest registerRequest);
        Response<string> CreateAccessToken(UserInfoDto userInfoDto);
    }
}
