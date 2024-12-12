using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class NghiPhepNamController : Controller
    {
        // GET: NghiPhepNam
        public ActionResult QuanLyNghiPhepNam()
        {
            return View();
        }

        public ActionResult GetByNam(int Nam)
        {
            NgayNghiPhepDAO dao = new NgayNghiPhepDAO();
            List<NghiPhepNamViewModel> data = dao.GetByNam(Nam);
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult UpdateListNgayNghiPhep(NghiPhepNamViewModel model, int Nam)
        {
            NgayNghiPhepDAO dao = new NgayNghiPhepDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int ID_NguoiSua = userinfor.ID;
            if (dao.UpdateListNgayNghiPhep(model, ID_NguoiSua, Nam))
            {
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}