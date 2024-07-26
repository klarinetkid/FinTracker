using Microsoft.EntityFrameworkCore;
using FinTracker.Services.Data;
using FinTracker.Services.Data.Entities;

namespace FinTracker.Web.Models
{
    public class CategoryViewModel : BaseViewModel
    {
        #region properties

        public int? Id { get; set; }
        public string? CategoryName { get; set; }
        public string? Colour { get; set; }
        public int? TransactionCount { get; internal set; }

        #endregion

        #region constructors

        public CategoryViewModel() { }

        public CategoryViewModel(TblCategory? category) 
        {
            ToCategory(category);
        }

        #endregion

        #region convert to/from tbl class

        public TblCategory ToTblCategory()
        {
            return new TblCategory()
            {
                Id = Id == null ? 0 : Id.Value,
                CategoryName = CategoryName,
                Colour = Colour
            };
        }
        public void ToCategory(TblCategory? category)
        {
            if (category != null)
            {
                Id = category.Id;
                CategoryName = category.CategoryName;
                Colour = category.Colour;
            }
        }

        #endregion

        #region actions

        public void GetCategory(int id)
        {
            TblCategory? tblCat = db.TblCategories.Find(id);
            ToCategory(tblCat);
        }

        public void CreateCategory()
        {
            TblCategory tblCat = ToTblCategory();
            db.TblCategories.Entry(tblCat).State = EntityState.Added;
            db.SaveChanges();
            ToCategory(tblCat);
        }

        public void UpdateCategory()
        {
            TblCategory tblCat = ToTblCategory();
            db.TblCategories.Entry(tblCat).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void DeleteCategory()
        {
            TblCategory tblCat = ToTblCategory();
            db.TblCategories.Entry(tblCat).State = EntityState.Deleted;
            db.SaveChanges();
        }

        #endregion

        public CategoryViewModel[] GetCategories()
        {
            return db.TblCategories.Select(c => new CategoryViewModel(c))
                .ToArray().OrderBy(c => c.CategoryName).ToArray();
        }

        public void GetTransactionCount()
        {
            TransactionCount = db.TblTransactions.Count(t => t.CategoryId == Id);
        }
    }
}
