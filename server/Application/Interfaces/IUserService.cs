using Application.DTOs;
using Application.DTOs.UserDtos;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        void Add(User user);
        Task<Response<UserInfoDto>> GetListAsync();
        Task<Response<UserInfoDto>> GetByIdAsync(int id);
        Response<User> GetByUsername(string username);
        Task<Response<UserInfoDto>> UpdateAsync(UserUpdateDto user);
        Task<Response<string>> DeleteAsync(int id);
        Task<Response<UserInfoDto>> GetAsync(Expression<Func<User, bool>> filter);
        Task<Response<string>> UpdatePointsAsync(int userId, double points);

        Task<bool> IsOwner(int userId, Item item);
    }
}
