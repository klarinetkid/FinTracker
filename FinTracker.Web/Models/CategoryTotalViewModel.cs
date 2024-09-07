using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class CategoryTotalViewModel
    {
        public int RowNumber { get; set; }
        public int CategoryTotal { get; set; }
        public string? CategoryName { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryColour { get; set; }
        public int? Month { get; set; }
        public int Year { get; set; }
        public int? PercentOfIncome { get; set; }

        //public CategoryTotalViewModel(VwMonthCategoryTotal vw)
        //{
        //    RowNumber = vw.RowNumber;
        //    CategoryTotal = vw.CategoryTotal;
        //    CategoryName = vw.CategoryName;
        //    CategoryId = vw.CategoryId;
        //    CategoryColour = vw.CategoryColour;
        //    Month = vw.Month;
        //    Year = vw.Year;
        //    PercentOfIncome = vw.PercentOfMonthlyIncome;
        //}

        //public CategoryTotalViewModel(VwYearCategoryTotal vw)
        //{
        //    RowNumber = vw.RowNumber;
        //    CategoryTotal = vw.CategoryTotal;
        //    CategoryName = vw.CategoryName;
        //    CategoryId = vw.CategoryId;
        //    CategoryColour = vw.CategoryColour;
        //    Year = vw.Year;
        //    PercentOfIncome = vw.PercentOfYearlyIncome;
        //}
    }
}
