using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.Controllers
{
    public class ChuyenDoController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChuyenDoController));
        // GET: ChuyenDo
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllChuyenDo()
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChuyenDoModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetChamCongByChuyenDo(int ID_ChuyenDo)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChamCongModel> data = dao.GetChamCongByChuyenDo(ID_ChuyenDo);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllChuyenDoThieu(DateTime From, DateTime To)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChuyenDoModel> data = new List<ChuyenDoModel>();
            //JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                data = dao.GetChuyenDoThieu(From, To);
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
            }
            //var serializedResult = serializer.Serialize(data);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetChuyenDoByNgay(DateTime Ngay)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChuyenDoModel> data = dao.GetChuyenDoByNgay(Ngay);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetChuyenDoByNgay_NhanVien(DateTime Ngay, int ID_NhanVien)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChuyenDoModel> data = dao.GetChuyenDoByNgay_NhanVien(Ngay, ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetChuyenDo_NhanVien(DateTime From, DateTime To, int ID_NhanVien)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            List<ChuyenDoModel> data = dao.GetChuyenDo_GetByNhanVien(From, To, ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetChamCongByNgay_NhanVien(int ID_NhanVien, DateTime from, DateTime to)
        {
            //JavaScriptSerializer serializer = new JavaScriptSerializer();
            ChamCongDAO ccdao = new ChamCongDAO();
            List<ChamCongModel> data = ccdao.GetListChamCong_ByNgay_NhanVien(ID_NhanVien, from, to);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult XacNhanMulti_ChuyenDo(string ID)
        {
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.XacNhanMulti(ID))
            {
                return Json(new { success = true, msg = "Xác nhận ticket thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xác nhận ticket thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult HuyMulti_ChuyenDo(string ID)
        {
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.HuyMulti(ID))
            {
                return Json(new { success = true, msg = "Hủy ticket thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Hủy ticket thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ChuyenDo(ChuyenDoModel model)
        {
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            ChamCongDAO cc_dao = new ChamCongDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int ID_New = dm_dao.InsertOrUpdate(model);

            if (model.ID_ChuyenDo > 0)
            {
                if (cc_dao.DeleteByChuyenDo(model.ID_ChuyenDo))
                {
                    if (model.lstChamCong != null)
                    {
                        foreach (ChamCongModel ins in model.lstChamCong)
                        {
                            ins.ID_TaiKhoan = userinfor.ID;
                            cc_dao.Insert(ins, model.MaThuyen, ID_New);
                        }
                    }
                }
            }
            else
            {
                //clddao.InsertOrUpdate(model.ID_NhanVien, 1, 1, ID_New, model.NgayDi);
                if (model.lstChamCong != null)
                {
                    foreach (ChamCongModel ins in model.lstChamCong)
                    {
                        ins.ID_TaiKhoan = userinfor.ID;
                        cc_dao.Insert(ins, model.MaThuyen, ID_New);
                    }
                }
            }
            if (ID_New > 0)
            {
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteMulti_ChuyenDo(string ID)
        {
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
            {
                clddao.DeleteMultiByIDChuyenDo(ID);
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult Delete_ChuyenDoThemByNgay(DateTime Ngay, int ID_NhanVien)
        {
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.Delete_ChuyenDoThemByNgay(Ngay, ID_NhanVien))
            {
                return Json(new { success = true, msg = "Xóa thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult AutoTinhChuyen(DateTime from, DateTime to, int ID_TuyenDo, int ID_TaiKhoan)
        {
            ChamCongDAO cc_dao = new ChamCongDAO();
            TuyenDoDAO dao = new TuyenDoDAO();
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            List<ChamCongModel> result1 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(from, to, 2007).Where(x => ID_TaiKhoan == 0 || x.ID_TaiKhoan == ID_TaiKhoan).ToList();
            List<ChamCongModel> result2 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(from, to, 2008).Where(x => ID_TaiKhoan == 0 || x.ID_TaiKhoan == ID_TaiKhoan).ToList();
            List<ChamCongModel> result3 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(from, to, 2009).Where(x => ID_TaiKhoan == 0 || x.ID_TaiKhoan == ID_TaiKhoan).ToList();
            List<ChamCongModel> result = new List<ChamCongModel>();
            result.AddRange(result1);
            result.AddRange(result2);
            result.AddRange(result3);
            //foreach (ChamCongModel i in result)
            //{
            //    List<TuyenDoModel> lstTuyen = dao.GetAll().Where(x => ID_TuyenDo == 0 || ID_TuyenDo == x.ID).ToList();
            //    if (lstTuyen != null)
            //    {
            //        foreach (TuyenDoModel tuyen in lstTuyen)
            //        {
            //            List<ChamCongModel> lstChamCong = cc_dao.GetListChamCong_PhuHopTuyen(i.WorkDate, tuyen.ThoiGianToiThieu, tuyen.ThoiGianToiDa, i.ID_TaiKhoan);
            //            List<ChamCongModel> lstMatch = new List<ChamCongModel>();
            //            if (lstChamCong.Count >= 3)
            //            {
            //                int count = 1;
            //                lstMatch.Add(i);
            //                foreach (TuyenDo_DiemModel td in tuyen.lstDiemTuyen)
            //                {

            //                    if (lstChamCong.Count(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006) > 0)
            //                    {
            //                        if (td.ID_DiemQuetThe == 2005)
            //                        {
            //                            count++;
            //                            lstMatch.AddRange(lstChamCong.Where(x => x.ID_DiemQuetThe == 2005));
            //                        }
            //                        else
            //                        {
            //                            count++;
            //                            lstMatch.Add(lstChamCong.Where(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006).First());
            //                        }
            //                    }
            //                }
            //                if (count >= 3)
            //                {
            //                    ChuyenDoModel model = new ChuyenDoModel();
            //                    model.MaThuyen = i.MaThuyen;
            //                    model.ID_NhanVien = i.ID_TaiKhoan;
            //                    model.ID_TuyenDo = tuyen.ID;
            //                    model.NgayDi = i.WorkDate;
            //                    model.GhiChu = "";
            //                    model.IsManager = 0;
            //                    model.TrangThai = 0;
            //                    int ID_New = dm_dao.InsertOrUpdate(model);
            //                    if (ID_New > 0)
            //                    {
            //                        //clddao.InsertOrUpdate(model.ID_NhanVien, 1, 1, ID_New, model.NgayDi);
            //                        foreach (ChamCongModel matchItem in lstMatch)
            //                        {
            //                            matchItem.ID_ChuyenDo = ID_New;
            //                            cc_dao.Update(matchItem);
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
            foreach (ChamCongModel i in result)
            {
                //Tính chuyến đò chính
                if (i.ID_DiemQuetThe == 2007 || i.ID_DiemQuetThe == 2008 || i.ID_DiemQuetThe == 2009)
                {
                    if (cc_dao.CountExistCheckpoint(i.ID_TaiKhoan, i.ID_DiemQuetThe, i.WorkDate) == 0)
                    {
                        ChuyenDoModel model = new ChuyenDoModel();
                        model.MaThuyen = i.MaThuyen;
                        model.ID_NhanVien = i.ID_TaiKhoan;
                        model.NgayDi = i.WorkDate;
                        model.GhiChu = "";
                        model.IsManager = 0;
                        model.TrangThai = 1;
                        switch (i.ID_DiemQuetThe)
                        {
                            case 2007:
                                model.ID_TuyenDo = 2005;
                                break;
                            case 2008:
                                model.ID_TuyenDo = 1;
                                break;
                            case 2009:
                                model.ID_TuyenDo = 2004;
                                break;
                        }
                        int ID_New = dm_dao.InsertOrUpdate(model);
                        if (ID_New > 0)
                        {
                            i.ID_ChuyenDo = ID_New;
                            cc_dao.Update(i);
                        }
                    }
                }
            }
            return Json(new { success = true, msg = "Đã hoàn tất tính chuyến" }, JsonRequestBehavior.AllowGet);
        }

    }
}