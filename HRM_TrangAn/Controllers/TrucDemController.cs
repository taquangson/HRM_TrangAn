using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Microsoft.Office.Interop.Excel;
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
    public class TrucDemController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public class TrucDemFilterModel
        {
            public int ID_PhongBan { get; set; }
            public string ListID_HSNS { get; set; }
            public DateTime from { get; set; }
            public DateTime to { get; set; }
        }

        [SessionExpire]
        public ActionResult GetAllByDate(TrucDemFilterModel model)
        {
            TrucDemDAO bktdao = new TrucDemDAO();
            List<TrucDemModel> data =  bktdao.GetByNgay(model.ID_PhongBan, model.ListID_HSNS, model.from, model.to);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult CountAllByDate(TrucDemFilterModel model)
        {
            TrucDemDAO bktdao = new TrucDemDAO();
            List<CountTrucDemModel> data = bktdao.CountByNgay(model.ID_PhongBan, model.ListID_HSNS, model.from, model.to);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetNhanVienByDate(DateTime Ngay, int ID_PhongBan, string ListID_HSNS)
        {
            TrucDemDAO bktdao = new TrucDemDAO();
            List<TrucDemModel> data = bktdao.GetNhanVienByDate(ID_PhongBan, ListID_HSNS, Ngay);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult InsertOrUpdate(TrucDemModel model)
        {
            TrucDemDAO bktdao = new TrucDemDAO();
            bktdao.InsertOrUpdate(model);
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult Delete(int ID)
        {
            TrucDemDAO bktdao = new TrucDemDAO();
            bktdao.Delete(ID);
            return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }
    }
}