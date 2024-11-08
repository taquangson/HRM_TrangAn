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
    public class DoanhSo_LuongKhachController : Controller
    {
        [HttpGet]
        public ActionResult GetAll()
        {
            DoanhSo_LuongKhachDAO dao = new DoanhSo_LuongKhachDAO();
            List<DoanhSo_LuongKhachModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertOrUpdate(DoanhSo_LuongKhachModel model)
        {
            DoanhSo_LuongKhachDAO dao = new DoanhSo_LuongKhachDAO();
            if (dao.InsertOrUpdate(model))
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetByDateRange(string TuNgay, string DenNgay)
        {
            DateTime TuNgayDate = DateTime.ParseExact(TuNgay, "yyyy/MM/dd HH:mm:ss",
            System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(DenNgay, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            // Gọi DAO để lấy dữ liệu từ cơ sở dữ liệu
            DoanhSo_LuongKhachDAO dao = new DoanhSo_LuongKhachDAO();

            List<DoanhSo_LuongKhachModel> data = dao.GetByDateRange(TuNgayDate, DenNgayDate);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public ActionResult DeleteMulti(string ID)
        {
            DoanhSo_LuongKhachDAO ds_lk_dao = new DoanhSo_LuongKhachDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (ds_lk_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}