using Application.DTOs;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            var userRes = _authService.Login(loginRequest);
            if(!userRes.Succeeded)
            {
                return BadRequest(userRes);
            }

            var token = _authService.CreateAccessToken(userRes.Data);
            if(token.Succeeded)
            {
                return Ok(token);
            }

            return BadRequest(token);
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest registerRequest)
        {
            var userRegister = _authService.Register(registerRequest);
            if(!userRegister.Succeeded)
            {
                return BadRequest(userRegister);
            }

            return Ok(userRegister);
        }
    }
}
