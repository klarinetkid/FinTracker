using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Web.Models
{
    public class BaseViewModel
    {
        // TODO: config
        internal ApplicationDbContext db = new("C:\\Users\\zmoze\\OneDrive\\vault\\code\\fintracker\\_db\\fintracker.db");

        public int[] AvailableYears()
        {
            return db.TblTransactions.Select(t => t.Date == null ? 0 : t.Date.Value.Year)
                .Where(t => t != 0).Distinct().AsEnumerable().OrderDescending().ToArray();
        }

        public TblCategory[] GetCategories()
        {
            return db.TblCategories.OrderBy(e => e.CategoryName).ToArray();
        }

        public void UpdateTransactionCategory(int transactionId, int categoryId)
        {
            TblTransaction? tblTransaction = db.TblTransactions.Find(transactionId);
            if (tblTransaction != null)
            {
                tblTransaction.CategoryId = categoryId;
                db.TblTransactions.Entry(tblTransaction).State = EntityState.Modified;
                db.SaveChanges();
            }
        }
    }
}
