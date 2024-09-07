using System.ComponentModel;
using System.Drawing;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace FinTracker.Web.Common
{
    public class Helper
    {
        public static string AddBrightnessToColour(string colour, int brightness)
        {
            int intValue = int.Parse(colour, System.Globalization.NumberStyles.HexNumber);
            Color color = Color.FromArgb(intValue); // ColorTranslator.FromHtml("#" + colour.ToUpper());
            int r = Math.Max(Math.Min(Convert.ToInt16(color.R) + brightness, 255), 0);
            int g = Math.Max(Math.Min(Convert.ToInt16(color.G) + brightness, 255), 0);
            int b = Math.Max(Math.Min(Convert.ToInt16(color.B) + brightness, 255), 0);
            return "#" + r.ToString("X2") + g.ToString("X2") + b.ToString("X2");
        }

        public static string FormatCurrency(int currency) 
        {
            string ret = (currency < 0 ? "-" : "") + ((decimal)Math.Abs(currency) / 100).ToString("C2");
            return (Program.Config?.IsDemoMode).IsTrue() ? Regex.Replace(ret, "[0-9]", "X") : ret;
        }

        //public static bool NullableBool(bool? value)
        //{
            
        //}
    }

    public static class Extensions
    {
        public static bool IsTrue(this bool? value)
        {
            return value != null && value.Value;
        }
    }
}
