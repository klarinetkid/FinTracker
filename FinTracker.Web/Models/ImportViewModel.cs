using CsvHelper;
using System.Globalization;
using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;
using FinTracker.Web.Common;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace FinTracker.Web.Models
{
    public class ImportViewModel
    {
        public TransactionViewModel[] Transactions { get; set; }
        public TblImportFileFormat ImportFileFormat { get; set; }

        ApplicationDbContext db = new ApplicationDbContext();

        public ImportViewModel() { }
        public ImportViewModel(IFormFile inputFile, int transactionFileFormatId)
        {
            TblImportFileFormat? format = db.TblImportFileFormats.Find(transactionFileFormatId);

            if (format == null) throw new Exception("Format not found");

            ImportFileFormat = format;

            Transactions = new TransactionFileParser(ImportFileFormat).ParseFile(inputFile);

            FindDefaultCategories();
            FindAlreadyImportedTransactions();
        }

        public int ImportTransactions(TransactionViewModel[] transactions)
        {
            int affectedRows = 0;
            foreach (TransactionViewModel transaction in transactions)
            {
                if (transaction.ToImport.HasValue && transaction.ToImport.Value)
                {
                    db.TblTransactions.Add(transaction.ToTblTransaction());
                    affectedRows++;

                    // save default category
                    if (Helper.NullableBool(transaction.SaveDefaultCategory))
                        transaction.SaveDefault();
                }
            }

            db.SaveChanges();
            return affectedRows;
        }

        private void FindDefaultCategories()
        {
            foreach (TransactionViewModel trans in Transactions)
            {
                TblDefaultCategorization? def = db.TblDefaultCategorizations.Where(d => d.Memo == trans.Memo).FirstOrDefault();
                if (def != null && def.CategoryId != null) trans.CategoryId = def.CategoryId;
            }
        }

        private void FindAlreadyImportedTransactions()
        {
            foreach (TransactionViewModel trans in Transactions)
            {
                trans.AlreadyImported = db.DoesTransactionExist(trans.ToTblTransaction());
            }
        }
    }
}
