using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        #region tables

        public DbSet<TblCategory> TblCategories { get; set; }
        public DbSet<TblBudgetItem> TblBudgetItems { get; set; }
        public DbSet<TblTransaction> TblTransactions { get; set; }
        public DbSet<TblImportFileFormat> TblImportFileFormats { get; set; }
        public DbSet<TblDefaultCategorization> TblDefaultCategorizations { get; set; }

        #endregion

        // reserved category ID 0 for income
        public readonly int IncomeCategoryId = 0;

        public string DbPath { get; init; }

        public ApplicationDbContext(string dbPath)
        {
            DbPath = dbPath;

            //var folder = Environment.SpecialFolder.LocalApplicationData;
            //string path = Environment.GetFolderPath(folder);
            //DbPath = Path.Join(path, "fintracker.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options
                //.UseLazyLoadingProxies() // TODO: really need lazy loading?
                .UseSqlite($"Data Source={DbPath}");

        #region procedures

        // note this is <=or start date, > for endDate so
        // end date is startDate.AddMonths(1) for entire month
        public IQueryable<TblTransaction> TransactionsInRange(DateTime startDate, DateTime endDate)
        {
            return TblTransactions.Where(t => t.Date != null && t.Date.Value >= startDate && t.Date.Value < endDate);
        }

        public IEnumerable<TblBudgetItem> GetBudgetItemsForDate(DateTime date)
        {
            List<TblBudgetItem> result = new List<TblBudgetItem>();
            IQueryable<TblBudgetItem> items = TblBudgetItems.Include(b => b.Category).Where(b => b.EffectiveDate <= date);
            foreach (var group in items.GroupBy(b => b.CategoryId))
            {
                result.Add(group.OrderBy(b => b.EffectiveDate).Last());
            }

            return result;
        }
        
        public CategoryTotal[] GetCategoryTotals(DateTime startDate, DateTime endDate)
        {
            // TODO: this reserved catID should be a constant somewhere
            int periodIncome = TransactionsInRange(startDate, endDate).Where(t => t.CategoryId == IncomeCategoryId).Sum(t => t.Amount) ?? 0;

            return TransactionsInRange(startDate, endDate).Include(t => t.Category).GroupBy(t => t.Category)
                .Select((g) => new CategoryTotal
                {
                    Total = g.Sum(t => t.Amount) ?? 0,
                    Category = g.Key,
                    Date = startDate,
                    PercentOfIncome = (float)(g.Sum(t => t.Amount) ?? 0) / periodIncome * 100
                }).ToArray();
        }

        public bool DoesTransactionExist(TblTransaction ts)
        {
            return TblTransactions.Where(t => t.Date == ts.Date && t.Memo == ts.Memo && t.Amount == ts.Amount).Any();
        }

        public InOutValues GetInOut(DateTime startDate, DateTime endDate)
        {
            IQueryable<TblTransaction> transactions = TransactionsInRange(startDate, endDate);
            int? pos = transactions.Where(t => t.Amount > 0).Sum(t => t.Amount);
            int? neg = transactions.Where(t => t.Amount < 0).Sum(t => t.Amount);
            return new InOutValues(pos ?? 0, Math.Abs(neg ?? 0));
        }

        #endregion
    }
}
