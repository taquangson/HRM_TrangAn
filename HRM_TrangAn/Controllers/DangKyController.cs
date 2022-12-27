using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace HRM_TrangAn.Controllers
{
    public class DangKyController : Controller
    {
        // GET: DangKy
        public ActionResult DangKyHoc()
        {
            return View();
        }

        public ActionResult DangKyEvent()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult GetDSDangKyHoc()
        {
            DangKyHocDAO dao = new DangKyHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(dao.GetAll(userinfor.ID_ChiNhanh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetDSDangKyEvent(DateTime from, DateTime to)
        {
            DangKyEventDAO dao = new DangKyEventDAO();
            return Json(dao.GetByNgayTao(from, to), JsonRequestBehavior.AllowGet);
        }

    }
}