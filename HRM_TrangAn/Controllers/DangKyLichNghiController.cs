using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Microsoft.Ajax.Utilities;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class DangKyLichNghiController : Controller
    {
        // GET: DangKyLichNghi
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllDangKyLichNghi()
        {
            DangKyLichNghiDAO dao = new DangKyLichNghiDAO();
            List<DangKyLichNghiModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDangKyLichNghiByDate(DateTime from, DateTime to)
        {
            DangKyLichNghiDAO dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<DangKyLichNghiModel> data = new List<DangKyLichNghiModel>();
            if (userinfor.Role == 1)
            {
                data = dao.GetByDate(from, to);
            }
            else if (userinfor.Role == 2)
            {
                data = dao.GetByDate_Tag(userinfor.ID, from, to);
            }
            else
            {
                data = dao.GetByID_NhanVien(userinfor.ID, from, to);
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDataLichNghiDaDuyet(DateTime from, DateTime to)
        {
            DangKyLichNghiDAO dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<DangKyLichNghiModel> data = dao.GetDataLichNghiDaDuyet(from, to);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult UpdateTrangThai_DangKyLichNghi(DangKyLichNghiModel model)
        {
            DangKyLichNghiDAO dm_dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            if (dm_dao.UpdateTrangThai(model) > 0)
            {
                model = dm_dao.GetByID(model.ID);
                if (model.TrangThai == 1)
                {
                    EmailHelper helper = new EmailHelper();
                    HoSoNhanSuDAO hsdao = new HoSoNhanSuDAO();
                    foreach (string id in model.Tag_NhanVien)
                    {
                        HoSoNhanSuModel hs = hsdao.GetByID_TaiKhoan(int.Parse(id));
                        TaiKhoanModel tk = new TaiKhoanDAO().GetById(int.Parse(id));
                        var html = RazorViewToString.RenderRazorViewToString(this, "ThongBaoNSDangKyLichNghi", model);
                        helper.SendEmail(html.ToString(), tk.Email, "Thông báo nhân sự đăng ký lịch nghỉ!");

                    }
                }
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public ActionResult InsertOrUpdate_DangKyLichNghi(DangKyLichNghiModel model)
        {
            DangKyLichNghiDAO dm_dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            if (dm_dao.InsertOrUpdate(model) > 0)
            {
                if (model.TrangThai == 1)
                {
                    EmailHelper helper = new EmailHelper();
                    HoSoNhanSuDAO hsdao = new HoSoNhanSuDAO();
                    foreach (string id in model.Tag_NhanVien)
                    {
                        HoSoNhanSuModel hs = hsdao.GetByID_TaiKhoan(int.Parse(id));
                        TaiKhoanModel tk = new TaiKhoanDAO().GetById(int.Parse(id));
                        var html = RazorViewToString.RenderRazorViewToString(this, "ThongBaoNSDangKyLichNghi", model);
                        helper.SendEmail(html.ToString(), tk.Email, "Thông báo nhân sự đăng ký lịch nghỉ!");

                    }
                }
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult MultiInsert(List<DangKyLichNghiModel> list)
        {
            DangKyLichNghiModel model = list.FirstOrDefault();
            DangKyLichNghiDAO dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.MultiInsert(list))
            {
                if (model.TrangThai == 1)
                {
                    EmailHelper helper = new EmailHelper();
                    HoSoNhanSuDAO hsdao = new HoSoNhanSuDAO();
                    foreach (string id in model.Tag_NhanVien)
                    {
                        HoSoNhanSuModel hs = hsdao.GetByID_TaiKhoan(int.Parse(id));
                        TaiKhoanModel tk = new TaiKhoanDAO().GetById(int.Parse(id));
                        foreach (DangKyLichNghiModel item in list)
                        {
                            var html = RazorViewToString.RenderRazorViewToString(this, "ThongBaoNSDangKyLichNghi", item);
                            helper.SendEmail(html.ToString(), tk.Email, "Thông báo nhân sự đăng ký lịch nghỉ!");
                        }
                    }
                }
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteMutli_DangKyLichNghi(string ID)
        {
            DangKyLichNghiDAO dm_dao = new DangKyLichNghiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa thông tin thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}