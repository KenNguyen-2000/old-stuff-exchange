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
        Admin,
        Seller,
        Buyer,
        User
    }

    [Table("users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public string Address { get; set; }
        public double Points { get; set; }
        public UserRole Role { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Bill> Bills { get; set; } = new List<Bill>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
