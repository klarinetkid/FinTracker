using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BreakdownController : Controller
    {
        [HttpGet]
        public BreakdownViewModel GetBreakdown(DateTime? start, DateTime? end)
        {
            if (!(start.HasValue && end.HasValue) || end <= start) throw new ArgumentException();

            return new BreakdownViewModel(start.Value, end.Value);
        }
    }
}
