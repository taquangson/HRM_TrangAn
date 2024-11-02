using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
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

        [SessionExpire]
        public ActionResult GetDataTreeChinhSachLuong(int ID_PhongBan)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            List<ChinhSachLuong_NhanVien_TreeModel> data = dao.GetDataTreeChinhSachLuongNhanVien(ID_PhongBan);
            return Json(data, JsonRequestBehavior.AllowGet);
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

        public ActionResult GetChinhSachLuongNhanVien(int ID_ChinhSachLuong, int ID_NhanVien)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            List<ChinhSachLuong_NhanVienModel> data = dao.GetNV_ByIDCSL(ID_ChinhSachLuong, ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetChinhSachLuongCauHinh(int ID_ChinhSachLuong)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            List<ChinhSachLuong_CauHinhModel> data = dao.GetCH_ByIDCSL(ID_ChinhSachLuong);
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
        public ActionResult InsertOrUpdate_ChinhSachLuong(ChinhSachLuongModel model)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            if (dao.InsertOrUpdate(model))
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
        public ActionResult InsertCSL_NVFromChinhSachLuong(ChinhSachLuong_NhanVienModel model)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_NguoiApDung = userinfor.ID;
            if (dao.InsertCSL_NV(model))
            {
                return Json(new { success = true, msg = "Lưu phân bố chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu phân bố chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteCSL_NVFromChinhSachLuong(int ID_ChinhSachLuong, int ID_NhanVien)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();

            if (dao.DeleteCSL_NV(ID_ChinhSachLuong, ID_NhanVien))
            {
                return Json(new { success = true, msg = "Xóa chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertCSL_CHFromChinhSachLuong(ChinhSachLuong_CauHinhModel model)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_NguoiApDung = userinfor.ID;
            if (dao.InsertCSL_CH(model))
            {
                return Json(new { success = true, msg = "Lưu cấu hình chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu cấu hình chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteCSL_CHFromChinhSachLuong(int ID_ChinhSachLuong)
        {
            ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
            if (dao.DeleteCSL_CH(ID_ChinhSachLuong))
            {
                return Json(new { success = true, msg = "Xóa cáu hình chính sách thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu cấu hình chính sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}