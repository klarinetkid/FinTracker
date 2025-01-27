using Microsoft.AspNetCore.Mvc;
using FinTracker.Services.Data.Entities;
using FinTracker.Services.Data;
using FinTracker.Api.Models;
using FinTracker.Services;
using System.Linq;
using FinTracker.Web.Models;

namespace FinTracker.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class SummaryController : ControllerBase
    {

        [HttpGet(Name = "GetYear")]
        public IEnumerable<SummaryViewModel> GetYear(int? year)
        {
            if (year == null) throw new ArgumentNullException();

            return Enumerable.Range(1, 12).Select(m => new DateTime(year.Value, m, 1))
                .Select(SummaryViewModel.GetMonthSummary);
        }

        [HttpGet(Name = "AvailableYear")]
        public IEnumerable<int> GetAvailableYears()
        {
            return new BaseViewModel().AvailableYears();
        }
    }
}