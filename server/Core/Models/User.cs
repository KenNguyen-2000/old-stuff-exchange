using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
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
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }
        [Required]
        public string Dob { get; set; }
        [Required]
        public string Address { get; set; }
        public int Points { get; set; }
        public string Role { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
