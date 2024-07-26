using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class SystemController : Controller
    {
        public IActionResult Categories()
        {
            CategoryViewModel model = new CategoryViewModel();
            CategoryViewModel[] categories = model.GetCategories();

            foreach (var category in categories) category.GetTransactionCount();
            
            return View(categories);
        }
        
        public IActionResult Defaults()
        {
            DefaultCategorizationViewModel model = new DefaultCategorizationViewModel();
            DefaultCategorizationViewModel[] cats = model.GetCategorizationList();
            return View(cats);
        }
    }
}
