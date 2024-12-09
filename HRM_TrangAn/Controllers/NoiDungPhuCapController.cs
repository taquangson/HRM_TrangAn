using HRM_TrangAn.App_Start;
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
    public class NoiDungPhuCapController : Controller
    {

        [HttpGet]
        public ActionResult GetAll()
        {
            NoiDungPhuCapDAO dao = new NoiDungPhuCapDAO();
            List<NoiDungPhuCapModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate(NoiDungPhuCapModel model)
        {
            NoiDungPhuCapDAO dao = new NoiDungPhuCapDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.NguoiTao = userinfor.ID;
            if (dao.InsertOrUpdate(model))
            {
                return Json(new { success = true, msg = "Thêm hoặc sửa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Thêm hoặc sửa dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteMulti(string ID)
        {
            NoiDungPhuCapDAO dao = new NoiDungPhuCapDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}