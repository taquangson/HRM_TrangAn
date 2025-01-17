using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.Controllers
{
    public class ChamCongNhanVienController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChamCongNhanVienController));
        // GET: ChuyenDo
        [SessionExpire]
        public ActionResult BangCong()
        {
            return View();
        }



        [AllowAnonymous]
        public ActionResult BangCongNhanVien(int ID_TaiKhoan, int Thang, int Nam, string key)
        {
            LichSuThaoTacBangCongDAO dao = new LichSuThaoTacBangCongDAO();
            LichSuThaoTacBangCongModel viewmodel = dao.GetLichSu(ID_TaiKhoan, Thang, Nam);
            if (viewmodel.KeyEvent == key)
            {
                ViewBangCongModel model = new ViewBangCongModel();
                model.ShowbtnChotCong = true;
                model.ID_TaiKhoan = ID_TaiKhoan;
                model.From = new DateTime(Nam, Thang, 1);
                model.To = new DateTime(Nam, Thang, DateTime.DaysInMonth(Nam, Thang));
                TaiKhoanModel tk = new TaiKhoanDAO().GetById(ID_TaiKhoan);
                List<DangKyLichNghiModel> lichnghi = new DangKyLichNghiDAO().GetByID_NhanVien(ID_TaiKhoan, model.From, model.To).Where(x => x.TrangThai == 2).ToList();
                List<dynamic> grouped = lichnghi.GroupBy(x => x.TenLoai).Select(g => new { key = g.Key.ToString(), count = g.Count().ToString() }).ToList<dynamic>();
                model.LichNghi = new List<string>();
                foreach (dynamic item in grouped)
                {
                    model.LichNghi.Add(item.key + ": " + item.count);
                }
                model.Title = "BẢNG TÍNH CÔNG THÁNG " + Thang + "/" + Nam + " - NV: " + tk.TenDayDu;
                viewmodel.ThoiGianXemBangCong = DateTime.Now;
                if (viewmodel.ThoiGianChotBangCong.Year > 1)
                {
                    model.ShowbtnChotCong = false;
                }
                dao.InsertOrUpdate(viewmodel);
                return View(model);
            }
            else
            {
                return Content("<b>Dữ liệu bạn yêu cầu không tồn tại!</b>");
            }

        }

        [AllowAnonymous]
        public ActionResult ChotBangCongNhanVien(int ID_TaiKhoan, int Thang, int Nam, float SoCongChot, string key)
        {
            LichSuThaoTacBangCongDAO dao = new LichSuThaoTacBangCongDAO();
            LichSuThaoTacBangCongModel viewmodel = dao.GetLichSu(ID_TaiKhoan, Thang, Nam);
            if (viewmodel.KeyEvent == key)
            {
                viewmodel.ThoiGianChotBangCong = DateTime.Now;
                viewmodel.SoCongChot = SoCongChot;
                dao.InsertOrUpdate(viewmodel);
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

        }

        [AllowAnonymous]
        public ActionResult SendEmailBangCongNhanVien(int ID_TaiKhoan, int Thang, int Nam)
        {
            LichSuThaoTacBangCongDAO dao = new LichSuThaoTacBangCongDAO();
            LichSuThaoTacBangCongModel viewmodel = dao.GetLichSu(ID_TaiKhoan, Thang, Nam);
            if (viewmodel == null)
            {
                LichSuThaoTacBangCongModel model = new LichSuThaoTacBangCongModel();
                model.ID_TaiKhoan = ID_TaiKhoan;
                model.Thang = Thang;
                model.Nam = Nam;
                model.KeyEvent = Guid.NewGuid().ToString();
                model.Link = "https://hrm.disantrangan.vn/ChamCongNhanVien/BangCongNhanVien?ID_TaiKhoan=" + model.ID_TaiKhoan + "&Thang=" + model.Thang + "&Nam=" + model.Nam + "&Key=" + model.KeyEvent;
                TaiKhoanModel tk = new TaiKhoanDAO().GetById(ID_TaiKhoan);
                var html = RazorViewToString.RenderRazorViewToString(this, "ThongBaoBangCong", model);
                new EmailHelper().SendEmail(html, tk.Email, "THÔNG BÁO BẢNG CÔNG NHÂN SỰ THÁNG " + Thang + "/" + Nam);
                model.ThoiGianGuiMail = DateTime.Now;
                dao.InsertOrUpdate(model);
                return Content("OK");
            }
            else
            {
                return Content("EXITS");

            }
        }

        [SessionExpire]
        public ActionResult CongNhanSu_GetDataTree(DateTime from, DateTime to, int ID_PhongBan)
        {
            ChamCongNhanVienDAO dao = new ChamCongNhanVienDAO();
            LichSuThaoTacBangCongDAO daobc = new LichSuThaoTacBangCongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            DataTable dt = dao.CongNhanSu_GetDataTree(from, to, ID_PhongBan);
            List<DangKyLichNghiModel> lichnghi = new DangKyLichNghiDAO().GetByDate(from, to);
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                float TongCong = 0;
                int ID_TaiKhoan = int.Parse(dt.Rows[i]["ID"].ToString());
                List<DangKyLichNghiModel> lichnghinv = lichnghi.Where(x => x.TrangThai == 2 && x.ID_TaiKhoan == ID_TaiKhoan).ToList();
                LichSuThaoTacBangCongModel lsuchotcong = daobc.GetLichSu(ID_TaiKhoan, from.Month, from.Year);
                for (var date = from; date <= to; date = date.AddDays(1))
                {
                    TongCong += float.Parse(dt.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                TongCong += lichnghinv.Where(x => x.KyHieu == "DO" || x.KyHieu == "PH").Count();

                childRow = new Dictionary<string, object>();
                childRow.Add("TongCong", TongCong);

                if (lsuchotcong != null)
                {
                    childRow.Add("ThoiGianChotCong", lsuchotcong.ThoiGianChotBangCong);
                    childRow.Add("ThoiGianGuiMail", lsuchotcong.ThoiGianGuiMail);
                    childRow.Add("ThoiGianXemBangCong", lsuchotcong.ThoiGianXemBangCong);
                }
                else
                {
                    childRow.Add("ThoiGianChotCong", "");
                    childRow.Add("ThoiGianGuiMail", "");
                    childRow.Add("ThoiGianXemBangCong", "");
                }
                float check = 0;
                foreach (DataColumn col in dt.Columns)
                {
                    check = 0;
                    float.TryParse(col.ColumnName, out check);
                    if (check != 0)
                    {
                        DangKyLichNghiModel lstnghi = lichnghinv.Where(x => x.BatDauNghi.Date.ToString("yyyyMMdd") == col.ColumnName || x.KetThucNghi.Date.ToString("yyyyMMdd") == col.ColumnName).FirstOrDefault();
                        string cong = dt.Rows[i][col].ToString();
                        if (lstnghi != null && cong == "0")
                        {
                            childRow.Add("data" + col.ColumnName, "<span style='display:block; background-color:" + lstnghi.KyHieuMau + "'>" + lstnghi.KyHieu + "</span>");
                        }
                        else
                        {
                            childRow.Add("data" + col.ColumnName, dt.Rows[i][col]);
                        }
                    }
                    else
                    {

                        childRow.Add(col.ColumnName, dt.Rows[i][col]);

                    }

                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
        }

        [AllowAnonymous]
        public ActionResult CongNhanSu_GetDataByNhanVien(DateTime from, DateTime to, int ID_TaiKhoan)
        {
            ChamCongNhanVienDAO dao = new ChamCongNhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            DataTable dt = dao.CongNhanSu_GetDataByNhanVien(from, to, ID_TaiKhoan);
            List<DangKyLichNghiModel> lichnghi = new DangKyLichNghiDAO().GetByID_NhanVien(ID_TaiKhoan, from, to);
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                float TongCong = 0;
                List<DangKyLichNghiModel> lichnghinv = lichnghi.Where(x => x.TrangThai == 2).ToList();
                for (var date = from; date <= to; date = date.AddDays(1))
                {
                    TongCong += float.Parse(dt.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                TongCong += lichnghinv.Where(x => x.KyHieu == "DO" || x.KyHieu == "PH").Count();
                childRow = new Dictionary<string, object>();
                childRow.Add("TongCong", TongCong);
                float check = 0;
                foreach (DataColumn col in dt.Columns)
                {
                    check = 0;
                    float.TryParse(col.ColumnName, out check);
                    if (check != 0)
                    {
                        DangKyLichNghiModel lstnghi = lichnghinv.Where(x => x.BatDauNghi.Date.ToString("yyyyMMdd") == col.ColumnName || x.KetThucNghi.Date.ToString("yyyyMMdd") == col.ColumnName).FirstOrDefault();
                        if (lstnghi != null)
                        {
                            childRow.Add("data" + col.ColumnName, "<span style='display:block; background-color:" + lstnghi.KyHieuMau + "'>" + lstnghi.KyHieu + "</span>");
                        }
                        else
                        {
                            childRow.Add("data" + col.ColumnName, dt.Rows[i][col]);
                        }
                    }
                    else
                    {

                        childRow.Add(col.ColumnName, dt.Rows[i][col]);

                    }

                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
        }

        public ActionResult TinhCongNhanVien(int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            CaLamViec_NhanVienDAO canvdao = new CaLamViec_NhanVienDAO();
            CaLamViecDAO cadao = new CaLamViecDAO();
            ChamCongNhanVienDAO ccnvdao = new ChamCongNhanVienDAO();
            TrucDemDAO tddao = new TrucDemDAO();
            List<CaLamViec_NhanVienModel> listca = new List<CaLamViec_NhanVienModel>();
            if (ID_NhanVien > 0)
                listca = canvdao.GetByNhanVienDate(ID_NhanVien, TuNgay, DenNgay);
            else
                listca = canvdao.GetByDate(TuNgay, DenNgay);
            List<DanhMucNgayLeModel> ngaynghile = new DanhMucNgayLeDAO().GetByDate(TuNgay, DenNgay);
            List<TinhCongNhanVienModel> result = new List<TinhCongNhanVienModel>();
            foreach (CaLamViec_NhanVienModel ca in listca)
            {
                DanhMucNgayLeModel ngaynghi = ngaynghile.Where(x => x.NgayBatDauNghi >= ca.NgayLamViec && x.NgayKetThucNghi <= ca.NgayLamViec).FirstOrDefault();
                TinhCongNhanVienModel model = new TinhCongNhanVienModel();
                model.ID_TaiKhoan = ca.ID_TaiKhoan;
                model.ID_CaLamViec = ca.ID_CaLamViec;
                model.Ngay = ca.NgayLamViec;
                model.CaLam = cadao.GetByID(ca.ID_CaLamViec);

                DateTime batdautinhca = ca.NgayLamViec.AddHours(model.CaLam.BatDauTinhCa.Hours).AddMinutes(model.CaLam.BatDauTinhCa.Minutes);
                DateTime ketthuctinhca = ca.NgayLamViec.AddHours(model.CaLam.KetThucTinhCa.Hours).AddMinutes(model.CaLam.KetThucTinhCa.Minutes);
                if (model.CaLam.IsCaDem == 1)
                {
                    ketthuctinhca = ketthuctinhca.AddDays(1);
                }
                model.lstChamCong = ccnvdao.GetListChamCong_ByNgay_NhanVien(ca.ID_TaiKhoan, batdautinhca, ketthuctinhca);

                DateTime batdau = ca.NgayLamViec.AddHours(model.CaLam.BatDau.Hours).AddMinutes(model.CaLam.BatDau.Minutes);
                DateTime ketthuc = ca.NgayLamViec.AddHours(model.CaLam.KetThuc.Hours).AddMinutes(model.CaLam.KetThuc.Minutes);
                if (model.CaLam.IsCaDem == 1)
                {
                    ketthuc = ketthuc.AddDays(1);
                }
                if (model.lstChamCong.Count > 0)
                {
                    if (model.lstChamCong.First().WorkDate <= batdau && model.lstChamCong.Last().WorkDate >= ketthuc)
                    {
                        model.SoCong = model.CaLam.SoCong;
                        if (ngaynghi != null)
                        {
                            model.SoCong = model.SoCong * ngaynghi.TinhLuong;
                        }
                    }
                    else
                    {
                        if (model.CaLam.PhanBo != null)
                        {
                            foreach (CaLamViec_PhanBoCongModel phanbo in model.CaLam.PhanBo)
                            {
                                batdau = ca.NgayLamViec.AddHours(phanbo.BatDau.Hours).AddMinutes(phanbo.BatDau.Minutes);
                                ketthuc = ca.NgayLamViec.AddHours(phanbo.KetThuc.Hours).AddMinutes(phanbo.KetThuc.Minutes);
                                if (model.CaLam.IsCaDem == 1)
                                {
                                    ketthuc = ketthuc.AddDays(1);
                                }
                                if (model.lstChamCong.First().WorkDate < batdau && model.lstChamCong.Last().WorkDate > ketthuc)
                                {
                                    model.SoCong += phanbo.SoCong;
                                   
                                    if (phanbo.TangCa == 1)
                                    {
                                        model.SoCongTangCa += phanbo.SoCong;
                                    }
                                    if (model.SoCongTangCa >= 0.5f)
                                    {
                                        model.XuatAn = 1;
                                    }
                                }
                            }
                        }
                        if (ngaynghi != null)
                        {
                            model.SoCong = model.SoCong * ngaynghi.TinhLuong;
                        }
                    }
                }
                if (model.lstChamCong.Count > 0)
                {
                    if (ccnvdao.InsertCongNhanVien(model))
                        result.Add(model);

                    if (model.SoCong < model.CaLam.SoCong || model.lstChamCong.First().WorkDate > batdau || model.lstChamCong.Last().WorkDate < ketthuc)
                    {
                        ccnvdao.InsertLichSuDiMuonVeSom(model);
                    }
                    if (model.CaLam.IsCaDem == 0)
                    {
                        DateTime starttrucdem = model.Ngay.AddDays(1).AddHours(5);
                        DateTime endtrucdem = model.Ngay.AddDays(1).AddHours(6);
                        bool checktrucdem = ccnvdao.GetListChamCong_ByNgay_NhanVien(model.ID_TaiKhoan, starttrucdem, endtrucdem).Count > 0;
                        if (checktrucdem)
                        {
                            TrucDemModel td = new TrucDemModel();
                            td.ID_TaiKhoan = model.ID_TaiKhoan;
                            td.Ngay = model.Ngay;
                            td.TrangThai = 1;
                            tddao.InsertOrUpdate(td);
                        }
                    }
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertCongNhanVien(TinhCongNhanVienModel model)
        {
            ChamCongNhanVienDAO ccnvdao = new ChamCongNhanVienDAO();
            if (ccnvdao.InsertCongNhanVien(model))
            {
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdatetLichSuDiMuonVeSom(int ID, int DaXuLy, int DaTinhCong)
        {
            ChamCongNhanVienDAO ccnvdao = new ChamCongNhanVienDAO();
            if (ccnvdao.UpdateLichSuDiMuonVeSom(ID, DaTinhCong, DaXuLy))
            {
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult GetData_DiMuonVeSom(DateTime TuNgay, DateTime DenNgay, int ID_PhongBan)
        {
            CaLamViec_NhanVienDAO canvdao = new CaLamViec_NhanVienDAO();
            TaiKhoanDAO tkdao = new TaiKhoanDAO();
            CaLamViecDAO cadao = new CaLamViecDAO();
            ChamCongNhanVienDAO ccnvdao = new ChamCongNhanVienDAO();
            List<TinhCongNhanVienModel> result = ccnvdao.GetLichSuDiMuonVeSom(ID_PhongBan, TuNgay, DenNgay);
            if (result != null)
            {
                foreach (TinhCongNhanVienModel model in result)
                {
                    model.TaiKhoan = tkdao.GetById(model.ID_TaiKhoan);
                    model.CaLam = cadao.GetByID(model.ID_CaLamViec);

                    DateTime batdautinhca = model.Ngay.AddHours(model.CaLam.BatDauTinhCa.Hours).AddMinutes(model.CaLam.BatDauTinhCa.Minutes);
                    DateTime ketthuctinhca = model.Ngay.AddHours(model.CaLam.KetThucTinhCa.Hours).AddMinutes(model.CaLam.KetThucTinhCa.Minutes);
                    model.lstChamCong = ccnvdao.GetListChamCong_ByNgay_NhanVien(model.ID_TaiKhoan, batdautinhca, ketthuctinhca);

                    model.BatDauCa = model.Ngay.AddHours(model.CaLam.BatDau.Hours).AddMinutes(model.CaLam.BatDau.Minutes);
                    model.KetThucCa = model.Ngay.AddHours(model.CaLam.KetThuc.Hours).AddMinutes(model.CaLam.KetThuc.Minutes);
                    if (model.CaLam.IsCaDem == 1)
                    {
                        model.KetThucCa = model.Ngay.AddDays(1);
                    }
                }
            }
            //return Json(result, JsonRequestBehavior.AllowGet);
            return Content(JsonConvert.SerializeObject(result));
        }


    }
}