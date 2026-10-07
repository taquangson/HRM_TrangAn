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
        public ActionResult DG(string I)
        {
            return Redirect("https://docs.google.com/forms/d/e/1FAIpQLScALFdIn6gqbzt_GFOE2g_dUt9jkk6Z66-JPh0PCGvPCjIUzw/viewform?usp=pp_url&entry.289727354=" + I.ToString());
        }

        [AllowAnonymous]
        public ActionResult DV(int? I)
        {
            return Redirect("https://muave.disantrangan.vn");
        }

        [AllowAnonymous]
        public ActionResult UpdateSoLuongKhach(int ID_ChuyenDo, int SoLuong)
        {
            ChuyenDoDAO cddao = new ChuyenDoDAO();
            if (cddao.UpdateSoLuongKhach(ID_ChuyenDo, SoLuong))
                return Json(new { success = true, msg = "Lưu chuyến thành công" }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }

    }
}