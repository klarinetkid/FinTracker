using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class CategoriesController : Controller
    {
        //339955
        [HttpPost]
        [ActionName("item")]
        public IActionResult Create(CategoryViewModel? model)
        {
            if (model == null) return BadRequest();

            model.CreateCategory();

            return Json(new { Id = model.Id });
        }

        [HttpPatch]
        [ActionName("item")]
        public IActionResult Patch(CategoryViewModel? model)
        {
            if (model == null || model.Id == null) return BadRequest();

            model.UpdateCategory();

            return Ok();
        }

        [HttpDelete]
        [ActionName("item")]
        public IActionResult Delete(CategoryViewModel? model)
        {
            // needs to check row count
            if (model == null || model.Id == null) return BadRequest();

            model.GetTransactionCount();
            if (model.TransactionCount != 0) return BadRequest();

            model.DeleteCategory();

            return Ok();
        }

        [HttpGet]
        public IActionResult List()
        {
            var model = new CategoryViewModel();
            var list = model.GetCategories();
            return Json(list);
        }
    }
}
