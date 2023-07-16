using Application.Contracts;
using Application.DTOs;
using Application.DTOs.UserDtos;
using Application.Interfaces;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
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

        public async Task Add(User user)
        {
            await _userRepository.AddAsync(user);
        }


        public async Task<Response<string>> DeleteAsync(int id)
        {
            var isDelete = await _userRepository.DeleteAsync(id);
            if (isDelete)
            {
                return new Response<string>("Delete successfully", success: true);
            }
            return new Response<string>("Delete failure");
        }

        public async Task<Response<UserInfoDto>> GetAsync(Expression<Func<User, bool>> filter)
        {
            var user = await _userRepository.GetAsync(filter);
            if (user != null)
            {
                var userMapped = _mapper.Map<UserInfoDto>(user);
                return new Response<UserInfoDto>(userMapped, "Get user success!");
            }

            return new Response<UserInfoDto>("Get user failure");
        }

        public async Task<Response<UserInfoDto>> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user != null)
            {
                var userMapped = _mapper.Map<UserInfoDto>(user);
                return new Response<UserInfoDto>(userMapped, "Get user by Id success");
            }

            return new Response<UserInfoDto>("Get user by id failure");
        }

        public Response<User> GetByUsername(string username)
        {
            var user = _userRepository.Get(u => u.Username == username);
            if (user != null)
            {
                return new Response<User>(user, "Get user by username success!");
            }
            return new Response<User>("Get user by username failure");
        }

        public async Task<Response<UserInfoDto>> GetListAsync()
        {
            try
            {
                var userList = await _userRepository.GetListAsync();
                var userListMapped = _mapper.Map<IEnumerable<UserInfoDto>>(userList);
                return new Response<UserInfoDto>(userListMapped, "Get list user successfully!", count: userListMapped.Count());
            }
            catch (System.Exception ex)
            {
                return new Response<UserInfoDto>(ex.Message, status: HttpStatusCode.InternalServerError);
            }
        }

        public async Task<Response<UserInfoDto>> UpdateAsync(UserUpdateDto userUpdateDto)
        {
            try
            {
                var getUser = await _userRepository.GetByIdAsync(userUpdateDto.Id);

                if (getUser != null)
                {
                    var user = _mapper.Map<UserUpdateDto, User>(userUpdateDto, getUser);


                    var userUpdate = await _userRepository.UpdateAsync(user);
                    var userMapped = _mapper.Map<UserInfoDto>(userUpdate);

                    return new Response<UserInfoDto>(userMapped, "Update user success!");
                }
                return new Response<UserInfoDto>("User not found for update");
            }
            catch (System.Exception ex)
            {
                return new Response<UserInfoDto>(ex.Message, success: false, status: HttpStatusCode.InternalServerError);
            }
        }


        public async Task<Response<string>> UpdatePointsAsync(int userId, double points)
        {
            User getUser = await _userRepository.GetByIdAsync(userId);
            if (getUser == null)
                return new Response<string>("User not found");

            if (points + getUser.Points < 0)
                return new Response<string>("User point not enough!");


            User userNeedUpdate = getUser;
            userNeedUpdate.Points += points;
            await _userRepository.UpdateAsync(userNeedUpdate);
            return new Response<string>("Update point success", success: true);
        }


        async Task<bool> IUserService.IsOwner(int userId, Item item)
        {
            var user = await GetByIdAsync(userId);
            return item.UserId == user.Data.Id;
        }

        public async Task<Response<UserInfoDto>> UpdateAvatar(UpdateAvatarDto userUpdateDto)
        {
            User getUser = await _userRepository.GetByIdAsync(userUpdateDto.Id);
            if (getUser == null)
                return new Response<UserInfoDto>("User not found", status: HttpStatusCode.BadRequest);

            getUser.ImageUri = userUpdateDto.ImageUri;

            User updatedUser = await _userRepository.UpdateAsync(getUser);

            return new Response<UserInfoDto>(_mapper.Map<UserInfoDto>(updatedUser));
        }
    }
}
