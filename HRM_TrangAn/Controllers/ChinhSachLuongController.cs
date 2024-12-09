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
    public class ChinhSachLuongController : Controller
    {
        // GET: ChinhSachLuong
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllChinhSachLuong()
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            List<ChinhSachLuongModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllChinhSachLuongByID(int ID)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            ChinhSachLuongModel data = dao.GetByID(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByMa(string Ma)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            List<ChinhSachLuongModel> data = dao.GetByMa(Ma);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertOrUpdate_ChinhSachLuong(ChinhSachLuongModel model, string ListID_NhanVien)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.InsertOrUpdate(model, ListID_NhanVien))
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteMulti_ChinhSachLuong(string ID)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertCSL_NVFromChinhSachLuong(int ID_ChinhSachLuong, string ListID_NhanVien, int ID_NguoiApDung, string NgayBatDau, string NgayKetThuc)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            DateTime NgayBatDauDate = DateTime.ParseExact(NgayBatDau, "yyyy/MM/dd HH:mm:ss",
                                       System.Globalization.CultureInfo.InvariantCulture);
            DateTime NgayKetThucDate = DateTime.ParseExact(NgayKetThuc, "yyyy/MM/dd HH:mm:ss",
                                       System.Globalization.CultureInfo.InvariantCulture);
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.InsertCSL_NVFromChinhSachLuong(ID_ChinhSachLuong, ListID_NhanVien, ID_NguoiApDung, NgayBatDauDate, NgayKetThucDate))
            {
                return Json(new { success = true, msg = "Lưu phân bố chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu phân bố chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteCSL_NVFromChinhSachLuong(int ID_ChinhSachLuong, string ListID_NhanVien)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.DeleteCSL_NVFromChinhSachLuong(ID_ChinhSachLuong, ListID_NhanVien))
            {
                return Json(new { success = true, msg = "Xóa chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}