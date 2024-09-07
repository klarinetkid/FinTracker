using Microsoft.Extensions.Configuration;

namespace FinTracker.Web.Common
{
    public class AppConfigHelper
    {
        public bool IsDemoMode { get; set; }
        public string DbPath { get; set; }

        public AppConfigHelper(ConfigurationManager configuration)
        {
            IsDemoMode = configuration.GetValue<bool>("IsDemoMode", false);

            string? dbPath = configuration.GetValue<string>("DbPath");
            if (dbPath != null)
            {
                DbPath = dbPath;
            }
            else
            {
                throw new Exception("DbPath == null");
            }

        }
    }
}
