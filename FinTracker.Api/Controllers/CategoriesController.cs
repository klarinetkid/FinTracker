using FinTracker.Services.Data.Entities;
using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CategoriesController : Controller
    {
        [HttpGet(Name = "List")]
        public TblCategory[] List()
        {
            return new BaseViewModel().GetCategories();
        }

        // TODO: this was done quick n dirty and I know it
        [HttpPost(Name = "UpdateTransaction")]
        public void UpdateTransaction(int transactionId, int categoryId)
        {
            new BaseViewModel().UpdateTransactionCategory(transactionId, categoryId);
        }
    }
}
