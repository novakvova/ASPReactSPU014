using LibData;
using LibData.Entities;
using LibData.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Data;
using WebShopAPI.Contants;

namespace WebShopAPI.Services
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppEFContext>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                context.Database.Migrate();

                if (!context.Categories.Any())
                {
                    Dictionary<string, string> categories = new Dictionary<string, string> {
                        { "Ноутбуки", "laptop.jpg" },
                        { "Монітори", "monotor.jpg"},
                        { "Одяг", "clothing.jpg" }
                    };
                    foreach (var item in categories)
                    {
                        CategoryEntity cat = new CategoryEntity
                        {
                            Name = item.Key,
                            Image = item.Value,
                            DateCreated = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)
                        };
                        context.Categories.Add(cat);
                        context.SaveChanges();
                    }
                }

                if (!roleManager.Roles.Any())
                {
                    RoleEntity admin = new RoleEntity
                    {
                        Name = Roles.Admin
                    };
                    var result = roleManager.CreateAsync(admin).Result;

                    RoleEntity user = new RoleEntity
                    {
                        Name = Roles.User
                    };
                    result = roleManager.CreateAsync(user).Result;
                }

                if (!userManager.Users.Any())
                {
                    var user = new UserEntity
                    {
                        Email = "admin@gmail.com",
                        UserName = "admin@gmail.com",
                        PhoneNumber = "098 34 23 211"
                    };

                    var result = userManager.CreateAsync(user, "123456").Result;

                    if (result.Succeeded)
                    {
                        result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                    }
                }
            }
        }
    }
}

