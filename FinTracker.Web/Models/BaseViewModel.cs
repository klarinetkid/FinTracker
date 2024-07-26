using FinTracker.Services.Data;

namespace FinTracker.Web.Models
{
    public class BaseViewModel
    {
        internal ApplicationDbContext db = new();
    }
}
