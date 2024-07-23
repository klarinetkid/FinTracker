using FinTracker.Services.Data.Entities;
using FinTracker.Services.Data;

namespace FinTracker.Web.Models
{
    public class BreakdownViewModel
    {
        // needs: transaction totals for the month
        // budget will effective date in that month
        public DateTime Month { get; set; }
        public VwCategoryTotal[] CategoryTotals { get; set; }
        public TblBudgetItem[] EffectiveBudgetItems { get; set; }

        public TblTransaction[] Transactions { get; set; }

        public VwMonthInOut? MonthInOut { get; set; }

        public BreakdownViewModel(int year, int month)
        {
            Month = new DateTime(year, month, 1);

            using (var db = new ApplicationDbContext())
            {
                // get totals for month
                CategoryTotals = db.VwCategoryTotals.Where(t => t.Year == year && t.Month == month).ToArray();

                // get effective budget items
                EffectiveBudgetItems = db.GetBudgetItemsForDate(Month).ToArray();

                // get transactions
                Transactions = db.TblTransactions.Where(t => t.Date != null && t.Date >= Month && t.Date < Month.AddMonths(1)).ToArray();

                // get month in out
                MonthInOut = db.VwMonthInOuts.Where(m => m.Year == year && m.Month == month).FirstOrDefault();
            }
        }
    }
}
