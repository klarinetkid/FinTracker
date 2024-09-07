using FinTracker.Services;
using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class DashboardViewModel : BaseViewModel
    {
        public int Year { get; set; }

        public CategoryTotal[] CategoryTotals { get; set; }

        public InOutValues[] MonthInOuts { get; set; }
        public InOutValues YearInOut { get; set; }

        //public VwMonthInOut[] MonthInOuts { get; set; }
        //public VwYearInOut? YearInOut { get; set; }
        public TblBudgetItem[] SpecialBudgets { get; set; }

        public DashboardViewModel(int year) 
        {
            Year = year;

            // get category totals for each month
            DateTime january = new DateTime(year, 1, 1);
            CategoryTotals = Enumerable.Range(0, 11).SelectMany(i => db.GetCategoryTotals(january.AddMonths(i), january.AddMonths(i + 1))).ToArray();
            
            // get month in/outs
            MonthInOuts = Enumerable.Range(0, 11).Select(i => db.GetInOut(january.AddMonths(i), january.AddMonths(i + 1))).ToArray();
            //MonthInOuts = db.VwMonthInOuts.Where(m => m.Year == Year).ToArray();

            YearInOut = db.GetInOut(january, january.AddYears(1));

            SpecialBudgets = db.GetBudgetItemsForDate(new DateTime(Year, 12, 31))
                .Where(b => b.IsYearly != null && b.IsYearly.Value).ToArray();
        }

        public TblImportFileFormat[] GetImportFileFormats()
        {
            return db.TblImportFileFormats.ToArray();
        }
    }
}
