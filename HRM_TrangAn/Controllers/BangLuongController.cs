using FirebaseAdmin.Auth;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Helper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;

namespace HRM_TrangAn.Controllers
{
    public class BangLuongController : Controller
    {

        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BangLuongNhanVien()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult GetDataTinhBangLuong(int ngay, int tuan, int thang, int quy, int nam)
        {
            DateTime from = new DateTime(nam, 1, 1);
            DateTime to = new DateTime();
            if (tuan > 0)
            {
                from = from.AddDays(tuan * 7);
                to = from.AddDays((tuan + 1) * 7);
            }
            else if (thang > 0)
            {
                from = new DateTime(nam, thang, 1);
                if (thang < 12)
                    to = new DateTime(nam, thang + 1, 1).AddDays(-1);
                else
                    to = new DateTime(nam + 1, thang, 1).AddDays(-1);
            }
            else if (quy > 0)
            {
                switch (quy)
                {
                    case 1:
                        from = new DateTime(nam, 1, 1);
                        to = new DateTime(nam, 3, 31);
                        break;
                    case 2:
                        from = new DateTime(nam, 4, 1);
                        to = new DateTime(nam, 6, 30);
                        break;
                    case 3:
                        from = new DateTime(nam, 7, 1);
                        to = new DateTime(nam, 9, 30);
                        break;
                    case 4:
                        from = new DateTime(nam, 10, 1);
                        to = new DateTime(nam, 12, 31);
                        break;
                }
            }
            else if (nam > 0)
            {
                from = new DateTime(nam, 1, 1);
                to = new DateTime(nam, 12, 31);
            }
            BangLuongDAO dao = new BangLuongDAO();
            List<TinhBangLuongModel> list = dao.GetDataTinhBangLuong(from, to);
            ChinhSachLuongDAO csldao = new ChinhSachLuongDAO();
            List<BangLuongModel> listBL = new List<BangLuongModel>();
            foreach (TinhBangLuongModel model in list)
            {
                foreach (ChinhSachLuong_NhanVienModel cslnv in model.listChinhSachLuong)
                {
                    BangLuongModel BLModel = new BangLuongModel();
                    BLModel.ID_ChinhSachLuong_NhanSu = cslnv.ID;
                    BLModel.NgayBatDau = cslnv.NgayBatDau;
                    BLModel.NgayKetThuc = cslnv.NgayKetThuc;
                    BLModel.ID_ChinhSachLuong = cslnv.ID_ChinhSachLuong;
                    BLModel.ID_NhanSu = cslnv.ID_HoSoNhanSu;
                    BLModel.Ngay = ngay;
                    BLModel.Tuan = tuan;
                    BLModel.Thang = thang;
                    BLModel.Quy = quy;
                    BLModel.Nam = nam;

                    ChinhSachLuongModel csl = csldao.GetByID(cslnv.ID_ChinhSachLuong);
                    ChinhSachLuong_CauHinhModel cslch = csldao.GetCH_ByIDCSL(cslnv.ID_ChinhSachLuong).Where(x => x.TrangThai == 1).FirstOrDefault();
                    if (cslch.CongChuan == 0 && cslch.CongChuanTheoThang == 1)
                    {
                        if (thang > 0 && to.Day == 28)
                        {
                            cslch.CongChuan = 24;
                        }
                        else if (thang > 0 && to.Day == 30)
                        {
                            cslch.CongChuan = 26;
                        }
                        else if (thang > 0 && to.Day == 31)
                        {
                            cslch.CongChuan = 27;
                        }
                    }
                    DoanhSo_LuongKhachDAO dslkdao = new DoanhSo_LuongKhachDAO();
                    DoanhSo_LuongKhachModel dslk = dslkdao.GetByDateRange(from, to).FirstOrDefault();
                    switch (csl.KyHanThanhToan)
                    {
                        case 1://ngay
                            int dayCount = (int)(to - from).TotalDays;
                            if (cslch.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cslch.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * ((decimal)model.SoCong / CongChuan) * (decimal)dayCount;
                                cslnv.TienLuong = TienLuong;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            else
                            {
                                if (model.SoCong > 0)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong;
                                }
                                if (cslch.DoanhSoToiThieu > 0 && dslk.DoanhSo >= cslch.DoanhSoToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_DoanhSoToiThieu == 0 ? 1 : (decimal)(dslk.DoanhSo / cslch.DoanhSoToiThieu));
                                }
                                if (cslch.LuongKhachToiThieu > 0 && dslk.LuongKhach >= cslch.LuongKhachToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_LuongKhachToiThieu == 0 ? 1 : (decimal)(dslk.LuongKhach / cslch.LuongKhachToiThieu));
                                }
                                if (cslch.NgayCongToiThieu > 0 && model.SoCong >= cslch.NgayCongToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_NgayCongToiThieu == 0 ? 1 : (decimal)(model.SoCong / cslch.NgayCongToiThieu));
                                }
                            }
                            break;
                        case 2://tuan
                            float weekCount = (int)(to - from).TotalDays / 7;
                            if (cslch.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cslch.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * (decimal)weekCount;
                                cslnv.TienLuong = TienLuong;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            break;
                        case 3://thang
                            if (cslch.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cslch.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)cslnv.SoCong / CongChuan;
                                cslnv.TienLuong = TienLuong;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            else
                            {
                                if (model.SoCong > 0)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong;
                                }
                                if (cslch.DoanhSoToiThieu > 0 && dslk.DoanhSo >= cslch.DoanhSoToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_DoanhSoToiThieu == 0 ? 1 : (decimal)(dslk.DoanhSo / cslch.DoanhSoToiThieu));
                                }
                                if (cslch.LuongKhachToiThieu > 0 && dslk.LuongKhach >= cslch.LuongKhachToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_LuongKhachToiThieu == 0 ? 1 : (decimal)(dslk.LuongKhach / cslch.LuongKhachToiThieu));
                                }
                                if (cslch.NgayCongToiThieu > 0 && model.SoCong >= cslch.NgayCongToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_NgayCongToiThieu == 0 ? 1 : (decimal)(model.SoCong / cslch.NgayCongToiThieu));
                                }
                            }
                            if (cslch.DoanhSoToiThieu > 0 && cslch.LuongKhachToiThieu > 0)
                            {
                                decimal DoanhSoToiThieu = (decimal)cslch.DoanhSoToiThieu;
                                decimal LuongKhachToiThieu = (decimal)cslch.LuongKhachToiThieu;
                            }
                            break;
                        case 4://quy
                            int month = from.Month;
                            int proportionQuy = 0;
                            if (month == 1 || month == 2 || month == 3)
                            {
                                if (from.Year % 4 == 0)
                                {
                                    proportionQuy = (int)(to - from).TotalDays / 91;
                                }
                                else
                                {
                                    proportionQuy = (int)(to - from).TotalDays / 90;
                                }
                            }
                            if (month == 4 || month == 5 || month == 6)
                            {
                                proportionQuy = (int)(to - from).TotalDays / 91;
                            }
                            if (month == 7 || month == 8 || month == 9)
                            {
                                proportionQuy = (int)(to - from).TotalDays / 92;
                            }
                            if (month == 10 || month == 11 || month == 12)
                            {
                                proportionQuy = (int)(to - from).TotalDays / 92;
                            }
                            if (cslch.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cslch.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * proportionQuy;
                                cslnv.TienLuong = TienLuong;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            break;
                        case 5://nam
                            int year = from.Year;
                            int proportionYear = 0;
                            if (year % 4 == 0)
                            {
                                proportionYear = (int)(to - from).TotalDays / 366;
                            }
                            else
                            {
                                proportionYear = (int)(to - from).TotalDays / 365;
                            }
                            if (cslch.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cslch.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * proportionYear;
                                cslnv.TienLuong = TienLuong;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            else
                            {
                                if (model.SoCong > 0)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong;
                                }
                                if (cslch.DoanhSoToiThieu > 0 && dslk.DoanhSo >= cslch.DoanhSoToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_DoanhSoToiThieu == 0 ? 1 : (decimal)(dslk.DoanhSo / cslch.DoanhSoToiThieu));
                                }
                                if (cslch.LuongKhachToiThieu > 0 && dslk.LuongKhach >= cslch.LuongKhachToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_LuongKhachToiThieu == 0 ? 1 : (decimal)(dslk.LuongKhach / cslch.LuongKhachToiThieu));
                                }
                                if (cslch.NgayCongToiThieu > 0 && model.SoCong >= cslch.NgayCongToiThieu)
                                {
                                    BLModel.TienLuong = cslnv.MucLuong * (cslch.LuyKe_NgayCongToiThieu == 0 ? 1 : (decimal)(model.SoCong / cslch.NgayCongToiThieu));
                                }
                            }
                            break;
                    }
                    listBL.Add(BLModel);
                }
            }
            if (dao.InsertOrUpdateMulti(listBL))
            {
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetBangLuong(int tuan, int thang, int quy, int nam)
        {
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            BangLuongDAO dao = new BangLuongDAO();
            ChinhSachLuongDAO csdao = new ChinhSachLuongDAO();
            NoiDungPhuCapDAO pcdao = new NoiDungPhuCapDAO();
            List<ChinhSachLuongModel> lstcs = csdao.GetAllByThangNam(thang, nam);
            List<NoiDungPhuCapModel> lstpc = pcdao.GetAll();
            DataTable dt = dao.GetDataBangLuong(thang, nam);
            dt.Columns.Add("TongTienLuong", typeof(decimal));
            dt.Columns.Add("TongTienPhuCap", typeof(decimal));
            dt.Columns.Add("TongTienGiamTru", typeof(decimal));
            dt.Columns.Add("LuongThucNhan", typeof(decimal));
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                decimal TongienLuong = 0;
                decimal TongTienPhuCap = 0;
                decimal TongTienGiamTru = 0;
                foreach (DataColumn col in dt.Columns)
                {
                    if (lstcs.Any(x => x.Ma == col.ColumnName))
                    {
                        TongienLuong += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                    }
                    if (lstpc.Where(z => z.Loai == 1).Any(x => x.Ma == col.ColumnName))
                    {
                        TongTienPhuCap += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                    }
                    if (lstpc.Where(z => z.Loai == -1).Any(x => x.Ma == col.ColumnName))
                    {
                        TongTienGiamTru += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                    }
                }
                TongTienGiamTru += string.IsNullOrWhiteSpace(dr["NLD_ThucTe"].ToString()) ? 0 : decimal.Parse(dr["NLD_ThucTe"].ToString());
                TongTienGiamTru += string.IsNullOrWhiteSpace(dr["TienPhat"].ToString()) ? 0 : decimal.Parse(dr["TienPhat"].ToString());
                dr["TongTienLuong"] = TongienLuong;
                dr["TongTienPhuCap"] = TongTienPhuCap;
                dr["TongTienGiamTru"] = TongTienGiamTru;
                dr["LuongThucNhan"] = TongienLuong + TongTienPhuCap - TongTienGiamTru;

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(StringHelper.RemoveVietNameseSign(col.ColumnName).Trim().Replace(" ", "_"), dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult GetDataBangLuongByHSNS(string MatKhau, int ID_HoSoNhanSu, int Thang, int Nam)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            HoSoNhanSuDAO hsdao = new HoSoNhanSuDAO();
            HoSoNhanSuModel hoso = hsdao.GetByID(ID_HoSoNhanSu);
            TaiKhoanModel tk = tk_dao.GetById(hoso.ID_TaiKhoan);
            if (tk_dao.CheckLogin(tk.TaiKhoan, MatKhau))
            {
                BangLuongDAO dao = new BangLuongDAO();
                PhieuLuongModel data = dao.GetDataBangLuongByHSNS(ID_HoSoNhanSu, Thang, Nam);
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { ID_HoSoNhanSu = 0 }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}