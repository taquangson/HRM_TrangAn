using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class ToNhomController : Controller
    {
        // GET: ToNhom
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllToNhom()
        {
            ToNhomDAO dao = new ToNhomDAO();
            List<ToNhomModel> data = dao.GetAll();
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetAllDanhMucToNhom()
        {
            ToNhomDAO dao = new ToNhomDAO();
            List<ToNhomModel> data = dao.GetAllDanhMuc();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllToNhomTheoCongViec(int ID_CongViec)
        {
            ToNhomDAO dao = new ToNhomDAO();
            List<ToNhomModel> data = dao.GetAllTheoLichSuCongViec(ID_CongViec);
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetAllToNhomTheoCongViecNgay(int ID_CongViec, DateTime Ngay)
        {
            ToNhomDAO dao = new ToNhomDAO();
            List<ToNhomModel> data = dao.GetAllTheoLichSuCongViecNgay(ID_CongViec, Ngay);
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetAllNhanVienTrongToNhomTheoCongViecNgay(int ID_ToNhom, int ID_CongViec, DateTime Ngay)
        {
            NhanVienDAO dao = new NhanVienDAO();
            int ID_DiemQuetThe = int.Parse(System.Configuration.ConfigurationManager.AppSettings["KeyPointCheckRouter2"]);
            List<NhanVienModel> data = dao.GetAllNhanVienTrongToNhomTheoCongViecNgay(ID_ToNhom, ID_CongViec, Ngay, ID_DiemQuetThe);
            return Content(JsonConvert.SerializeObject(data));
        }


        [HttpGet]
        public ActionResult GetByMaToNhom(string MaToNhom)
        {
            ToNhomDAO dao = new ToNhomDAO();
            List<ToNhomModel> data = dao.GetByMa(MaToNhom);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ToNhom(ToNhomModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ToNhomDAO dao = new ToNhomDAO();
            NhanVien_ToNhomDAO nvdao = new NhanVien_ToNhomDAO();
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;

            if (item.ID == 0)
            {
                IDnew = dao.InsertOrUpdate(item);

                foreach (NhanVien_ToNhomModel x in item.lstNhanVienToNhom)
                {
                    nvdao.Insert(x, IDnew);
                }
            }
            else
            {
                IDnew = dao.InsertOrUpdate(item);
                List<NhanVien_ToNhomModel> cur_lst = nvdao.GetAllByToNhom(item.ID);
                if (item.lstNhanVienToNhom == null)
                {
                    item.lstNhanVienToNhom = new List<NhanVien_ToNhomModel>();
                }
                List<NhanVien_ToNhomModel> delete_lst = cur_lst.Except<NhanVien_ToNhomModel>(item.lstNhanVienToNhom).ToList(); // Danh sách nhân viên bị xóa
                List<NhanVien_ToNhomModel> insert_lst = item.lstNhanVienToNhom.Except<NhanVien_ToNhomModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
                foreach (NhanVien_ToNhomModel del in cur_lst) // Xóa các item cũ
                {
                    if (nvdao.Delete(del.ID))
                    {

                    }
                    else
                    {
                        countXoaErr++;
                    }
                }
                foreach (NhanVien_ToNhomModel ins in item.lstNhanVienToNhom) // Thêm các item mới
                {
                    if (nvdao.Insert(ins, IDnew) > 0)
                    {

                    }
                    else
                    {
                        countThemErr++;
                    }
                }
                //if (delete_lst != null)
                //{
                //    foreach (NhanVien_ToNhomModel del in delete_lst) // Xóa các item cũ
                //    {
                //        if (nvdao.Delete(del.ID))
                //        {

                //        }
                //        else
                //        {
                //            countXoaErr++;
                //        }
                //    }
                //}
                //if (insert_lst != null)
                //{
                //    foreach (NhanVien_ToNhomModel ins in insert_lst) // Thêm các item mới
                //    {
                //        if (nvdao.Insert(ins, IDnew) > 0)
                //        {

                //        }
                //        else
                //        {
                //            countThemErr++;
                //        }
                //    }
                //}
            }


            if (IDnew > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_ToNhom(int ID)
        {
            ToNhomDAO dm_dao = new ToNhomDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_ToNhomDAO nvtndao = new NhanVien_ToNhomDAO();
            NhanVienDAO nvdao = new NhanVienDAO();
            if (nvdao.GetAllNhanVienTrongToNhom(ID).Count > 0)
            {
                if (nvtndao.DeleteByIDToNhom(ID))
                {
                    if (dm_dao.Delete(ID))
                    {
                        return Json(new { success = true, msg = "Xóa tổ nhóm thành công" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { success = false, msg = "Xóa tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { success = false, msg = "Xóa nhân viên trong tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);

                }
            }
            else
            {
                if (dm_dao.Delete(ID))
                {
                    return Json(new { success = true, msg = "Xóa tổ nhóm thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, msg = "Xóa tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
                }
            }

        }

        [HttpPost]
        public ActionResult DeleteMulti_ToNhom(string ID)
        {
            ToNhomDAO dm_dao = new ToNhomDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_ToNhomDAO nvdao = new NhanVien_ToNhomDAO();
            if (dm_dao.DeleteMulti(ID))
            {
                if (nvdao.DeleteMultiByIDToNhom(ID))
                {

                }
                return Json(new { success = true, msg = "Xóa tổ nhóm thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
            //if (nvdao.DeleteMultiByIDToNhom(ID))
            //{
            //    if (dm_dao.DeleteMulti(ID))
            //    {
            //        return Json(new { success = true, msg = "Xóa tổ nhóm thành công" }, JsonRequestBehavior.AllowGet);
            //    }
            //    else
            //    {
            //        return Json(new { success = false, msg = "Xóa tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            //    }
            //}
            //else
            //{
            //    return Json(new { success = false, msg = "Xóa nhân viên trong tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);

            //}

        }
    }
}