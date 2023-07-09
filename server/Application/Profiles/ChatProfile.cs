using Application.DTOs;
using Application.DTOs.ChatDtos;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ChatProfile : Profile
    {
        public ChatProfile()
        {
            CreateMap<Message, MessageDto>();

            CreateMap<SendMessageDto, Message>();
            CreateMap<Message, SendMessageDto>();

            CreateMap<RoomChat, RoomChatDto>()
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.Users))
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));


            CreateMap<Message, RoomChatMessageDto>();
        }
    }
}
