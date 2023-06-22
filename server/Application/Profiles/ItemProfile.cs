using Application.DTOs.ItemDtos;
using AutoMapper;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<ItemDto, Item>();
            CreateMap<Item, ItemDto>();

            CreateMap<Item, CreateItemDto>();

            CreateMap<ChangeItemStatusDto, Item>();
            CreateMap<Item, ChangeItemStatusDto>();

            CreateMap<Item, Item>();
        }
    }
}
