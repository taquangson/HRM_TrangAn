using HRM_TrangAn.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class CongViecController : Controller
    {
        // GET: CongViec
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult PhanCongCongViec()
        {
            return View();
        }
    }
}