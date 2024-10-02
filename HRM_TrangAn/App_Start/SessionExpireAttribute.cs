using HRM_TrangAn.Controllers;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.App_Start
{
    public class SessionExpireAttribute : ActionFilterAttribute
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(SessionExpireAttribute));
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            HttpContext ctx = HttpContext.Current;
            if (HttpContext.Current.Session["UserInfor"] == null)
            {
                filterContext.Result = new RedirectResult("~/User/Login");
                return;
            }
            else
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                var descriptor = filterContext.ActionDescriptor;
                string actionName = descriptor.ActionName;
                string controllerName = descriptor.ControllerDescriptor.ControllerName;
                string msg = "Action: " + actionName + " Controller: " + controllerName + " UserInfo: " + userinfor.TaiKhoan;
                log.Info(msg);
            }
            base.OnActionExecuting(filterContext);
        }
    }
}