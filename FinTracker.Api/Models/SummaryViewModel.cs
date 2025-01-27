using FinTracker.Services;
using FinTracker.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Models
{
    public class SummaryViewModel : BaseViewModel
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public CategoryTotal[] CategoryTotals { get; set; }
        public int TotalIn { get; set; }
        public int TotalOut { get; set; }

        public SummaryViewModel(DateTime start, DateTime end)
        {
            Start = start;
            End = end;
            CategoryTotals = db.GetCategoryTotals(Start, End);
            TotalIn = CategoryTotals.Where(t => t.Total > 0).Sum(t => t.Total);
            TotalOut = CategoryTotals.Where(t => t.Total < 0).Sum(t => t.Total);
        }

        public static SummaryViewModel GetMonthSummary(DateTime start)
        {
            return new SummaryViewModel(start, start.AddMonths(1));
        }
    }
}
