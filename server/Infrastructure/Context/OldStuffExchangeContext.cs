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
        : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Order> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Items)
                .WithOne(i => i.User)
                .HasForeignKey(i => i.UserId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Reviews)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Bills)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.Buyer)
                .HasForeignKey(u => u.BuyerId);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.Seller)
                .HasForeignKey(u => u.SellerId);

            modelBuilder.Entity<Item>()
                .HasMany(i => i.Reviews)
                .WithOne(r => r.Item)
                .HasForeignKey(r => r.ItemId);
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Bill)
                .WithOne(b => b.Item)
                .HasForeignKey<Bill>(b => b.ItemId)
                .IsRequired();


            modelBuilder.Entity<Bill>()
                .HasOne(i => i.Item)
                .WithOne(b => b.Bill)
                .HasForeignKey<Bill>(b => b.ItemId);

            modelBuilder.Entity<Order>()
                .HasOne(e => e.Item)
                .WithOne(i => i.Order)
                .HasForeignKey<Order>(e => e.ItemId);
            modelBuilder.Entity<Order>()
                .HasOne(e => e.Seller)
                .WithOne(u => u.Order)
                .HasForeignKey<Order>(e => e.SellerId);
            modelBuilder.Entity<Order>()
                .HasOne(e => e.Buyer)
                .WithOne(u => u.Order)
                .HasForeignKey<Order>(e => e.BuyerId);
        }
    }
}
