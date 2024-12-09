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
    public class BaoHiemController : Controller
    {
        [SessionExpire]
        public ActionResult ThongTinBaoHiemXaHoi()
        {
            return View();
        }

        [HttpPost]
        public ActionResult DeleteMulti_ThongTinBaoHiem(string ID)
        {
            BaoHiemXaHoiDAO bh_dao = new BaoHiemXaHoiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (bh_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetAll()
        {
            BaoHiemXaHoiDAO dao = new BaoHiemXaHoiDAO();
            List<BaoHiemXaHoiModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByID_BaoHiemXaHoi(int ID_BaoHiemXaHoi)
        {
            HoSoNhanSu_BaoHiemXaHoiDAO dao = new HoSoNhanSu_BaoHiemXaHoiDAO();
            List<HoSoNhanSu_BaoHiemXaHoiModel> data = dao.GetByID_BaoHiemXaHoi(ID_BaoHiemXaHoi);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetNVByID_BaoHiemXaHoi(int ID_BaoHiemXaHoi)
        {
            NhanVien_BaoHiemXaHoiDAO dao = new NhanVien_BaoHiemXaHoiDAO();
            List<NhanVien_BaoHiemXaHoiModel> data = dao.GetByID_BaoHiemXaHoi(ID_BaoHiemXaHoi);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByNotID_BaoHiemXaHoi(int ID_BaoHiemXaHoi)
        {
            HoSoNhanSuDAO dao = new HoSoNhanSuDAO();
            List<HoSoNhanSuModel> data = dao.GetByNotID_BaoHiemXaHoi(ID_BaoHiemXaHoi);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_BaoHiem(BaoHiemXaHoiModel model)
        {
            BaoHiemXaHoiDAO bh_dao = new BaoHiemXaHoiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (bh_dao.InsertOrUpdate(model) > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdateWithHoSo(List<HoSoNhanSu_BaoHiemXaHoiModel> list)
        {
            HoSoNhanSu_BaoHiemXaHoiDAO hs_bh_dao = new HoSoNhanSu_BaoHiemXaHoiDAO();


            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            foreach (HoSoNhanSu_BaoHiemXaHoiModel item in list)
            {
                item.ID_NguoiTao = userinfor.ID;
            }
            if (hs_bh_dao.InsertOrUpdate(list))
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}