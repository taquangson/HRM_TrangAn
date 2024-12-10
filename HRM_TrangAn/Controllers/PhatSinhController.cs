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
    public class PhatSinhController : Controller
    {
        // GET: PhatSinh
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllPhatSinh()
        {
            PhatSinhDAO dao = new PhatSinhDAO();
            List<PhatSinhModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetByNhanVien_Ngay(int ID_NhanVien, DateTime Ngay)
        {
            PhatSinhDAO dao = new PhatSinhDAO();
            List<PhatSinhModel> data = dao.GetByNhanVien_Ngay(ID_NhanVien, Ngay);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertOrUpdate_PhatSinh(PhatSinhModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhatSinhDAO dao = new PhatSinhDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            int countErr = 0;
            foreach (int idnv in item.lstNhanVienPhatSinh)
            {
                int IDnew = 0;
                IDnew = dao.InsertOrUpdate(item, idnv);
                if (IDnew > 0)
                {
                    if(item.ID > 0)
                    {
                        clddao.InsertOrUpdate(idnv, 8, item.Cong, item.ID, item.NgayApDung);
                    }
                    else
                    {
                        clddao.InsertOrUpdate(idnv, 4, item.Cong, IDnew, item.NgayApDung);

                    }
                    
                }
                else
                {
                    countErr++;
                }
            }
            if (countErr == 0)
            {
                
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu " + countErr + " danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult DeleteMulti_PhatSinh(string ID)
        {
            PhatSinhDAO dm_dao = new PhatSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            CongLaoDongDAO clddao = new CongLaoDongDAO();

            if (dm_dao.DeleteMulti(ID))
            {
                clddao.DeleteMultiByIDChuyenTo(ID);

                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }


        }
    }
}