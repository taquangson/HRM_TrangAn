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
    public class NoCongController : Controller
    {
        // GET: NoCong
        public ActionResult Index()
        {
            return View();
        }
        [SessionExpire]
        [HttpGet]
        public ActionResult GetNoCong(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            NoCongDAO dao = new NoCongDAO();
            List<NoCongModel> data = dao.GetDataNoCong(TuNgay, DenNgay, ID_ToNhom);
            return Content(JsonConvert.SerializeObject(data));
        }
    }
}