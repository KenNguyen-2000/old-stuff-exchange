using Application.DTOs.ItemDtos;
using Application.DTOs.CateoryDtos;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs.UserDtos;

namespace Application.Profiles
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {


            CreateMap<ItemDto, Item>();
            CreateMap<Item, ItemDto>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images));

            CreateMap<Item, CreateItemDto>();

            CreateMap<ChangeItemStatusDto, Item>();
            CreateMap<Item, ChangeItemStatusDto>();

            CreateMap<Item, UpdateItemDto>().ForMember(dest => dest.Images, opt => opt.MapFrom((src) => src.Images.Select(i => i.ImageUri).ToArray()));
            CreateMap<UpdateItemDto, Item>()
             .ForMember(dest => dest.Images, opt => opt.MapFrom((src, dest, destMember, context) =>
             {
                 var itemId = src.Id; // Retrieve the ItemId from the source

                 var images = src.Images.Select(imageUri => new ItemImage
                 {
                     ImageUri = imageUri,
                     ItemId = itemId
                 }).ToArray();

                 return images;
             }))
             .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<ItemDto, UpdateItemDto>().ForMember(dest => dest.Images, opt => opt.MapFrom((src) => src.Images.Select(i => i.ImageUri).ToArray()));


            CreateMap<Item, Item>();
            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();

            CreateMap<ItemImage, ItemImageDto>();
        }
    }
}
