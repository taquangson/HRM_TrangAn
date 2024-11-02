using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class BaoHiemXaHoi_LichSuController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByThang(int Thang, int Nam)
        {
            BaoHiemXaHoi_LichSuDAO dao = new BaoHiemXaHoi_LichSuDAO();
            List<BaoHiemXaHoi_LichSuModel> data = dao.GetByThang(Thang,Nam);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate(List<BaoHiemXaHoi_LichSuModel> list)
        {
            BaoHiemXaHoi_LichSuDAO dao = new BaoHiemXaHoi_LichSuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.InsertOrUpdate(list))
            {
                return Json(new { success = true, msg = "Lưu lịch sử thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu lịch sử thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}