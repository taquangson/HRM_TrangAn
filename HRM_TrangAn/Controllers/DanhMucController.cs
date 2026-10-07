using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static HRM_TrangAn.DataAccess.DAO.DanhMucDAO;

namespace HRM_TrangAn.Controllers
{
    public class DanhMucController : Controller
    {
        // GET: DanhMuc
        [SessionExpire]
        public ActionResult GetAll_DanhMucQuyen()
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            List<DanhMuc> dt = dm_dao.GetAll_DMQuyen();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhMucLoi()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhMucNganHang()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult NguoiLaoDong()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult CaLamViec()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhMucNgayLe()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhMucCongTrinh()
        {
            return View();
        }

        [SessionAdminRole]
        public ActionResult DanhMucTruongHoc()
        {
            return PartialView("DanhMucTruongHoc");
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetAll_DanhMuc(string TenBang)
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            List<DanhMuc> dt = dm_dao.GetAll_DM(TenBang);
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_CaHoc()
        {
            CaHocDAO dm_dao = new CaHocDAO();
            List<CaHocModel> dt = dm_dao.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_DanhMuc(DanhMuc item, string TenBang)
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.InsertOrUpdate_DM(item, TenBang, userinfor.ID_ChiNhanh))
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_DanhMucNgayLe(DanhMucNgayLeModel model)
        {
            DanhMucNgayLeDAO dm_dao = new DanhMucNgayLeDAO();
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

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_DanhMucCongTrinh(DanhMucCongTrinhModel model)
        {
            DanhMucCongTrinhDAO dm_dao = new DanhMucCongTrinhDAO();
            if (dm_dao.InsertOrUpdate(model) > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_DanhMucLoi(DanhMucLoiModel model)
        {
            DanhMucLoiDAO dm_dao = new DanhMucLoiDAO();
            if (dm_dao.InsertOrUpdate(model) > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_CaLamViec(CaLamViecModel model)
        {
            CaLamViecDAO dm_dao = new CaLamViecDAO();
            CaLamViec_PhanBoCongDAO ca_dao = new CaLamViec_PhanBoCongDAO();
            int id = 0;
            id = dm_dao.InsertOrUpdate(model);
            if (id > 0)
            {
                ca_dao.DeleteByCaLamViec(model.ID);
                if (model.PhanBo != null)
                {
                    foreach (CaLamViec_PhanBoCongModel item in model.PhanBo)
                    {
                        ca_dao.Insert(item);
                    }
                }
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_DanhMucNgayLe()
        {
            DanhMucNgayLeDAO dm_dao = new DanhMucNgayLeDAO();
            List<DanhMucNgayLeModel> dt = dm_dao.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_DanhMucLoi()
        {
            DanhMucLoiDAO dm_dao = new DanhMucLoiDAO();
            List<DanhMucLoiModel> dt = dm_dao.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_DanhMucCongTrinh()
        {
            DanhMucCongTrinhDAO dm_dao = new DanhMucCongTrinhDAO();
            List<DanhMucCongTrinhModel> dt = dm_dao.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_CaLamViec()
        {
            CaLamViecDAO dm_dao = new CaLamViecDAO();
            CaLamViec_PhanBoCongDAO ca_dao = new CaLamViec_PhanBoCongDAO();
            List<CaLamViecModel> dt = dm_dao.GetAll();
            foreach(CaLamViecModel item in dt)
            {
                item.PhanBo = ca_dao.GetByCaLamViec(item.ID);
            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult DanhMucToNhom()
        {
            return View();
        }


        //[SessionExpire]
        //[HttpPost]
        //public ActionResult InsertOrUpdate_ToNhom(ToNhomModel item)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    ToNhomDAO dao = new ToNhomDAO();
        //    NhanVien_ToNhomDAO nvdao = new NhanVien_ToNhomDAO();
        //    int IDnew = 0;
        //    int countXoaErr = 0;
        //    int countThemErr = 0;
        //    if (item.ID == 0)
        //    {
        //        IDnew = dao.InsertOrUpdate(item);
        //        foreach(NhanVien_ToNhomModel x in item.lstNhanVienToNhom)
        //        {
        //            nvdao.Insert(x);
        //        }
        //    }
        //    else
        //    {
        //        IDnew = dao.InsertOrUpdate(item);
        //        List<NhanVien_ToNhomModel> cur_lst = nvdao.GetAllByToNhom(item.ID);
        //        List<NhanVien_ToNhomModel> delete_lst = cur_lst.Except<NhanVien_ToNhomModel>(item.lstNhanVienToNhom).ToList(); // Danh sách nhân viên bị xóa
        //        List<NhanVien_ToNhomModel> insert_lst = item.lstNhanVienToNhom.Except<NhanVien_ToNhomModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
        //        foreach(NhanVien_ToNhomModel del in delete_lst) // Xóa các item cũ
        //        {
        //            if (nvdao.Delete(del.ID))
        //            {

        //            }
        //            else
        //            {
        //                countXoaErr++;
        //            }
        //        }
        //        foreach (NhanVien_ToNhomModel ins in insert_lst) // Thêm các item mới
        //        {
        //            if(nvdao.Insert(ins)> 0)
        //            {

        //            }
        //            else
        //            {
        //                countThemErr++;
        //            }
        //        }
        //    }

        //    if (IDnew > 0)
        //    {
        //        return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
        //    }
        //}


        [SessionExpire]
        public ActionResult CongViec()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult CongViecThueKhoan()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyNguoiLaoDong()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyCongVIec()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult NguoiGiamSat()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult DiemQuetThe()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ThuyenDo()
        {
            return View();
        }
        
        [SessionExpire]
        public ActionResult ChinhSachLuong()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult DoanhSo_LuongKhach()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult NoiDungPhuCap()
        {
            return View();
        }
    }
}