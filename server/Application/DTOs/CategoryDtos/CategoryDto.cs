using Core.Models;


namespace Application.DTOs.CateoryDtos
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageUri { get; set; }
    }
}
