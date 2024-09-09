using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class BaseViewModel
    {
        internal ApplicationDbContext db = new(Program.Config.DbPath);

        public TblImportFileFormat[] GetImportFileFormats()
        {
            return db.TblImportFileFormats.ToArray();
        }

        public int[] AvailableYears()
        {
            return db.TblTransactions.Select(t => t.Date.Value.Year).Distinct().ToArray();
        }
    }
}
