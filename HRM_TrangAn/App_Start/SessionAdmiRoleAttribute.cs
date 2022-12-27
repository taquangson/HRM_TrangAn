using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.App_Start
{
    public class SessionAdminRoleAttribute : ActionFilterAttribute
    {
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
                TaiKhoanModel userinfor = (TaiKhoanModel)HttpContext.Current.Session["UserInfor"];
                if (userinfor.Role != 1 || userinfor.TrangThai != 1)
                {
                    filterContext.Result = new RedirectResult("~/User/Login");
                    return;
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}