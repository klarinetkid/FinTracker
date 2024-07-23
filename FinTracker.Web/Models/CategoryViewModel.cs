using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class CategoryViewModel
    {
        public int? Id { get; set; }
        public string? CategoryName { get; set; }
        public string? Colour { get; set; }

        public CategoryViewModel() { }
        public CategoryViewModel(TblCategory category) 
        {
            Id = category.Id;
            CategoryName = category.CategoryName;
            Colour = category.Colour;
        }

        ApplicationDbContext db = new ApplicationDbContext();

        public CategoryViewModel[] GetCategories()
        {
            return db.TblCategories.Select(c => new CategoryViewModel(c))
                .ToArray().OrderBy(c => c.CategoryName).ToArray();
        }
    }
}
