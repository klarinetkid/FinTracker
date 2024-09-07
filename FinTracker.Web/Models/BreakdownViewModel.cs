using FinTracker.Services;
using FinTracker.Services.Data.Entities;
using FinTracker.Services.Data;

namespace FinTracker.Web.Models
{
    public class BreakdownViewModel : BaseViewModel
    {
        // needs: transaction totals for the month
        // budget will be effective date in that month
        public BreakdownScope Scope { get; set; }

        public DateTime BreakDownDate { get; set; }
        public CategoryTotal[]? CategoryTotals { get; set; }
        public TblBudgetItem[]? EffectiveBudgetItems { get; set; }

        public TblTransaction[]? Transactions { get; set; }

        //public VwMonthInOut? MonthInOut { get; set; }
        //public VwYearInOut? YearInOut { get; set; }

        public InOutValues? InOut { get; set; }

        // TODO: don't need two constuctors, now that all these methods just use start/end date
        // only difference is the label, can do if start.month == end.month, show month

        public void GetYearBreakdown(int year)
        {
            Scope = BreakdownScope.Year;
            BreakDownDate = new DateTime(year, 1, 1);

            CategoryTotals = db.GetCategoryTotals(BreakDownDate, BreakDownDate.AddYears(1));

            DateTime yearLastDate = BreakDownDate.AddYears(1);
            EffectiveBudgetItems = db.GetBudgetItemsForDate(yearLastDate).ToArray();
            Transactions = db.TransactionsInRange(BreakDownDate, yearLastDate).ToArray();

            InOut = db.GetInOut(BreakDownDate, yearLastDate);
        }

        public void GetMonthBreakdown(int year, int month)
        {
            Scope = BreakdownScope.Month;
            BreakDownDate = new DateTime(year, month, 1);
            CategoryTotals = db.GetCategoryTotals(BreakDownDate, BreakDownDate.AddMonths(1));
            EffectiveBudgetItems = db.GetBudgetItemsForDate(BreakDownDate).ToArray();
            Transactions = db.TransactionsInRange(BreakDownDate, BreakDownDate.AddMonths(1)).ToArray();
            InOut = db.GetInOut(BreakDownDate, BreakDownDate.AddMonths(1));
        }

        //public BreakdownViewModel(int year, int? month)
        //{
        //    Month = new DateTime(year, month ?? 1, 1);

        //    Scope = BreakdownScope.Month;

        //    // get totals for month
        //    CategoryTotals = db.VwCategoryTotals.Where(t => t.Year == year && (month == null || t.Month == month.Value)).ToArray();

        //    // get effective budget items
        //    EffectiveBudgetItems = db.GetBudgetItemsForDate(Month).ToArray();

        //    // get transactions
        //    Transactions = db.TblTransactions.Where(t => t.Date != null && t.Date >= Month && t.Date < Month.AddMonths(1)).ToArray();

        //    // get month in out
        //    MonthInOut = db.VwMonthInOuts.Where(m => m.Year == year && (month == null || m.Month == month.Value)).FirstOrDefault();
        //}
    }

    public enum BreakdownScope
    {
        None, Month, Year
    }
}
