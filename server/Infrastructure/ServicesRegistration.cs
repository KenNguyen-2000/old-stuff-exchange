using Application.Contracts;
using Infrastructure.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServicesRegistration
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<OldStuffExchangeContext>(opt =>
            {
                opt.UseMySQL(configuration.GetConnectionString("OldStuffExchangeContext"));
                opt.EnableSensitiveDataLogging();
            });


            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IRoomChatRepository, RoomChatRepository>();
        }

    }
}