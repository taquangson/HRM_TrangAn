using Newtonsoft.Json.Linq;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.Controllers
{
    public class NghiepVuController : Controller
    {
        // GET: NghiepVu
        [SessionExpire]
        public ActionResult QuanLyTicket()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyTicket2()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyTuyenDo()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyCong()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyChuyenTo()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyLichNghi()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyDonSuaChuaThuyen()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult XacNhanTicket()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyXuPhat()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyXuPhatNhanVien()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyPhatSinh()
        {
            return View();
        }
        
        [SessionExpire]
        public ActionResult QuanLyCongTinhTien()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyDiMuonVeSom()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyChuyenCong()
        {
            return View();
        }
    }
}