﻿using FinTracker.Services.Data.Entities;
using FinTracker.Web.Common;
using FinTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Controllers
{
    public class ImportController : Controller
    {
        [HttpPost]
        public IActionResult Index(IFormFile[]? inputFiles, int? transactionFileFormatId)
        {
            if (inputFiles == null || transactionFileFormatId == null) return RedirectToAction("Index", "Home");

            ImportViewModel model = new ImportViewModel(transactionFileFormatId.Value);
            
            foreach (var inputFile in  inputFiles)
                model.PrepareImport(inputFile);
            
            return View(model);
        }

        [HttpPost]
        [RequestFormLimits(ValueCountLimit = 10_000_000)]
        public IActionResult SubmitImport(TransactionViewModel[] transactions)
        {
            int affectedRows = new ImportViewModel().ImportTransactions(transactions);
            ViewData["AffectedRows"] = affectedRows;
            return View();
        }
    }
}
