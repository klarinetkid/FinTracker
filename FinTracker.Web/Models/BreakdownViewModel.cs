using FinTracker.Services;
using FinTracker.Services.Data.Entities;
using FinTracker.Services.Data;

namespace FinTracker.Web.Models
{
    public class BreakdownViewModel : BaseViewModel
    {
        public DateTime BreakdownRangeStart { get; set; }
        public DateTime BreakdownRangeEnd { get; set; }

        public CategoryTotal[] CategoryTotals { get; set; }
        public TblBudgetItem[] EffectiveBudgetItems { get; set; }
        public TblTransaction[] Transactions { get; set; }
        public InOutValues InOut { get; set; }

        public string TitleDate
        {
            get
            {
                // possible values:
                //      January 2024 (whole month)
                //      Year 2024 (whole year)
                //      January - March 2024 (months in the same year)
                //      November 2023 - February 2024

                if (BreakdownRangeEnd == BreakdownRangeStart.AddMonths(1))
                    return BreakdownRangeStart.ToString("MMMM yyyy");
                else if (BreakdownRangeEnd == BreakdownRangeStart.AddYears(1))
                    return "Year " + BreakdownRangeStart.ToString("yyyy");
                else
                {
                    if (BreakdownRangeStart.Year == BreakdownRangeEnd.Year)
                    {
                        return BreakdownRangeStart.ToString("MMMM") + " - " +
                            BreakdownRangeEnd.AddDays(-1).ToString("MMMM yyyy");
                    }
                    else
                    {
                        return BreakdownRangeStart.ToString("MMMM yyyy") + " - " +
                            BreakdownRangeEnd.AddDays(-1).ToString("MMMM yyyy");
                    }
                }
            }
        }

        public BreakdownViewModel(DateTime rangeStart, DateTime rangeEnd)
        {
            BreakdownRangeStart = rangeStart;
            BreakdownRangeEnd = rangeEnd;
            CategoryTotals = db.GetCategoryTotals(BreakdownRangeStart, BreakdownRangeEnd);
            EffectiveBudgetItems = db.GetBudgetItemsForDate(BreakdownRangeEnd).ToArray();
            Transactions = db.TransactionsInRange(BreakdownRangeStart, BreakdownRangeEnd).ToArray();
            InOut = db.GetInOut(BreakdownRangeStart, BreakdownRangeEnd);
        }
    }
}