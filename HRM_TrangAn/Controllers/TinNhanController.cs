using Newtonsoft.Json.Linq;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class TinNhanController : Controller
    {
        // GET: TinNhan
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public class TinNhanModel
        {
            public string SoDienThoai { get; set; }
            public int ID_HocSinh { get; set; }
            public string NoiDungTinNhan { get; set; }
            public int TrangThai { get; set; }
            public DateTime NgayGui { get; set; }
            public List<string> ThamSo { get; set; }
        }

        public class ResponseVNPT
        {
            public string ERROR_DESC { get; set; }
            public int ERROR { get; set; }
            public string name { get; set; }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllMauTin()
        {
            MauTinNhanDAO lhdao = new MauTinNhanDAO();
            return Json(lhdao.GetAll(), JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        [HttpPost]
        public ActionResult GuiTinNhan(List<TinNhanModel> data, string maguitin)
        {
            if (data != null)
            {
                List<TinNhanModel> thanhcong = new List<TinNhanModel>();
                List<TinNhanModel> thatbai = new List<TinNhanModel>();
                foreach (TinNhanModel tn in data)
                {
                    string json = Push(StringHelper.RemoveVietNameseSign(tn.NoiDungTinNhan), "84" + tn.SoDienThoai.Substring(1), maguitin);
                    var result = JObject.Parse(json);
                    string err_des = (string)result["RPLY"]["ERROR_DESC"];
                    string err_code = (string)result["RPLY"]["ERROR"];
                    if (err_code == "0")
                    {
                        thanhcong.Add(tn);
                    }
                    else
                    {
                        thatbai.Add(tn);
                    }
                }
                return Json(new { status = true, msg = "Gửi tin nhắn thành công", thanhcong = thanhcong, thatbai = thatbai }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Gửi tin nhắn thất bại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GuiTinNhanTheoMau(List<TinNhanModel> data, string maguitin)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(typeof(TinNhanController));
            if (data != null)
            {
                List<TinNhanModel> thanhcong = new List<TinNhanModel>();
                List<TinNhanModel> thatbai = new List<TinNhanModel>();
                foreach (TinNhanModel tn in data)
                {
                    string json = PushByTemplate(tn.ThamSo, "84" + tn.SoDienThoai.Substring(1), maguitin);
                    var result = JObject.Parse(json);
                    string err_des = (string)result["RPLY"]["ERROR_DESC"];
                    string err_code = (string)result["RPLY"]["ERROR"];
                    if (err_code == "0")
                    {
                        thanhcong.Add(tn);
                    }
                    else
                    {
                        log.Info(err_code + " - " + err_des);
                        thatbai.Add(tn);
                    }
                }
                return Json(new { status = true, msg = "Gửi tin nhắn thành công", thanhcong = thanhcong, thatbai = thatbai }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Gửi tin nhắn thất bại" }, JsonRequestBehavior.AllowGet);
            }
        }

        public string Push(string msg, string sodienthoai, string ID_Template)
        {

            String sResponseFromServer = "";
            try
            {

                //string senderId = ConfigurationManager.AppSettings["PROJECTID"];
                //string apiKey = ConfigurationManager.AppSettings["FIREBHRM_TrangAnAPI"];
                WebRequest tRequest;

                tRequest = WebRequest.Create("http://113.185.0.35:8888/smsbn/api");

                tRequest.Method = "post";
                tRequest.UseDefaultCredentials = true;

                tRequest.PreAuthenticate = true;

                tRequest.Credentials = CredentialCache.DefaultNetworkCredentials;

                tRequest.ContentType = "application/json";
                //tRequest.Headers.Add(string.Format("Authorization: key={0}", apiKey));

                string post = "{\"RQST\": {\"name\": \"send_sms_list\",\"REQID\": \"1\",\"LABELID\": \"136693\",\"CONTRACTID\": \"12879\",\"CONTRACTTYPEID\": \"1\",\"TEMPLATEID\": \"" + ID_Template
                    + "\",\"PARAMS\": [{\"NUM\": \"1\","
                    + "\"CONTENT\": \"" + msg + "\"}],\"SCHEDULETIME\": \"\","
                    + "\"MOBILELIST\": \"" + sodienthoai + "\",\"ISTELCOSUB\": \"0\",\"AGENTID\": \"162\",\"APIUSER\": \"DuonghoaEdu\",\"APIPASS\": \"Vnpt@123\",\"USERNAME\": \"DuonghoaEdu\",\"DATACODING\": \"0\"}}";

                Byte[] byteArray = UTF8Encoding.UTF8.GetBytes(post);


                tRequest.ContentLength = byteArray.Length;

                Stream dataStream = tRequest.GetRequestStream();

                dataStream.Write(byteArray, 0, byteArray.Length);

                dataStream.Close();

                WebResponse tResponse = tRequest.GetResponse();

                dataStream = tResponse.GetResponseStream();

                StreamReader tReader = new StreamReader(dataStream);

                sResponseFromServer = tReader.ReadToEnd();

                tReader.Close();

                dataStream.Close();
                tResponse.Close();
            }
            catch (Exception ex)
            {

            }
            return sResponseFromServer;
        }

        public string PushByTemplate(List<string> thamso, string sodienthoai, string ID_Template)
        {

            String sResponseFromServer = "";
            try
            {

                //string senderId = ConfigurationManager.AppSettings["PROJECTID"];
                //string apiKey = ConfigurationManager.AppSettings["FIREBHRM_TrangAnAPI"];
                WebRequest tRequest;

                tRequest = WebRequest.Create("http://113.185.0.35:8888/smsbn/api");

                tRequest.Method = "post";
                tRequest.UseDefaultCredentials = true;

                tRequest.PreAuthenticate = true;

                tRequest.Credentials = CredentialCache.DefaultNetworkCredentials;

                tRequest.ContentType = "application/json";
                //tRequest.Headers.Add(string.Format("Authorization: key={0}", apiKey));

                string post = "{\"RQST\": {\"name\": \"send_sms_list\",\"REQID\": \"1\",\"LABELID\": \"136693\",\"CONTRACTID\": \"12879\",\"CONTRACTTYPEID\": \"1\",\"TEMPLATEID\": \"" + ID_Template
                    + "\",\"PARAMS\": [";
                for (int i = 0; i < thamso.Count; i++)
                {
                    post += "{\"NUM\": \"" + (i + 1) + "\",\"CONTENT\": \"" + thamso[i] + "\"},";
                }
                post = post.Substring(0, post.Length - 1);
                post += "],\"SCHEDULETIME\": \"\","
                    + "\"MOBILELIST\": \"" + sodienthoai + "\",\"ISTELCOSUB\": \"0\",\"AGENTID\": \"162\",\"APIUSER\": \"DuonghoaEdu\",\"APIPASS\": \"Vnpt@123\",\"USERNAME\": \"DuonghoaEdu\",\"DATACODING\": \"0\"}}";

                Byte[] byteArray = UTF8Encoding.UTF8.GetBytes(post);


                tRequest.ContentLength = byteArray.Length;

                Stream dataStream = tRequest.GetRequestStream();

                dataStream.Write(byteArray, 0, byteArray.Length);

                dataStream.Close();

                WebResponse tResponse = tRequest.GetResponse();

                dataStream = tResponse.GetResponseStream();

                StreamReader tReader = new StreamReader(dataStream);

                sResponseFromServer = tReader.ReadToEnd();

                tReader.Close();

                dataStream.Close();
                tResponse.Close();
            }
            catch (Exception ex)
            {

            }
            return sResponseFromServer;
        }
    }
}