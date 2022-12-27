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
    public class XinNghiHocController : Controller
    {
        [SessionExpire]
        // GET: XinNghiHoc
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllLichNghi(int ID_Lop, DateTime TuNgay, DateTime DenNgay)
        {
            XinNghiPhepDAO lhdao = new XinNghiPhepDAO();
            return Json(lhdao.GetByLop(ID_Lop, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UpdateTrangThaiNghiPhep(XinNghiPhepModel item)
        {
            XinNghiPhepDAO lhdao = new XinNghiPhepDAO();
            int ID = lhdao.InsertOrUpdate(item);
            return Json(new { status = (ID > 0 ? true : false) }, JsonRequestBehavior.AllowGet);
        }
    }
}