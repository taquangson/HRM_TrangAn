using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
namespace HRM_TrangAn.Controllers
{
    public class BaiKiemTraController : Controller
    {
        // GET: BaiKiemTra
        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhSachBaiKiemTra()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ThemBaiKiemTra(BaiKiemTraModel model)
        {
            BaiKiemTraDAO bktdao = new BaiKiemTraDAO();
            bktdao.InsertOrUpdate(model);
            return Json(new { status = true, msg = "Lưu bài kiểm tra thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult XoaBaiKiemTra(int ID)
        {
            BaiKiemTraDAO bktdao = new BaiKiemTraDAO();
            bktdao.Delete(ID);
            return Json(new { status = true, msg = "Xóa bài kiểm tra thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult XoaAnh(int ID)
        {
            AnhBaiKiemTraDAO bktdao = new AnhBaiKiemTraDAO();
            bktdao.Delete(ID);
            return Json(new { status = true, msg = "Xóa ảnh bài kiểm tra thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetBaiKiemTraByHocSinh(int ID_HocSinh)
        {
            BaiKiemTraDAO bktdao = new BaiKiemTraDAO();
            return Json(bktdao.GetByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetBaiKiemTraByID(int ID)
        {
            BaiKiemTraDAO bktdao = new BaiKiemTraDAO();
            return Json(bktdao.GetByID(ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file, int ID_BaiKiemTra)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/Images/BaiKiemTra"), fileName);
                file.SaveAs(path);
                AnhBaiKiemTraModel item = new AnhBaiKiemTraModel();
                item.DuongDan = fileName;
                item.ID_BaiKiemTra = ID_BaiKiemTra;
                AnhBaiKiemTraDAO dao = new AnhBaiKiemTraDAO();
                dao.InsertOrUpdate(item);
            }
            return Json(new { status = true, msg = "Cập nhật ảnh bài kiểm tra thành công" }, JsonRequestBehavior.AllowGet);
        }
    }
}