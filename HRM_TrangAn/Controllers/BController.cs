using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using NPOI.POIFS.Crypt.Dsig;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static HRM_TrangAn.DataAccess.DAO.BaoCaoDAO;

namespace HRM_TrangAn.Controllers
{
    public class BController : Controller
    {
        [AllowAnonymous]
        public ActionResult B(int? I)
        {
            return RedirectToAction("BaoCaoForLaiDo", "BaoCao", new { ID_LaiDo = I });
        }

        [AllowAnonymous]
        public ActionResult DG(int? I)
        {
            return Redirect("https://docs.google.com/forms/d/e/1FAIpQLSfAja_rqx6ayhCgue0TM5CtPohGh_9N9G3l8F61GRK6AJBBzQ/viewform?usp=pp_url&entry.1488161317=" + I.ToString());
        }

        [AllowAnonymous]
        public ActionResult DV(int? I)
        {
            return Redirect("https://muave.disantrangan.vn");
        }

    }
}