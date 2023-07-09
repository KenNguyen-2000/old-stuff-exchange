using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public enum UserRole
    {
        [Display(Name = "Admin")]
        Admin,
        Seller,
        Buyer,
        [Display(Name = "User")]
        User
    }

    [Table("users")]
    public class User : BaseEntity
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public string Address { get; set; }
        public double Points { get; set; }
        public UserRole Role { get; set; }
        public string ImageUri {get;set;}
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
