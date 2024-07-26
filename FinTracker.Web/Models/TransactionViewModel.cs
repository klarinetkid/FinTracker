using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class TransactionViewModel : BaseViewModel
    {
        #region properties
        public int? Id { get; set; }
        public DateTime? Date { get; set; }
        public int? Amount { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public TblCategory? Category { get; set; }
        #endregion

        public bool? AlreadyImported { get; set; }
        public bool? ToImport { get; set; }
        public int? ImportJobNumber { get; set; } // TODO
        public bool? SaveDefaultCategory { get; set; }

        public TransactionViewModel() { }

        public TblTransaction ToTblTransaction()
        {
            return new TblTransaction()
            {
                Id = Id == null ? 0 : Id.Value,
                Date = Date,
                Amount = Amount,
                Memo = Memo,
                CategoryId = CategoryId
            };
        }

        // TODO: this should be a method of DefaultCategorizationViewModel, for consistency
        public void SaveDefault()
        {
            if (Memo == null || CategoryId == null) return;

            // check if default already exists
            TblDefaultCategorization? def = db.TblDefaultCategorizations.Where(d => d.Memo == Memo).FirstOrDefault();

            if (def != null)
            {
                if (def.CategoryId != CategoryId)
                {
                    def.CategoryId = CategoryId;
                    db.SaveChanges();
                }
            }
            else
            {
                TblDefaultCategorization newDefault = new TblDefaultCategorization()
                {
                    Memo = Memo,
                    CategoryId = CategoryId
                };

                db.TblDefaultCategorizations.Add(newDefault);
                db.SaveChanges();
            }
        }
    }
}
