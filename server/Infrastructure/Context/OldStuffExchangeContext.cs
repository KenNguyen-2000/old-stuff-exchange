using Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Context
{
    public class OldStuffExchangeContext : DbContext
    {
        public OldStuffExchangeContext(DbContextOptions<OldStuffExchangeContext> options)
        : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ItemImage> ItemImages { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Bill>()
                .HasOne(i => i.Item)
                .WithOne(b => b.Bill)
                .HasForeignKey<Bill>(b => b.ItemId);

            modelBuilder.Entity<Category>()
                .HasData(
                    new Category { Id = 1, Name = "Clothing & Accessories", ImageUri = "../Assets/cloths&accessories.png" },
                    new Category { Id=2,Name = "Mobile & Gadgets", ImageUri = "../Assets/mobiles&gadgets.png" },
                    new Category { Id=3,Name = "Consumer Electronics", ImageUri = "../Assets/electronics.png" },
                    new Category {Id = 4, Name = "Cars & Vehicles", ImageUri = "../Assets/cars.png" },
                    new Category {Id = 5, Name = "Books, Comics & Magazines", ImageUri = "../Assets/books.png" },
                    new Category {Id = 6, Name = "Art", ImageUri = "../Assets/arts.png" },
                    new Category {Id = 7, Name = "Musical Instruments", ImageUri = "../Assets/instruments.png" },
                    new Category {Id = 8, Name = "Toys & Games", ImageUri = "../Assets/toys.png" },
                    new Category {Id = 9, Name = "Jewellery & Watches", ImageUri = "../Assets/watches.png" },
                    new Category {Id = 10, Name = "Antiques", ImageUri = "../Assets/antiques.png" },
                    new Category {Id = 11, Name = "Others", ImageUri = "../Assets/others.png" },
                    new Category {Id= 12, Name = "Home & Living", ImageUri = "../Assets/home&living.png" }
                );
        }
    }
}
