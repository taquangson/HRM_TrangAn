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
    public class HocSinhController : Controller
    {
        // GET: HocSinh
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (userinfor.Role == 2)
            {
                return Json(hsdao.GetAll_HocSinhByChiNhanh(userinfor.ID_ChiNhanh), JsonRequestBehavior.AllowGet);
            }
            else if (userinfor.Role == 1)
            {
                return Json(hsdao.GetAll_HocSinh(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllNgoaiLop(int ID_Lop)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            List<HocSinhModel> result = hsdao.GetByLop_HocSinh(ID_Lop);
            result.AddRange(hsdao.GetNgoaiLop_HocSinh(ID_Lop));
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByTaiKhoan(string TaiKhoan)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            List<HocSinhModel> result = hsdao.GetAllBySDT(TaiKhoan);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByLop(int ID_Lop)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            return Json(hsdao.GetByLop_HocSinh(ID_Lop), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByBoLocTinNhan(int ID_Lop, int NamSinh, string DienThoai, int Loai)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            return Json(hsdao.GetByBoLocTinNhan(ID_Lop, NamSinh, DienThoai, Loai), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByGiaoVien()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            HocSinhDAO hsdao = new HocSinhDAO();
            return Json(hsdao.GetByGiaoVien_HocSinh(userinfor.ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByGiaoVien_NgoaiLop(int ID_Lop)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            HocSinhDAO hsdao = new HocSinhDAO();
            List<HocSinhModel> result = hsdao.GetByLop_HocSinh(ID_Lop);
            foreach (HocSinhModel hs in hsdao.GetByGiaoVien_HocSinh(userinfor.ID))
            {
                if (result.Where(x => x.ID == hs.ID).FirstOrDefault() == null)
                {
                    result.Add(hs);
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(HocSinhModel model)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            int newid = hsdao.InsertOrUpdate(model);
            if (newid > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            if (hsdao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}