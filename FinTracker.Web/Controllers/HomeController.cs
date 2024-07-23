using System.Diagnostics;
using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private ApplicationDbContext db = new ApplicationDbContext();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int? y)
        {
            int year = y ?? DateTime.Now.Year;
            DashboardViewModel model = new DashboardViewModel(year);
            return View(model);
        }

        [Route("breakdown/{year}/{month}")]
        public IActionResult Breakdown(int year, int month)
        {
            BreakdownViewModel model = new BreakdownViewModel(year, month);
            return View(model);
        }
        public IActionResult BreakdownJson(int year, int month)
        {
            BreakdownViewModel model = new BreakdownViewModel(year, month);
            return Json(model.CategoryTotals.OrderByDescending(t => Math.Abs(t.CategoryTotal)));
        }

        //[HttpGet]
        

        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}
