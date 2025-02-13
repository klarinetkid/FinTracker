using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Api.Models
{
    public class MetadataViewModel : BaseViewModel
    {
        public int[] AvailableYears()
        {
            return db.TblTransactions.Select(t => t.Date == null ? 0 : t.Date.Value.Year)
                .Where(t => t != 0).Distinct().AsEnumerable().OrderDescending().ToArray();
        }
    }
}
