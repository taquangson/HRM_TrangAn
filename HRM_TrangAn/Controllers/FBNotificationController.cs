using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Hubs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
namespace HRM_TrangAn.Controllers
{
    public class FBNotificationController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(FBNotificationController));
        public class NotifyModel
        {
            public List<string> Users { get; set; }
            public List<string> Tokens { get; set; }
            public string TieuDe { get; set; }
            public string NoiDung { get; set; }
            public string NoiDungHTML { get; set; }
            public string NoiDungRieng { get; set; }
            public string AnhDaiDien { get; set; }
        }
        [AllowAnonymous]
        [HttpPost]
        [ValidateInput(false)]
        public async Task<ActionResult> PushNotify(NotifyModel model)
        {
            // See documentation on defining a message payload.
            string bHRM_TrangAnUrl = Request.Url.Scheme + "://" + Request.Url.Authority +
    Request.ApplicationPath.TrimEnd('/') + "/";
            var notification = new Notification()
            {
                Title = model.TieuDe,
                Body = model.NoiDung,
                ImageUrl = bHRM_TrangAnUrl + "Images/" +  model.AnhDaiDien
            };
            var androidconfig = new AndroidConfig()
            {
                Notification = new AndroidNotification()
                {
                    Sound = "default",
                    ImageUrl = bHRM_TrangAnUrl + "Images/" + model.AnhDaiDien,
                    Title = model.TieuDe

                }
            };

            var apns = new ApnsConfig()
            {

                Aps = new Aps()
                {
                    Sound = "default",
                    Badge = 1
                }
            };

            var message = new MulticastMessage()
            {
                Notification = notification,
                Android = androidconfig,
                Apns = apns,
                Tokens = model.Tokens
            };
            ThongBaoAppDAO tbdao = new ThongBaoAppDAO();
            ThongBaoAppModel tb = new ThongBaoAppModel();
            tb.ID = 0;
            tb.AnhDaiDien = model.AnhDaiDien;
            tb.Data = "";
            tb.Loai = string.IsNullOrWhiteSpace(model.NoiDungHTML) ? 0 : 1;
            tb.NoiDung = model.NoiDung;
            tb.NoiDungHtml = model.NoiDungHTML;
            tb.NoiDungRieng = model.NoiDungRieng;
            tb.TieuDe = model.TieuDe;
            int ID_ThongBao = tbdao.InsertOrUpdate(tb);
            foreach (string uname in model.Users)
            {
                LichSuThongBaoModel lstb = new LichSuThongBaoModel();
                lstb.ID_ThongBao = ID_ThongBao;
                lstb.UserName = uname;
                lstb.ID_Lop = 0;
                lstb.NoiDungRieng = "";
                tbdao.GhiLichSu(lstb);
            }
            var failedTokens = new List<string>();
            if (model.Tokens != null)
            {
                // Send a message to the device corresponding to the provided
                // registration token.
                BatchResponse response = await FirebaseMessaging.DefaultInstance.SendMulticastAsync(message);
                // Response is a message ID string.
                if (response.FailureCount > 0)
                {
                    for (var i = 0; i < response.Responses.Count; i++)
                    {
                        if (!response.Responses[i].IsSuccess)
                        {
                            // The order of responses corresponds to the order of the registration tokens.
                            failedTokens.Add(model.Tokens[i]);
                            log.Error("Fail noti for: " + model.Tokens[i] + " - " + response.Responses[i].Exception.Message);
                        }
                    }
                }                
            }
            return Json(new { status = true, msg = "Gửi thông báo thành công", data = failedTokens }, JsonRequestBehavior.AllowGet);
        }
    }
}
