using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static HRM_TrangAn.App_Start.SocketChatServer;

namespace HRM_TrangAn.Controllers
{
    public class ChatMessageController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllTinNhan(DateTime TuNgay, DateTime DenNgay)
        {
            TinNhanPhanHoiDAO lhdao = new TinNhanPhanHoiDAO();
            return Json(lhdao.GetAllByNgayGui(TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetTinNhanByUser(string Username)
        {
            TinNhanDAO tndao = new TinNhanDAO();
            List<TinNhanModel> data = tndao.GetByUser(Username);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllSession()
        {
            ChatSessionDAO lhdao = new ChatSessionDAO();
            return Json(lhdao.GetAll(), JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        [HttpGet]
        public ActionResult SendMesage(MessageJson ms)
        {
            SocketChatServer.Server_SendNewMessageToClient(ms);
            return Json(new { success = true, message = "OK" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult UpdateDaXem(string Username)
        {
            TinNhanDAO tndao = new TinNhanDAO();
            return Json(new { success = tndao.UpdateDaXem("0" + Username), message = "OK" }, JsonRequestBehavior.AllowGet);
        }
    }
}