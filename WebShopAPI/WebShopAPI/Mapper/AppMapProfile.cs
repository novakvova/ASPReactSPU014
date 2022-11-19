using AutoMapper;
using LibData.Entities;
using LibData.Entities.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using WebShopAPI.Models;

namespace WebShopAPI.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<CategoryEntity, CategoryItemViewModel>()
                .ForMember(x=>x.Image, opt=>opt.MapFrom(cat=>$"/images/{cat.Image}"));

            CreateMap<UserEntity, UserItemViewModel>()
                .ForMember(x => x.FullName, opt => opt.MapFrom(user => $"{user.SecondName} {user.FirstName}"))
                .ForMember(x => x.Phone, opt => opt.MapFrom(user => $"{user.PhoneNumber}"))
                .ForMember(x => x.Image, opt => opt.MapFrom(user => 
                    string.IsNullOrEmpty(user.Image)? "/images/default.jpg" : $"/images/{user.Image}"));
        }
    }
}
