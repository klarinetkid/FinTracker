using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Services.Data
{
    public class ApplicationDbContext : DbContext
    {
        // tables
        public DbSet<TblCategory> TblCategories { get; set; }
        public DbSet<TblBudgetItem> TblBudgetItems { get; set; }
        public DbSet<TblTransaction> TblTransactions { get; set; }
        public DbSet<TblImportFileFormat> TblImportFileFormats { get; set; }
        public DbSet<TblDefaultCategorization> TblDefaultCategorizations { get; set; }

        // views
        public DbSet<VwCategoryTotal> VwCategoryTotals { get; set; }
        public DbSet<VwMonthInOut> VwMonthInOuts { get; set; }
        public DbSet<VwYearInOut> VwYearInOuts { get; set; }

        public string DbPath { get; init; }

        public ApplicationDbContext()
        {
            // TODO: differenet platform support
            var folder = Environment.SpecialFolder.LocalApplicationData;
            string path = Environment.GetFolderPath(folder);
            DbPath = Path.Join(path, "fintracker.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options
                //.UseLazyLoadingProxies() // TODO: really need lazy loading?
                .UseSqlite($"Data Source={DbPath}");


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

        public bool DoesTransactionExist(TblTransaction ts)
        {
            return TblTransactions.Where(t => t.Date == ts.Date && t.Memo == ts.Memo && t.Amount == ts.Amount).Any();
        }
    }
}
