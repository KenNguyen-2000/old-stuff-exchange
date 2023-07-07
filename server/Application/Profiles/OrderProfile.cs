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
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));

            CreateMap<Order, CreateOrderDtos>();
            CreateMap<CreateOrderDtos, Order>();


        }
    }
}