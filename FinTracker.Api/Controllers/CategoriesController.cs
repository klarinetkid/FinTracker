using FinTracker.Services.Data.Entities;
using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    //[Consumes("application/json")] // TODO: needs base controller with these attributes
    [Route("[controller]/[action]")]
    public class CategoriesController : Controller
    {
        [HttpGet(Name = "List")]
        public TblCategory[] List()
        {
            return new BaseViewModel().GetCategories();
        }

        // TODO: this was just put here to get it goin quickly
        // need to create transaction controller and patch method
        [HttpPatch(Name = "UpdateTransaction")]
        public void UpdateTransaction(UpdateTransactionParameters model)
        {
            new BaseViewModel().UpdateTransactionCategory(model.transactionId, model.categoryId);
        }

        public class UpdateTransactionParameters
        {
            public int transactionId { get; set; }
            public int categoryId { get; set; }
        }
    }
}
