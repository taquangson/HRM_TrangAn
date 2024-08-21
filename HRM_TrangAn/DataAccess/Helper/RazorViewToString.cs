using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using HRM_TrangAn.DataAccess.DAO;
using System.Web.Razor;
using System.Web.Razor.Generator;
using System.Web.Mvc;
using System.IO;

namespace HRM_TrangAn.DataAccess.Helper
{
    public static class RazorViewToString
    {
        public static string RenderRazorViewToString(this Controller controller, string viewName, object model)
        {
            controller.ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData, controller.TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(controller.ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}