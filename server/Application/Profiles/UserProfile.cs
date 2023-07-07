using Application.DTOs.UserDtos;
using AutoMapper;
using Core.Models;

namespace Application.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserInfoDto, User>();
            CreateMap<User, UserInfoDto>();

            CreateMap<UserUpdateDto, User>()
                  .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<User, UserUpdateDto>();

            CreateMap<User, UserItemDto>();
            CreateMap<UserItemDto, User>();

            CreateMap<UserInfoDto, UserItemDto>();
            CreateMap<UserItemDto, UserInfoDto>();
        }
    }
}
