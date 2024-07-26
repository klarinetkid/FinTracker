using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTracker.Services.Data.Entities
{
    [Table("VwCategoryTotal")]
    public class VwCategoryTotal
    {
        [Key] // seems easier to add a rownumber to the view than to deal with keyless entity
        public int RowNumber { get; set; }
        public int CategoryTotal { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryColour { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int? PercentOfMonthlyIncome { get; set; }
    }

    [Table("VwMonthInOut")]
    public class VwMonthInOut
    {
        [Key] // seems easier to add a rownumber to the view than to deal with keyless entity
        public int RowNumber { get; set; }
        public int MonthIn { get; set; }
        public int MonthOut { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }

    [Table("VwYearInOut")]
    public class VwYearInOut
    {
        [Key] // seems easier to add a rownumber to the view than to deal with keyless entity
        public int RowNumber { get; set; }
        public int YearIn { get; set; }
        public int YearOut { get; set; }
        public int Year { get; set; }
    }
}
