using System.Web;
using System.Web.Optimization;

namespace HRM_TrangAn
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Assets/vendors/bootstrap/dist/js/bootstrap.min.js",
                "~/Assets/kendo/kendo2021.all.min.js",
                "~/Assets/kendo/kendo-multi-calendar.min.js",
                "~/Assets/kendo/kendo-multi-date-select.min.js",
                "~/Assets/kendo/kendo.web.ext.js",
                "~/Assets/kendo/js/kendo.aspnetmvc.min.js",
                "~/Assets/kendo/js/cultures/kendo.culture.vi-VN.min.js",
                "~/Assets/custom.min.js",
                 "~/Assets/common.js"
                         ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Assets/kendo/styles/kendo.mobile.all.min.css",
                "~/Assets/kendo/styles/kendo.common.min.css",
                "~/Assets/kendo/styles/kendo.rtl.min.css",
                "~/Assets/kendo/styles/kendo.bootstrap.min.css",
                "~/Assets/kendo/kendo.ext.css",
                      "~/Assets/vendors/bootstrap/dist/css/bootstrap.min.css",
                      "~/Assets/custom.min.css",
                      "~/Assets/Common.css"));
        }
    }
}
