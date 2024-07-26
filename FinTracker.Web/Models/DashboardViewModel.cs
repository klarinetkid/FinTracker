using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class DashboardViewModel : BaseViewModel
    {
        public int Year { get; set; }
        public VwCategoryTotal[] CategoryTotals { get; set; }
        public VwMonthInOut[] MonthInOuts { get; set; }
        public VwYearInOut? YearInOut { get; set; }
        public TblBudgetItem[] SpecialBudgets { get; set; }

        public DashboardViewModel(int year) 
        {
            Year = year;

            CategoryTotals = db.VwCategoryTotals.Where(t => t.Year == Year).ToArray();

            MonthInOuts = db.VwMonthInOuts.Where(m => m.Year == Year).ToArray();

            YearInOut = db.VwYearInOuts.Where(y => y.Year == Year).FirstOrDefault();

            SpecialBudgets = db.GetBudgetItemsForDate(new DateTime(Year, 12, 31))
                .Where(b => b.IsYearly != null && b.IsYearly.Value).ToArray();
        }

        public TblImportFileFormat[] GetImportFileFormats()
        {
            return db.TblImportFileFormats.ToArray();
        }
    }
}
