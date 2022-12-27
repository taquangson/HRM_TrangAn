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
    public class ThongBaoAppController : Controller
    {
        // GET: ThongBaoApp
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }


        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = Path.GetFileName(file.FileName);
                string path = Path.Combine(Server.MapPath("~/Images/AnhThongBao"), fileName);
                file.SaveAs(path);
                return Json(new { status = true, msg = fileName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "" }, JsonRequestBehavior.AllowGet);
            }
        }


        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate(ThongBaoAppModel model)
        {
            ThongBaoAppDAO bktdao = new ThongBaoAppDAO();
            bktdao.InsertOrUpdate(model);
            return Json(new { status = true, msg = "Lưu thông báo thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UpdateTrangThai(int ID, int TrangThai)
        {
            ThongBaoAppDAO bktdao = new ThongBaoAppDAO();
            ThongBaoAppModel item = bktdao.GetByID(ID);
            item.TrangThai = TrangThai;
            bktdao.InsertOrUpdate(item);
            return Json(new { status = true, msg = "Lưu thông báo thành công" }, JsonRequestBehavior.AllowGet);
        }

    }
}