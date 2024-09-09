using FinTracker.Web.Common;
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
        public TblBudgetItem[] SpecialBudgets { get; set; }

        public DashboardViewModel(int year) 
        {
            Year = year;
            DateTime january = new DateTime(year, 1, 1);

            CategoryTotals = Enumerable.Range(0, 12).SelectMany(i => db.GetCategoryTotals(january.AddMonths(i), january.AddMonths(i + 1))).ToArray();
            MonthInOuts = Enumerable.Range(0, 12).Select(i => db.GetInOut(january.AddMonths(i), january.AddMonths(i + 1))).ToArray();
            YearInOut = db.GetInOut(january, january.AddYears(1));
            SpecialBudgets = db.GetBudgetItemsForDate(new DateTime(Year, 12, 31)).Where(b => b.IsYearly.IsTrue()).ToArray();
        }
    }
}
