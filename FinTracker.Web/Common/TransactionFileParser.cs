using CsvHelper;
using System.Globalization;
using FinTracker.Services.Data.Entities;
using FinTracker.Web.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FinTracker.Web.Common
{
    public class TransactionFileParser
    {
        public TblImportFileFormat ImportFileFormat { get; set; }

        public TransactionFileParser(TblImportFileFormat format) 
        {
            ImportFileFormat = format;
        }

        public TransactionViewModel[] ParseFile(IFormFile inputFile)
        {
            List<TransactionViewModel> transList = new List<TransactionViewModel>();

            using (var stream = new StreamReader(inputFile.OpenReadStream()))
            {
                // skip header lines
                if (ImportFileFormat.HeaderLines != null && ImportFileFormat.HeaderLines > 0)
                    for (int i = 0; i < ImportFileFormat.HeaderLines; i++)
                        stream.ReadLine();

                using (var csv = new CsvReader(stream, CultureInfo.InvariantCulture))
                {
                    foreach (dynamic line in csv.GetRecords<dynamic>())
                    {
                        var pairs = ((IEnumerable<KeyValuePair<string, object>>)line).ToArray();
                        var dict = KeyValuePairArrayToDict(pairs);
                        transList.Add(ParseRow(dict));
                    }
                }
            }

            return transList.Where(t => t.Amount != 0).ToArray();
        }

        private Dictionary<string, object> KeyValuePairArrayToDict(KeyValuePair<string, object>[] pairs)
        {
            var result = new Dictionary<string, object>();
            foreach (var pair in pairs)
            {
                result[pair.Key] = pair.Value;
            }
            return result;
        }

        private TransactionViewModel ParseRow(Dictionary<string, object> pairs)
        {
            TransactionViewModel model = new TransactionViewModel();

            // try to parse date
            DateTime parsedDate;
            if (DateTime.TryParse(pairs[ImportFileFormat.DateKey].ToString(), out parsedDate))
            {
                model.Date = parsedDate;
            }

            // try to parse amount
            decimal parsedAmount;
            if (Decimal.TryParse(pairs[ImportFileFormat.AmountKey].ToString(), out parsedAmount))
            {
                model.Amount = (int)Math.Floor(parsedAmount * 100);
                if (Helper.NullableBool(ImportFileFormat.InvertAmounts)) model.Amount *= -1;
            }

            // format memo
            model.Memo = ImportFileFormat.MemoFormat;
            foreach (var pair in pairs)
            {
                model.Memo = model.Memo.Replace("{" + pair.Key + "}", pair.Value.ToString());
            }

            return model;
        }
    }
}
