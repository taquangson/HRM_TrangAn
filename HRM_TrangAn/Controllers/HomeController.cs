using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static HRM_TrangAn.DataAccess.DAO.BaoCaoDAO;

namespace HRM_TrangAn.Controllers
{
    public class HomeController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            if (Session["UserInfor"] != null)
            {
                try
                {
                    UserAppModel userinfor = (UserAppModel)System.Web.HttpContext.Current.Session["UserInfor"];
                    if (userinfor.ExpriedTime > DateTime.Now)
                    {
                        return RedirectToAction("IndexHS", "Home");
                    }
                    else
                    {
                        return RedirectToAction("Login", "User");
                    }
                }
                catch
                {

                }
                return View();

            }
            else
            {
                return RedirectToAction("Login", "User");
            }
        }

        [SessionExpire]
        public ActionResult IndexHS()
        {
            ViewBag.Title = "Trang chủ hệ thống dạy học trực tuyến";

            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ContentResult GetDataChamCong(DateTime from, DateTime to, int ID_ToNhom)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            ChamCongDAO ccdao = new ChamCongDAO();
            List<ChamCongMonitorModel> data = ccdao.GetListMonitorChamCong_ByNgay(from, to, ID_ToNhom);
            //var serializedResult = serializer.Serialize(data);
            return Content(JsonConvert.SerializeObject(data));
            //return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        //[SessionExpire]
        [EnableCors("*","*","*")]
        [HttpGet]
        public ActionResult GetDataThuyenVeBen(DateTime ngay)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            ChamCongDAO ccdao = new ChamCongDAO();
            List<ChamCongMonitorModel> data = ccdao.GetListMonitorChamCong_ByNgay(ngay, 2006);
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult SoLaiDoCoTichKeTrongThang()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            BaoCaoDAO ccdao = new BaoCaoDAO();
            string data = ccdao.SoLaiDoCoTichKeTrongThang();
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult SoLaiDoDangLam_DaNghi()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            BaoCaoDAO ccdao = new BaoCaoDAO();
            DataRow data = ccdao.SoLaiDoDangLam_DaNghi();
            var serializedResult = serializer.Serialize(new { DangLam = data[0].ToString(), DaNghi = data[1].ToString() });
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetTinhTrangChungChi()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            BaoCaoDAO ccdao = new BaoCaoDAO();
            TinhTrangChungChiModel data = ccdao.GetTinhTrangChungChi();
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult SoHopDongSapHetHan()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            BaoCaoDAO ccdao = new BaoCaoDAO();
            HopDongSapHetHanModel data = ccdao.SoHopDongSapHetHan();
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetDataMatKetNoi(DateTime from, DateTime to)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            LichSuKetNoiMCCDAO ccdao = new LichSuKetNoiMCCDAO();
            //DiemQuetTheDAO dao = new DiemQuetTheDAO();
            //MayChamCong_DiemQuetTheDAO dqtdao = new MayChamCong_DiemQuetTheDAO();
            //List<DiemQuetTheModel> list = dao.GetAll().Where(x => x.TrangThai == 1).ToList();

            List<LichSuKetNoiMCCModel> data = ccdao.GetData();
            foreach (LichSuKetNoiMCCModel item in data)
            {
                string ghichu = "";
                TimeSpan t = DateTime.Now - item.ThoiGianKetNoi;
                ghichu += t.Days > 0 ? t.Days + " ngày " : "";
                ghichu += t.Hours > 0 ? t.Hours + " giờ " : "";
                ghichu += t.Minutes > 0 ? t.Minutes + " phút " : "";
                ghichu += t.Seconds > 0 ? t.Seconds + " giây " : "Dưới 1 giây";
                item.GhiChu = ghichu;
            }
            //foreach (DiemQuetTheModel d in list)
            //{
            //    List<MayChamCong_DiemQuetTheModel> lstMCC = dqtdao.GetAllByDiemQuetThe(d.ID);
            //    foreach (MayChamCong_DiemQuetTheModel dqt in lstMCC)
            //    {
            //        LichSuKetNoiMCCModel item = ccdao.GetTrangThaiHienTai(dqt.ID_MayChamCong);
            //        string ghichu = "";
            //        if (item.TrangThaiKetNoi == 0)
            //            LichSuKetNoiMCCModel lastchange = ldata.Where(x => x.TrangThaiKetNoi == 1).FirstOrDefault();
            //            if (lastchange != null)
            //            {
            //                TimeSpan t = item.ThoiGianKetNoi - lastchange.ThoiGianKetNoi;
            //                ghichu = t.Days > 0 ? t.Days + " ngày" : "";
            //                ghichu = t.Hours > 0 ? t.Hours + " giờ" : "";
            //                ghichu = t.Minutes > 0 ? t.Minutes + " phút" : "";
            //            }
            //            else
            //            {
            //                TimeSpan tt = item.ThoiGianKetNoi - from;
            //                ghichu = tt.Days > 0 ? tt.Days + " ngày" : "";
            //                ghichu = tt.Hours > 0 ? tt.Hours + " giờ" : "";
            //                ghichu = tt.Minutes > 0 ? tt.Minutes + " phút" : "";
            //            }
            //        }
            //        item.GhiChu = ghichu;
            //        data.Add(item);
            //    }
            //}
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetDataMatKetNoi2(DateTime from, DateTime to)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            LichSuKetNoiMCCDAO ccdao = new LichSuKetNoiMCCDAO();
            DiemQuetTheDAO dao = new DiemQuetTheDAO();
            MayChamCong_DiemQuetTheDAO dqtdao = new MayChamCong_DiemQuetTheDAO();
            MayChamCongDAO mccdao = new MayChamCongDAO();
            List<DiemQuetTheModel> list = dao.GetAll().Where(x => x.TrangThai == 1).ToList();
            List<LichSuKetNoiMCCModel> data = new List<LichSuKetNoiMCCModel>();
            //foreach (DiemQuetTheModel d in list)
            //{
            //List<MayChamCong_DiemQuetTheModel> lstMCC = dqtdao.GetAllByDiemQuetThe(d.ID);
            List<MayChamCongModel> lstMCC = mccdao.GetAll();
            foreach (MayChamCongModel dqt in lstMCC)
            {
                LichSuKetNoiMCCModel item = ccdao.GetTrangThaiHienTai(dqt.ID);
                string ghichu = "";
                if (item.TrangThaiKetNoi == 0)
                {
                    List<LichSuKetNoiMCCModel> ldata = ccdao.GetByMCC(dqt.ID, from, to);
                    LichSuKetNoiMCCModel lastchange = ldata.Where(x => x.TrangThaiKetNoi == 1).FirstOrDefault();
                    if (lastchange != null)
                    {
                        TimeSpan t = item.ThoiGianKetNoi - lastchange.ThoiGianKetNoi;
                        ghichu += t.Days > 0 ? t.Days + " ngày " : "";
                        ghichu += t.Hours > 0 ? t.Hours + " giờ " : "";
                        ghichu += t.Minutes > 0 ? t.Minutes + " phút " : "";
                        ghichu += t.Seconds > 0 ? t.Seconds + " giây " : "Dưới 1 giây";
                    }
                    else
                    {
                        TimeSpan tt = item.ThoiGianKetNoi - from;
                        ghichu += tt.Days > 0 ? tt.Days + " ngày " : "";
                        ghichu += tt.Hours > 0 ? tt.Hours + " giờ " : "";
                        ghichu += tt.Minutes > 0 ? tt.Minutes + " phút " : "";
                        ghichu += tt.Seconds > 0 ? tt.Seconds + " giây " : "Dưới 1 giây";
                    }
                }
                item.GhiChu = ghichu;
                data.Add(item);
            }
            //}
            var serializedResult = serializer.Serialize(data);
            return Json(serializedResult, JsonRequestBehavior.AllowGet);

        }
    }
}