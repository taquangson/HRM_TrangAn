using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class DonSuaChuaThuyenController : Controller
    {
        // GET: DonSuaChuaThuyen
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllDonSuaChuaThuyen()
        {
            DonSuaChuaThuyenDAO dao = new DonSuaChuaThuyenDAO();
            List<DonSuaChuaThuyenModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_DonSuaChuaThuyen(DonSuaChuaThuyenModel model)
        {
            DonSuaChuaThuyenDAO dm_dao = new DonSuaChuaThuyenDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.InsertOrUpdate(model) > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_DonSuaChuaThuyen(int ID)
        {
            DonSuaChuaThuyenDAO dm_dao = new DonSuaChuaThuyenDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.Delete(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTrangThai_DonSuaChuaThuyen(int ID, int TrangThai)
        {
            DonSuaChuaThuyenDAO dm_dao = new DonSuaChuaThuyenDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.UpdateTrangThai(ID, TrangThai))
            {
                return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Cập nhật trạng thái thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteMulti_DonSuaChuaThuyen(string ID)
        {
            DonSuaChuaThuyenDAO dm_dao = new DonSuaChuaThuyenDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
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