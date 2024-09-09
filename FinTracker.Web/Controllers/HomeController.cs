using System.Diagnostics;
using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class HomeController : Controller
    {
        //private readonly ILogger<HomeController> _logger;

        //public HomeController(ILogger<HomeController> logger)
        //{
        //    //_logger = logger;
        //}

        public IActionResult Index(int? y)
        {
            int year = y ?? DateTime.Now.Year;
            DashboardViewModel model = new DashboardViewModel(year);
            return View(model);
        }

        [Route("breakdown/{year}/{month?}")]
        public IActionResult Breakdown(int year, int? month)
        {
            DateTime rangeStart = new DateTime(year, month ?? 1, 1);
            DateTime rangeEnd = month != null ? rangeStart.AddMonths(1) : rangeStart.AddYears(1);
            BreakdownViewModel model = new BreakdownViewModel(rangeStart, rangeEnd);
            return View(model);
        }

        [Route("breakdown/custom")]
        public IActionResult CustomBreakdown(DateOnly from, DateOnly to)
        {
            DateTime rangeStart = from.ToDateTime(new TimeOnly());
            DateTime rangeEnd = to.ToDateTime(new TimeOnly());
            BreakdownViewModel model = new BreakdownViewModel(rangeStart, rangeEnd);
            return View("Breakdown", model);
        }

        public IActionResult BreakdownJson(DateTime start, DateTime end)
        {
            BreakdownViewModel model = new BreakdownViewModel(start, end);
            return Json(model.CategoryTotals.OrderByDescending(t => Math.Abs(t.Total)));
        }

        //public IActionResult BreakdownJson(int year, int month = -1)
        //{
        //    DateTime rangeStart = new DateTime(year, month > 0 ? month : 1, 1);
        //    DateTime rangeEnd = month > 0 ? rangeStart.AddMonths(1) : rangeStart.AddYears(1);
        //    BreakdownViewModel model = new BreakdownViewModel(rangeStart, rangeEnd);
        //    return View(model);
        //}
    }
}
