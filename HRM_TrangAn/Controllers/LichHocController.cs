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
    public class LichHocController : Controller
    {
        // GET: LichHoc
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TraCuuLichHoc()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetLichHocByLop(int ID_Lop)
        {
            LichHocDAO lhdao = new LichHocDAO();
            return Json(lhdao.GetByLop(ID_Lop), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetLichTuan(string GioBatDau, string GioKetThuc)
        {
            LichHocDAO lhdao = new LichHocDAO();
            List<LichHocModel> lst = lhdao.GetAllTuanByCa(GioBatDau, GioKetThuc);
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<LopHocModel> lstLop = new LopHocDAO().GetByGiaoVien(userinfor.ID);
            if (userinfor.Role == 3)
            {
                lst = lst.Where(x => lstLop.Find(l => l.ID == x.ID_Lop) != null).ToList();
            }
            else if (userinfor.Role == 2)
            {
                lst = lst.Where(x => x.ID_ChiNhanh == userinfor.ID_ChiNhanh).ToList();
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public class TraCuuLichModel
        {
            public List<int> ID_Lop { get; set; }
            public string GioBatDau { get; set; }
            public string GioKetThuc { get; set; }
        }



        [HttpPost]
        public ActionResult TraCuuLich(TraCuuLichModel model)
        {
            LichHocDAO lhdao = new LichHocDAO();
            List<LichHocModel> lst = new List<LichHocModel>();
            if (model.ID_Lop != null)
            {
                lst = lhdao.GetAllTuanByCaByLop(string.Join(",", model.ID_Lop), model.GioBatDau, model.GioKetThuc);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}