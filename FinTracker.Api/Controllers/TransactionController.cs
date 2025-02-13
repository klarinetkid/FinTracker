using FinTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class TransactionController : Controller
    {
        [HttpPatch]
        public IActionResult PatchTransaction(TransactionViewModel model)
        {
            model.PatchTransaction();
            return Ok(model);
        }
    }
}
