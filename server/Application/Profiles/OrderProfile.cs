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
            CreateMap<Order, OrderDtos>();

            CreateMap<Order, CreateOrderDtos>();
            CreateMap<CreateOrderDtos, Order>();


        }
    }
}