using System.ComponentModel;
using FinTracker.Api.Models;

namespace FinTracker.Api.Services
{
    public class BreakdownService
    {
        public BreakdownViewModel GetBreakdown(BreakdownQuery query)
        {
            if (!query.IsValid()) throw new ArgumentException();

            BreakdownViewModel model = new BreakdownViewModel(query.Start.Value, query.End.Value);

            if (query.Includes != null)
            {
                if (query.Includes.Contains(BreakdownIncludes.BudgetItems))
                                model.IncludeEffectiveBudgetItems();

                if (query.Includes.Contains(BreakdownIncludes.Transactions))
                    model.IncludeTransactions();
            }

            return model;
        }

        public IEnumerable<BreakdownViewModel> GetMonthlyBreakdownsForYear(int year)
        {
            IEnumerable<DateTime> months = Enumerable.Range(1, 12).Select(m => new DateTime(year, m, 1));
            return months.Select(BreakdownViewModel.GetMonthBreakdown);
        }
    }

    public class BreakdownQuery
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public BreakdownIncludes[]? Includes { get; set; }

        public bool IsValid()
        {
            return Start.HasValue && End.HasValue && End.Value > Start.Value;
        }
    }

    public enum BreakdownIncludes
    {
        BudgetItems,
        Transactions
    }
}
