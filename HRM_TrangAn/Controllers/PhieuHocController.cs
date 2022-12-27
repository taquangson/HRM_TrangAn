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
    public class PhieuHocController : Controller
    {
        [SessionExpire]
        [SessionAdminRoleAttribute]
        // GET: PhieuHoc
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByHocSinh(int ID_HocSinh)
        {
            PhieuHocDAO hsdao = new PhieuHocDAO();
            return Json(hsdao.GetByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByHocSinh_Thang(int ID_HocSinh, int Thang)
        {
            PhieuHocDAO hsdao = new PhieuHocDAO();
            return Json(hsdao.GetByHocSinh_Thang(ID_HocSinh, Thang), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(PhieuHocModel model)
        {
            PhieuHocDAO phdao = new PhieuHocDAO();
            SoDuBuoiHocDAO sddao = new SoDuBuoiHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            model.ID_NhanVien = userinfor.ID;
            model.NamHoc = DateTime.Now.Year;
            if(model.ID == 0)
            {
                int count = phdao.CountBuoiHocTrongThang(model.ID_HocSinh, model.ID_Lop, model.Thang, DateTime.Now.Year);
                model.SoBuoiDaHoc = count;
            }
            phdao.InsertOrUpdate(model);
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);

        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CheckItemCanEdit(int ID_Lop, int ID_Phieu, int ID_HocSinh)
        {
            PhieuHocDAO hsdao = new PhieuHocDAO();
            PhieuHocModel firstItem = hsdao.GetByHocSinh(ID_HocSinh).Where(x => x.ID_Lop == ID_Lop).FirstOrDefault();
            if (firstItem.ID == ID_Phieu)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}