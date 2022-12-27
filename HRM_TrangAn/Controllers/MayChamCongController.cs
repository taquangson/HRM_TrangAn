using Newtonsoft.Json.Linq;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace HRM_TrangAn.Controllers
{
    public class MayChamCongController : Controller
    {
        // GET: MayChamCong
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult LichSuKetNoiMCC()
        {
            return View();
        }

        public ActionResult GetAllMayChamCong()
        {
            MayChamCongDAO dao = new MayChamCongDAO();
            List<MayChamCongModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLichSuMayChamCong(DateTime from, DateTime to)
        {
            LichSuKetNoiMCCDAO dao = new LichSuKetNoiMCCDAO();
            List<LichSuKetNoiMCCModel> data = dao.GetAll(from, to);
            return Content(JsonConvert.SerializeObject(data));
        }


        [HttpGet]
        public ActionResult GetByMaMayChamCong(string MaThietBi)
        {
            MayChamCongDAO dao = new MayChamCongDAO();
            List<MayChamCongModel> data = dao.GetByMa(MaThietBi);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetAllMayChamCongNgoaiDiemQuetThe(int ID)
        {
            MayChamCongDAO dao = new MayChamCongDAO();
            List<MayChamCongModel> data = dao.GetAllMayChamCongNgoaiDiemQuetThe(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult InsertOrUpdate_MayChamCong(MayChamCongModel model)
        {
            MayChamCongDAO dm_dao = new MayChamCongDAO();
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
        public ActionResult InsertOrUpdate_ListMayChamCong(List<MayChamCongModel> list)
        {
            MayChamCongDAO dm_dao = new MayChamCongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.InsertOrUpdateMulti(list))
            {
                return Json(new { success = true, msg = "Lưu file thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu file thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_MayChamCong(int ID)
        {
            MayChamCongDAO dm_dao = new MayChamCongDAO();
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
        public ActionResult UpdateTrangThai_MayChamCong(int ID, int TrangThai)
        {
            MayChamCongDAO dm_dao = new MayChamCongDAO();
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
        public ActionResult DeleteMulti_MayChamCong(string ID)
        {
            MayChamCongDAO dm_dao = new MayChamCongDAO();
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