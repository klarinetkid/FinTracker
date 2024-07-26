using FinTracker.Services.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinTracker.Web.Models
{
    public class DefaultCategorizationViewModel : BaseViewModel
    {
        #region properties

        public int? Id { get; set; }
        public string? Memo { get; set; }
        public int? CategoryId { get; set; }
        public TblCategory? Category { get; set; } // TODO: should this be category view model? I think so...

        #endregion

        #region contstructors

        public DefaultCategorizationViewModel() { }

        public DefaultCategorizationViewModel(TblDefaultCategorization? tblDefault)
        {
            ToDefaultCategorization(tblDefault);
        }

        #endregion

        #region conversion to/from tbl class

        public TblDefaultCategorization ToTblDefaultCategorization()
        {
            return new TblDefaultCategorization()
            {
                Id = Id == null ? 0 : Id.Value,
                Memo = Memo,
                CategoryId = CategoryId,
                Category = Category
            };
        }

        public void ToDefaultCategorization(TblDefaultCategorization? tblDefault)
        {
            if (tblDefault != null)
            {
                Id = tblDefault.Id;
                Memo = tblDefault.Memo;
                CategoryId = tblDefault.CategoryId;
                Category = tblDefault.Category;
            }
        }

        #endregion

        #region misc

        public DefaultCategorizationViewModel[] GetCategorizationList()
        {
            return db.TblDefaultCategorizations.OrderBy(d => d.Category.CategoryName)
                .Select(d =>  new DefaultCategorizationViewModel(d)).ToArray();
        }

        #endregion

        #region create/update/delete methods

        public void CreateDefaultCategorization()
        {
            TblDefaultCategorization tblDefault = ToTblDefaultCategorization();
            db.TblDefaultCategorizations.Entry(tblDefault).State = EntityState.Added;
            db.SaveChanges();
            ToDefaultCategorization(tblDefault);
        }

        // updates category only
        public void UpdateCategorization()
        {
            if (Id == null) throw new Exception("Id == null");

            TblDefaultCategorization? tblDefault = db.TblDefaultCategorizations.Find(Id.Value);

            if (tblDefault != null)
            {
                tblDefault.CategoryId = CategoryId;
                db.TblDefaultCategorizations.Entry(tblDefault).State = EntityState.Modified;
                db.SaveChanges();
            }
            
        }

        public void DeleteDefaultCategorization()
        {
            TblDefaultCategorization tblDefault = ToTblDefaultCategorization();
            db.TblDefaultCategorizations.Entry(tblDefault).State = EntityState.Modified;
            db.SaveChanges();
        }

        #endregion
    }
}
