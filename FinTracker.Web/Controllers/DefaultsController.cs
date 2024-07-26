using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class DefaultsController : Controller
    {
        [HttpPatch]
        [ActionName("item")]
        public IActionResult Patch(DefaultCategorizationViewModel? model)
        {
            if (model == null || model.Id == null) return BadRequest();

            model.UpdateCategorization();

            return Ok();
        }

        [HttpPost]
        [ActionName("item")]
        public IActionResult Delete(DefaultCategorizationViewModel? model)
        {
            if (model == null || model.Id == null) return BadRequest();

            model.DeleteDefaultCategorization();

            return Ok();
        }
    }
}
