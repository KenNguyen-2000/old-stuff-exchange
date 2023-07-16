using Application.DTOs.OrderDtos;
using AutoMapper;
using Core.Models;

namespace Application.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderDtos, Order>();
            CreateMap<Order, OrderDtos>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item))
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User));

            CreateMap<Order, CreateOrderDtos>();
            CreateMap<CreateOrderDtos, Order>();

        }
    }
}