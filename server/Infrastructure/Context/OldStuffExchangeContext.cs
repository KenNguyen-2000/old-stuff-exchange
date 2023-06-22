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
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Item>()
                .HasMany(i => i.Reviews)
                .WithOne(r => r.Item)
                .HasForeignKey(r => r.ItemId);
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Bill)
                .WithOne(b => b.Item)
                .HasForeignKey<Bill>(b => b.ItemId)
                .IsRequired();
            modelBuilder.Entity<Item>()
                .HasOne(i => i.User)
                .WithMany(u => u.Items)
                .HasForeignKey(i => i.UserId);


            modelBuilder.Entity<Bill>()
                .HasOne(i => i.Item)
                .WithOne(b => b.Bill)
                .HasForeignKey<Bill>(b => b.ItemId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Item)
                .WithOne(i => i.Order)
                .HasForeignKey<Order>(o => o.ItemId);
        }
    }
}
