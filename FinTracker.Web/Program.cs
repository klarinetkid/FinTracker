using FinTracker.Services.Data;
using FinTracker.Web.Common;

namespace FinTracker.Web
{
    public class Program
    {
        public static AppConfigHelper? Config {  get; set; }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            Config = new AppConfigHelper(builder.Configuration);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            //if (!app.Environment.IsDevelopment())
            //{
            app.UseExceptionHandler("/Home/Error");
            app.UseDeveloperExceptionPage();
            //}
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
