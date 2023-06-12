using Application.Contracts;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public void Add(User user)
        {
            _userRepository.AddAsync(user);
        }

        public async Task<Response<string>> DeleteAsync(Guid id)
        {
            var isDelete = await _userRepository.DeleteAsync(id);
            if(isDelete)
            {
                return new Response<string>("Delete successfully", success: true);
            }
            return new Response<string>("Delete failure");
        }

        public async Task<Response<UserInfoDto>> GetAsync(Expression<Func<User, bool>> filter)
        {
           var user = await _userRepository.GetAsync(filter);
            if(user != null)
            {
                var userMapped = _mapper.Map<UserInfoDto>(user);
                return new Response<UserInfoDto>(userMapped, "Get user success!");
            }

            return new Response<UserInfoDto>("Get user failure");
        }

        public async Task<Response<UserInfoDto>> GetByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user != null){
                var userMapped = _mapper.Map<UserInfoDto>(user);
                return new Response<UserInfoDto>(userMapped, "Get user by Id success");
            }

            return new Response<UserInfoDto>("Get user by id failure");
        }

        public Response<User> GetByUsername(string username)
        {
            var user =  _userRepository.Get(u => u.Username == username);
            if(user != null)
            {
                return new Response<User>(user, "Get user by username success!");
            }
            return new Response<User>("Get user by username failure");
        }

        public async Task<Response<UserInfoDto>> GetListAsync()
        {
            var userList = await _userRepository.GetListAsync();
            var userListMapped = _mapper.Map<IEnumerable<UserInfoDto>>(userList);
            return new Response<UserInfoDto>(userListMapped, "Hello", count: userListMapped.Count());
        }

        public async Task<Response<UserUpdateDto>> UpdateAsync(UserUpdateDto userUpdateDto)
        {
            var getUser = await _userRepository.GetByIdAsync(userUpdateDto.Id);

            if(getUser != null)
            {
                var user = _mapper.Map<UserUpdateDto, User>(userUpdateDto, getUser);
                

                var userUpdate = await _userRepository.UpdateAsync(user);
                var userMapped = _mapper.Map<UserUpdateDto>(userUpdate);

                return new Response<UserUpdateDto>(userMapped, "Update user success!");
            }
            return new Response<UserUpdateDto>("User not found for update");
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
    }
}
