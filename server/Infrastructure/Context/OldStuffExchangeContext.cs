using Core.Models;
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
        :base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Review> Reviews { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasMany(u => u.Items).WithOne(i => i.User).HasForeignKey(i => i.UserId);
                entity.HasMany(u => u.Reviews).WithOne(r => r.User).HasForeignKey(r => r.UserId);
            });

            modelBuilder.Entity<Item>()
                .HasMany(i => i.Reviews)
                .WithOne(r => r.Item)
                .HasForeignKey(r => r.ItemId)
                .HasPrincipalKey(i => i.Id);
        }
    }
}
