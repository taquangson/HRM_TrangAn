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
    public class XuPhatNhanVienController : Controller
    {
        // GET: XuPhat
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllXuPhat()
        {
            XuPhatNhanVienDAO dao = new XuPhatNhanVienDAO();
            List<XuPhatNhanVienModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetXuPhatNhanVienByDateRange(string TuNgay, string DenNgay)
        {

            DateTime TuNgayDate = DateTime.ParseExact(TuNgay, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(DenNgay, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            XuPhatNhanVienDAO dao = new XuPhatNhanVienDAO();
            List<XuPhatNhanVienModel> data = dao.GetByDateRange(TuNgayDate, DenNgayDate);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertOrUpdate_XuPhat(XuPhatNhanVienModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            XuPhatNhanVienDAO dao = new XuPhatNhanVienDAO();
            //NhanVien_XuPhatDAO nvdao = new NhanVien_XuPhatDAO();
            //int IDnew = 0;
            //int countXoaErr = 0;
            //int countThemErr = 0;

            //if (item.ID == 0)
            //{
            //    IDnew = dao.InsertOrUpdate(item);
            //    foreach (NhanVien_XuPhatModel x in item.lstNhanVienXuPhat)
            //    {
            //        nvdao.Insert(x.ID_NhanVien, IDnew);
            //    }
            //}
            //else
            //{
            //    IDnew = dao.InsertOrUpdate(item);
            //    List<NhanVien_XuPhatModel> cur_lst = nvdao.GetAllByXuPhat(item.ID);
            //    if (item.lstNhanVienXuPhat == null)
            //    {
            //        item.lstNhanVienXuPhat = new List<NhanVien_XuPhatModel>();
            //    }
            //    List<int> cur_lstID = cur_lst.Select(c => c.ID_NhanVien).ToList();
            //    List<int> update_lstID = item.lstNhanVienXuPhat.Select(c => c.ID_NhanVien).ToList();
            //    List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
            //    List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách nhân viên được thêm
            //    foreach(int idnv in delete_lstID)
            //    {
            //        foreach (NhanVien_XuPhatModel del in cur_lst) // Xóa các item cũ
            //        {
            //            if (del.ID_NhanVien == idnv)
            //            {
            //                if (nvdao.Delete(del.ID))
            //                {
            //                }
            //                else
            //                {
            //                    countXoaErr++;
            //                }
            //            }
                        

            //        }
            //    }
            //    foreach (int idnv in insert_lstID)
            //    {
            //        if (nvdao.Insert(idnv, IDnew) > 0)
            //        {
            //        }
            //        else
            //        {
            //            countThemErr++;
            //        }
            //    }
                
            //    //List<NhanVien_XuPhatModel> lstUpdate = item.lstNhanVienXuPhat.Where(x => x.TrangThai == 0).ToList();
            //    //List<NhanVien_XuPhatModel> delete_lst = cur_lst.Except<NhanVien_XuPhatModel>(item.lstNhanVienXuPhat).ToList(); // Danh sách nhân viên bị xóa
            //    //List<NhanVien_XuPhatModel> insert_lst = item.lstNhanVienXuPhat.Except<NhanVien_XuPhatModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
            //    //if (delete_lst != null)
            //    //{
            //    //    foreach (NhanVien_XuPhatModel del in delete_lst) // Xóa các item cũ
            //    //    {
            //    //        if (nvdao.Delete(del.ID))
            //    //        {

            //    //        }
            //    //        else
            //    //        {
            //    //            countXoaErr++;
            //    //        }

            //    //    }
            //    //}
            //    //if (insert_lst != null)
            //    //{
            //    //    foreach (NhanVien_XuPhatModel ins in insert_lst) // Thêm các item mới
            //    //    {
            //    //        if (nvdao.Insert(ins, IDnew) > 0)
            //    //        {

            //    //        }
            //    //        else
            //    //        {
            //    //            countThemErr++;
            //    //        }
            //    //    }
            //    //}
            //}

                
            if (dao.InsertOrUpdateMulti(item))
            {
                
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
        
        
        
        [HttpPost]
        public ActionResult InsertOrUpdate_XuPhatFromDiMuon(XuPhatNhanVienModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            XuPhatNhanVienDAO dao = new XuPhatNhanVienDAO();
                           
            if (dao.InsertOrUpdate(item) > 0)
            {
                
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult DeleteMulti_XuPhat(string ID)
        {
            XuPhatNhanVienDAO dm_dao = new XuPhatNhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_XuPhatDAO nvdao = new NhanVien_XuPhatDAO();
            if (dm_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }


        }

        [HttpGet]
        public ActionResult GetBaoCao(string from, string to)
        {

            DateTime TuNgayDate = DateTime.ParseExact(from, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(to, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            XuPhatNhanVienDAO dao = new XuPhatNhanVienDAO();
            List<BaoCaoXuPhatViewModel> data = dao.GetBaoCao(TuNgayDate, DenNgayDate);
            return Content(JsonConvert.SerializeObject(data));
        }
    }
}