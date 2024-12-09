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
    public class LaoDongThueKhoanController : Controller
    {
        // GET: LaoDongThueKhoan
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllLaoDongThueKhoan(DateTime from, DateTime to)
        {
            LaoDongThueKhoanDAO dao = new LaoDongThueKhoanDAO();
            List<LaoDongThueKhoanModel> data = dao.GetAll(from, to);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetByNhanVien_Ngay(int ID_NhanVien, DateTime Ngay)
        {
            LaoDongThueKhoanDAO dao = new LaoDongThueKhoanDAO();
            List<LaoDongThueKhoanModel> data = dao.GetByNhanVien_Ngay(ID_NhanVien, Ngay);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertOrUpdate_LaoDongThueKhoan(LaoDongThueKhoanModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            LaoDongThueKhoanDAO dao = new LaoDongThueKhoanDAO();
            int countErr = 0;
            foreach (int idnv in item.lstNhanVienPhatSinh)
            {
                int IDnew = 0;
                IDnew = dao.InsertOrUpdate(item, idnv);
                if (IDnew > 0)
                {

                }
                else
                {
                    countErr++;
                }
            }
            if (countErr == 0)
            {

                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu " + countErr + " bản ghi thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult DeleteMulti_LaoDongThueKhoan(string ID)
        {
            LaoDongThueKhoanDAO dm_dao = new LaoDongThueKhoanDAO();
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