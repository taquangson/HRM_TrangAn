using FirebaseAdmin.Auth;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Helper;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
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
                    to = new DateTime(nam + 1, 1, 1).AddDays(-1);
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
            PhongBan_CongChuanDAO pbcc = new PhongBan_CongChuanDAO();
            List<BangLuongModel> listBL = new List<BangLuongModel>();
            foreach (TinhBangLuongModel model in list)
            {
                foreach (ChinhSachLuong_NhanVienModel cslnv in model.listChinhSachLuong)
                {
                    BangLuongModel BLModel = new BangLuongModel();
                    BLModel.ID_ChinhSachLuong_NhanSu = cslnv.ID;
                    BLModel.NgayBatDau = cslnv.NgayBatDau.Year > 1 ? cslnv.NgayBatDau : from;
                    BLModel.NgayKetThuc = cslnv.NgayKetThuc.Year < 2100 ? cslnv.NgayKetThuc : to;
                    BLModel.ID_ChinhSachLuong = cslnv.ID_ChinhSachLuong;
                    BLModel.ID_NhanSu = cslnv.ID_HoSoNhanSu;
                    BLModel.Ngay = ngay;
                    BLModel.Tuan = tuan;
                    BLModel.Thang = thang;
                    BLModel.Quy = quy;
                    BLModel.Nam = nam;

                    ChinhSachLuongModel csl = csldao.GetByID(cslnv.ID_ChinhSachLuong);
                    ChinhSachLuong_CauHinhModel cslch = csldao.GetCH_ByIDCSL(cslnv.ID_ChinhSachLuong).Where(x => x.TrangThai == 1).FirstOrDefault();
                    PhongBan_CongChuanModel cc = new PhongBan_CongChuanModel();
                    
                    try
                    {
                        cc = pbcc.GetByPhongBan(model.ID_PhongBan).FirstOrDefault();
                        if (cc.CongChuan == 0 && cc.CongChuanTheoThang == 1)
                        {
                            if (thang > 0 && to.Day == 28)
                            {
                                cc.CongChuan = 24;
                            }
                            else if (thang > 0 && to.Day == 30)
                            {
                                cc.CongChuan = 26;
                            }
                            else if (thang > 0 && to.Day == 31)
                            {
                                cc.CongChuan = 27;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        cc.CongChuan = (decimal)model.CongChuan;
                    }
                    DoanhSo_LuongKhachDAO dslkdao = new DoanhSo_LuongKhachDAO();
                    DoanhSo_LuongKhachModel dslk = dslkdao.GetByDateRange(from, to).FirstOrDefault();
                    switch (csl.KyHanThanhToan)
                    {
                        case 1://ngay
                            int dayCount = (int)(to - from).TotalDays;
                            if (cc.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cc.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * ((decimal)model.SoCong / CongChuan) * (decimal)dayCount;
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
                            if (cc.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cc.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * (decimal)weekCount;
                                model.TongTien += TienLuong;
                                BLModel.TienLuong = TienLuong;
                            }
                            break;
                        case 3://thang
                            if (cc.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cc.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)cslnv.SoCong / CongChuan;
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
                            //if (cslch.DoanhSoToiThieu > 0 && cslch.LuongKhachToiThieu > 0)
                            //{
                            //    decimal DoanhSoToiThieu = (decimal)cslch.DoanhSoToiThieu;
                            //    decimal LuongKhachToiThieu = (decimal)cslch.LuongKhachToiThieu;
                            //}
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
                            if (cc.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cc.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * proportionQuy;
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
                            if (cc.CongChuan > 0)
                            {
                                decimal CongChuan = (decimal)cc.CongChuan;
                                decimal TienLuong = cslnv.MucLuong * (decimal)model.SoCong / CongChuan * proportionYear;
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
            public ActionResult GetBangLuong2(int tuan, int thang, int quy, int nam)
            {
                DateTime from = new DateTime(nam, thang, 1);
                DateTime to = new DateTime();
                if (thang < 12)
                    to = new DateTime(nam, thang + 1, 1).AddDays(-1);
                else
                    to = new DateTime(nam + 1, 1, 1).AddDays(-1);
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                BangLuongDAO dao = new BangLuongDAO();
                ChinhSachLuongDAO csdao = new ChinhSachLuongDAO();
                NoiDungPhuCapDAO pcdao = new NoiDungPhuCapDAO();

                //List<ChinhSachLuongModel> lstcs = csdao.GetAllByThangNam(thang, nam);
                List<ChinhSachLuongModel> lstcs = csdao.GetAll().Where(x => x.ID_LoaiHopDong == 1).ToList();
                List<ChinhSachLuongModel> lstcs_tv = csdao.GetAll().Where(x => x.ID_LoaiHopDong == 2).ToList();
                List<TinhBangLuongModel> list = dao.GetDataTinhBangLuong(from, to);
                List<NoiDungPhuCapModel> lstpc = pcdao.GetAll();
                List<DangKyLichNghiModel> lichnghi = new DangKyLichNghiDAO().GetByDate(from, to);
                //DataTable dt = dao.GetDataBangLuong(thang, nam);
                DataTable dt = dao.GetDataChinhSachLuong(thang, nam);

                dt.Columns.Add("MucLuong", typeof(decimal));
                dt.Columns.Add("TongTienLuong", typeof(decimal));
                dt.Columns.Add("TongTienPhuCap", typeof(decimal));
                dt.Columns.Add("TongTienGiamTru", typeof(decimal));
                dt.Columns.Add("LuongThucNhan", typeof(decimal));
                dt.Columns.Add("LuongLeTet", typeof(decimal));
                dt.Columns.Add("CongChuan", typeof(decimal));

                dt.Columns.Add("SoCong", typeof(decimal));
                dt.Columns.Add("SoCongLeTet", typeof(decimal));
                dt.Columns.Add("TrucDem", typeof(decimal));
                dt.Columns.Add("TrucDemDenTran", typeof(decimal));
                dt.Columns.Add("XuatAn", typeof(decimal));
                dt.Columns.Add("HoTroTrucDemDenTran", typeof(decimal));
                dt.Columns.Add("HoTroXuatAn", typeof(decimal));

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    TinhBangLuongModel thuviec = null;
                    DataRow dr = dt.Rows[i];
                    List<DangKyLichNghiModel> lichnghinv = lichnghi.Where(x => x.TrangThai == 2 && x.KyHieu == "PH" && x.ID_TaiKhoan == int.Parse(dr["ID_TaiKhoan"].ToString())).ToList();

                    decimal MucLuong = 0;
                    decimal TongienLuong = 0;
                    decimal LuongLeTet_CT = 0;
                    decimal LuongLeTet_TV = 0;
                    decimal TongTienPhuCap = 0;
                    decimal TongTienGiamTru = 0;
                    DateTime NgayBatDauHopDong = string.IsNullOrWhiteSpace(dr["NgayBatDauHopDong"].ToString()) ? new DateTime(1, 1, 1) : DateTime.Parse(dr["NgayBatDauHopDong"].ToString());

                    if (NgayBatDauHopDong.Year >= nam && NgayBatDauHopDong.Month >= thang)
                    {
                        if (NgayBatDauHopDong.Month > thang)
                            thuviec = dao.GetDataTinhBangLuong_ByNhanVien(from, to, int.Parse(dr["ID"].ToString())).FirstOrDefault();
                        else
                            thuviec = dao.GetDataTinhBangLuong_ByNhanVien(NgayBatDauHopDong, to, int.Parse(dr["ID"].ToString())).FirstOrDefault();

                    }
                    float SoNgayNghiPH_CT = lichnghinv != null ? lichnghinv.Where(x => x.BatDauNghi >= NgayBatDauHopDong).Sum(x => x.SoNgay) : 0;
                    float SoNgayNghiPH_TV = lichnghinv != null ? lichnghinv.Where(x => x.KetThucNghi <= NgayBatDauHopDong).Sum(x => x.SoNgay) : 0;
                    if (int.Parse(dr["ID_LoaiHopDong"].ToString()) == 0)
                    {
                        if (thuviec != null)
                        {
                            //Tính lương thử việc
                            foreach (DataColumn col in dt.Columns)
                            {
                                if (lstcs.Any(x => x.Ma == col.ColumnName))
                                {
                                    decimal value = string.IsNullOrWhiteSpace(dr[col.ColumnName + "_TV"].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName + "_TV"].ToString());
                                    dr[col.ColumnName] = value;
                                    MucLuong += value;
                                }
                            }
                            thuviec.SoCong = thuviec.SoCong + SoNgayNghiPH_TV;
                            dr["MucLuong"] = MucLuong;
                            TongienLuong = MucLuong * (decimal)(thuviec.SoCong / thuviec.CongChuan);
                            dr["TongTienLuong"] = TongienLuong;

                            LuongLeTet_TV = ((string.IsNullOrWhiteSpace(dr["LCB_TV"].ToString()) ? 0 : decimal.Parse(dr["LCB_TV"].ToString()))
                               + (string.IsNullOrWhiteSpace(dr["PCHS_TV"].ToString()) ? 0 : decimal.Parse(dr["PCHS_TV"].ToString()))) * 2 * (decimal)(thuviec.SoCongLeTet_TV / thuviec.CongChuan);
                            dr["LuongLeTet"] = LuongLeTet_TV;

                            if (NgayBatDauHopDong.Month > thang)
                                dr["TongTienPhuCap"] = (thuviec.XuatAn * 30000) + (thuviec.TrucDemDenTran * 150000);
                            else
                                dr["TongTienPhuCap"] = 0;

                            dr["TongTienGiamTru"] = 0;
                            dr["LuongThucNhan"] = TongienLuong + TongTienPhuCap + LuongLeTet_TV - TongTienGiamTru;
                            dr["CongChuan"] = thuviec.CongChuan;
                            dr["SoCong"] = thuviec.SoCong;
                            dr["SoCongLeTet"] = thuviec.SoCongLeTet_TV;
                            dr["TrucDem"] = thuviec.TrucDem;
                            dr["TrucDemDenTran"] = thuviec.TrucDemDenTran;
                            dr["XuatAn"] = thuviec.XuatAn;
                            dr["HoTroTrucDemDenTran"] = thuviec.TrucDemDenTran * 150000;
                            dr["HoTroXuatAn"] = thuviec.XuatAn * 30000;
                        }
                    }
                    else
                    {

                        foreach (DataColumn col in dt.Columns)
                        {
                            if (lstcs.Any(x => x.Ma == col.ColumnName))
                            {
                                MucLuong += string.IsNullOrWhiteSpace(dr[col.ColumnName].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName].ToString());
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
                        dr["MucLuong"] = MucLuong;
                        TinhBangLuongModel item = list.Where(x => x.ID_HoSoNhanSu == int.Parse(dr["ID"].ToString())).FirstOrDefault();
                        item.SoCong = item.SoCong + SoNgayNghiPH_CT;
                        if (thuviec != null)
                        {
                            item.SoCong = item.SoCong - thuviec.SoCong;
                            item.TrucDem = item.TrucDem - thuviec.TrucDem;
                            item.TrucDemDenTran = item.TrucDemDenTran - thuviec.TrucDemDenTran;
                            item.XuatAn = item.XuatAn - thuviec.XuatAn;
                        }
                        TongienLuong = MucLuong * (decimal)(item.SoCong / item.CongChuan);
                        dr["TongTienLuong"] = TongienLuong;
                        LuongLeTet_CT = ((string.IsNullOrWhiteSpace(dr["LCB"].ToString()) ? 0 : decimal.Parse(dr["LCB"].ToString()))
                           + (string.IsNullOrWhiteSpace(dr["PCHS"].ToString()) ? 0 : decimal.Parse(dr["PCHS"].ToString()))) * 2 * (decimal)(item.SoCongLeTet_CT / item.CongChuan);
                        dr["LuongLeTet"] = LuongLeTet_CT;
                        dr["TongTienPhuCap"] = TongTienPhuCap + (decimal)(item.XuatAn * 30000) + (decimal)(item.TrucDemDenTran * 150000);
                        dr["TongTienGiamTru"] = TongTienGiamTru;
                        dr["LuongThucNhan"] = TongienLuong + TongTienPhuCap + LuongLeTet_CT - TongTienGiamTru;
                        dr["CongChuan"] = item.CongChuan;
                        dr["SoCong"] = item.SoCong;
                        dr["SoCongLeTet"] = item.SoCongLeTet_CT;
                        dr["TrucDem"] = item.TrucDem;
                        dr["TrucDemDenTran"] = item.TrucDemDenTran;
                        dr["XuatAn"] = item.XuatAn;
                        dr["HoTroTrucDemDenTran"] = item.TrucDemDenTran * 150000;
                        dr["HoTroXuatAn"] = item.XuatAn * 30000;
                    }


                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(StringHelper.RemoveVietNameseSign(col.ColumnName).Trim().Replace(" ", "_"), dr[col]);
                    }
                    parentRow.Add(childRow);
                }
                return Content(JsonConvert.SerializeObject(parentRow));
            }


            [SessionExpire]
            [HttpGet]
            public ActionResult GetBangLuong(int tuan, int thang, int quy, int nam)
            {
                DateTime from = new DateTime(nam, thang, 1);
                DateTime to = new DateTime();
                if (thang < 12)
                    to = new DateTime(nam, thang + 1, 1).AddDays(-1);
                else
                    to = new DateTime(nam + 1, 1, 1).AddDays(-1);
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                BangLuongDAO dao = new BangLuongDAO();
                ChinhSachLuongDAO csdao = new ChinhSachLuongDAO();
                NoiDungPhuCapDAO pcdao = new NoiDungPhuCapDAO();

                //List<ChinhSachLuongModel> lstcs = csdao.GetAllByThangNam(thang, nam);
                List<ChinhSachLuongModel> lstcs = csdao.GetAll().Where(x => x.ID_LoaiHopDong == 1).ToList();
                List<ChinhSachLuongModel> lstcs_tv = csdao.GetAll().Where(x => x.ID_LoaiHopDong == 2).ToList();
                List<TinhBangLuongModel> list = dao.GetDataTinhBangLuong(from, to);
                List<NoiDungPhuCapModel> lstpc = pcdao.GetAll();
                List<DangKyLichNghiModel> lichnghi = new DangKyLichNghiDAO().GetByDate(from, to);
                //DataTable dt = dao.GetDataBangLuong(thang, nam);
                DataTable dt = dao.GetDataChinhSachLuong(thang, nam);

                dt.Columns.Add("MucLuong", typeof(decimal));
                dt.Columns.Add("TongTienLuong", typeof(decimal));
                dt.Columns.Add("TongTienPhuCap", typeof(decimal));
                dt.Columns.Add("TongTienGiamTru", typeof(decimal));
                dt.Columns.Add("LuongThucNhan", typeof(decimal));
                dt.Columns.Add("LuongLeTet", typeof(decimal));
                dt.Columns.Add("CongChuan", typeof(decimal));

                dt.Columns.Add("SoCong", typeof(decimal));
                dt.Columns.Add("SoCongLeTet", typeof(decimal));
                dt.Columns.Add("TrucDem", typeof(decimal));
                dt.Columns.Add("TrucDemDenTran", typeof(decimal));
                dt.Columns.Add("XuatAn", typeof(decimal));
                dt.Columns.Add("HoTroTrucDemDenTran", typeof(decimal));
                dt.Columns.Add("HoTroXuatAn", typeof(decimal));

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    TinhBangLuongModel thuviec = null;
                    TinhBangLuongModel chinhthuc = null;
                    DataRow dr = dt.Rows[i];
                    List<DangKyLichNghiModel> lichnghinv = lichnghi.Where(x => x.TrangThai == 2 && x.KyHieu == "PH" && x.ID_TaiKhoan == int.Parse(dr["ID_TaiKhoan"].ToString())).ToList();
                    DateTime NgayBatDauHopDong = string.IsNullOrWhiteSpace(dr["NgayBatDauHopDong"].ToString()) ? new DateTime(1, 1, 1) : DateTime.Parse(dr["NgayBatDauHopDong"].ToString());
                    decimal MucLuong_CT = 0;
                    decimal MucLuong_TV = 0;
                    decimal TongienLuong_CT = 0;
                    decimal TongienLuong_TV = 0;
                    decimal LuongLeTet_CT = 0;
                    decimal LuongLeTet_TV = 0;
                    decimal TongTienPhuCap_CT = 0;
                    decimal TongTienPhuCap_TV = 0;
                    decimal TongTienGiamTru_CT = 0;
                    decimal TongTienGiamTru_TV = 0;
                    decimal PCTrucDem = 0;
                    decimal PCXuatAn = 0;
                    float SoNgayNghiPH_CT = lichnghinv != null ? lichnghinv.Where(x => x.BatDauNghi >= NgayBatDauHopDong).Sum(x => x.SoNgay) : 0;
                    float SoNgayNghiPH_TV = lichnghinv != null ? lichnghinv.Where(x => x.KetThucNghi <= NgayBatDauHopDong).Sum(x => x.SoNgay) : 0;
                    if (NgayBatDauHopDong < from)
                    {
                        //Full chính thức
                        try
                        {
                            foreach (DataColumn col in dt.Columns)
                            {
                                if (lstcs.Any(x => x.Ma == col.ColumnName))
                                {
                                    MucLuong_CT += string.IsNullOrWhiteSpace(dr[col.ColumnName].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName].ToString());
                                }
                                if (lstpc.Where(z => z.Loai == 1).Any(x => x.Ma == col.ColumnName))
                                {
                                    TongTienPhuCap_CT += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                }
                                if (lstpc.Where(z => z.Loai == -1).Any(x => x.Ma == col.ColumnName))
                                {
                                    TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                }
                            }
                            TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr["NLD_ThucTe"].ToString()) ? 0 : decimal.Parse(dr["NLD_ThucTe"].ToString());
                            TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr["TienPhat"].ToString()) ? 0 : decimal.Parse(dr["TienPhat"].ToString());
                            dr["MucLuong"] = MucLuong_CT;
                            TinhBangLuongModel item = list.Where(x => x.ID_HoSoNhanSu == int.Parse(dr["ID"].ToString())).FirstOrDefault();
                            PCTrucDem = (decimal)item.TrucDemDenTran * 150000;
                            PCXuatAn = (decimal)item.XuatAn * 30000;
                            item.SoCong = item.SoCong + SoNgayNghiPH_CT;
                            TongienLuong_CT = MucLuong_CT * (decimal)(item.SoCong / item.CongChuan);
                            dr["TongTienLuong"] = TongienLuong_CT;
                            LuongLeTet_CT = ((string.IsNullOrWhiteSpace(dr["LCB"].ToString()) ? 0 : decimal.Parse(dr["LCB"].ToString()))
                               + (string.IsNullOrWhiteSpace(dr["PCHS"].ToString()) ? 0 : decimal.Parse(dr["PCHS"].ToString()))) * 2 * (decimal)(item.SoCongLeTet_CT / item.CongChuan);
                            dr["LuongLeTet"] = LuongLeTet_CT;
                            dr["TongTienPhuCap"] = TongTienPhuCap_CT + (decimal)(item.XuatAn * 30000) + (decimal)(item.TrucDemDenTran * 150000);
                            dr["TongTienGiamTru"] = TongTienGiamTru_CT;
                            dr["LuongThucNhan"] = TongienLuong_CT + TongTienPhuCap_CT + PCTrucDem + PCXuatAn + LuongLeTet_CT - TongTienGiamTru_CT;
                            dr["CongChuan"] = item.CongChuan;
                            dr["SoCong"] = item.SoCong;
                            dr["SoCongLeTet"] = item.SoCongLeTet_CT;
                            dr["TrucDem"] = item.TrucDem;
                            dr["TrucDemDenTran"] = item.TrucDemDenTran;
                            dr["XuatAn"] = item.XuatAn;
                            dr["HoTroTrucDemDenTran"] = PCTrucDem;
                            dr["HoTroXuatAn"] = PCXuatAn;
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                    else if (from <= NgayBatDauHopDong && NgayBatDauHopDong <= to)
                    {
                        //Chính thức + Thử việc

                        if (int.Parse(dr["ID_LoaiHopDong"].ToString()) == 0)
                        {
                            //Thử việc
                            try
                            {
                                TinhBangLuongModel item = dao.GetDataTinhBangLuong_ByNhanVien(from, NgayBatDauHopDong.AddDays(-1), int.Parse(dr["ID"].ToString())).FirstOrDefault();
                                //Tính lương thử việc
                                foreach (DataColumn col in dt.Columns)
                                {
                                    if (lstcs.Any(x => x.Ma == col.ColumnName))
                                    {
                                        decimal value = string.IsNullOrWhiteSpace(dr[col.ColumnName + "_TV"].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName + "_TV"].ToString());
                                        dr[col.ColumnName] = value;
                                        MucLuong_TV += value;
                                    }
                                }
                                PCTrucDem = (decimal)item.TrucDemDenTran * 150000;
                                PCXuatAn = (decimal)item.XuatAn * 30000;
                                item.SoCong = item.SoCong + SoNgayNghiPH_TV;
                                dr["MucLuong"] = MucLuong_TV;
                                TongienLuong_TV = MucLuong_TV * (decimal)(item.SoCong / item.CongChuan);
                                dr["TongTienLuong"] = TongienLuong_TV;
                                dr["NLD_ThucTe"] = 0; dr["TienPhat"] = 0;
                                LuongLeTet_TV = ((string.IsNullOrWhiteSpace(dr["LCB_TV"].ToString()) ? 0 : decimal.Parse(dr["LCB_TV"].ToString()))
                                   + (string.IsNullOrWhiteSpace(dr["PCHS_TV"].ToString()) ? 0 : decimal.Parse(dr["PCHS_TV"].ToString()))) * 2 * (decimal)(item.SoCongLeTet_TV / item.CongChuan);
                                dr["LuongLeTet"] = LuongLeTet_TV;
                                dr["TongTienPhuCap"] = (decimal)(item.XuatAn * 30000) + (decimal)(item.TrucDemDenTran * 150000);
                                dr["TongTienGiamTru"] = 0;
                                dr["LuongThucNhan"] = TongienLuong_TV + LuongLeTet_TV + PCTrucDem + PCXuatAn;
                                dr["CongChuan"] = item.CongChuan;
                                dr["SoCong"] = item.SoCong;
                                dr["SoCongLeTet"] = item.SoCongLeTet_TV;
                                dr["TrucDem"] = item.TrucDem;
                                dr["TrucDemDenTran"] = item.TrucDemDenTran;
                                dr["XuatAn"] = item.XuatAn;
                                dr["HoTroTrucDemDenTran"] = PCTrucDem;
                                dr["HoTroXuatAn"] = PCXuatAn;
                            }
                            catch (Exception ex)
                            {

                            }
                        }
                        else
                        {
                            //Chính thức
                            try
                            {
                                TinhBangLuongModel item = dao.GetDataTinhBangLuong_ByNhanVien(NgayBatDauHopDong.Date, to, int.Parse(dr["ID"].ToString())).FirstOrDefault();
                                TinhBangLuongModel item_total = list.Where(x => x.ID_HoSoNhanSu == int.Parse(dr["ID"].ToString())).FirstOrDefault();
                                foreach (DataColumn col in dt.Columns)
                                {
                                    if (lstcs.Any(x => x.Ma == col.ColumnName))
                                    {
                                        MucLuong_CT += string.IsNullOrWhiteSpace(dr[col.ColumnName].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName].ToString());
                                    }
                                    if (lstpc.Where(z => z.Loai == 1).Any(x => x.Ma == col.ColumnName))
                                    {
                                        TongTienPhuCap_CT += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                    }
                                    if (lstpc.Where(z => z.Loai == -1).Any(x => x.Ma == col.ColumnName))
                                    {
                                        TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                    }
                                }
                                PCTrucDem = (decimal)item.TrucDemDenTran * 150000;
                                PCXuatAn = (decimal)item.XuatAn * 30000;
                                TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr["NLD_ThucTe"].ToString()) ? 0 : decimal.Parse(dr["NLD_ThucTe"].ToString());
                                TongTienGiamTru_CT += string.IsNullOrWhiteSpace(dr["TienPhat"].ToString()) ? 0 : decimal.Parse(dr["TienPhat"].ToString());
                                dr["MucLuong"] = MucLuong_CT;
                                item.SoCong = item.SoCong + SoNgayNghiPH_CT;
                                TongienLuong_CT = MucLuong_CT * (decimal)(item.SoCong / item.CongChuan);
                                dr["TongTienLuong"] = TongienLuong_CT;
                                LuongLeTet_CT = ((string.IsNullOrWhiteSpace(dr["LCB"].ToString()) ? 0 : decimal.Parse(dr["LCB"].ToString()))
                                   + (string.IsNullOrWhiteSpace(dr["PCHS"].ToString()) ? 0 : decimal.Parse(dr["PCHS"].ToString()))) * 2 * (decimal)(item.SoCongLeTet_CT / item.CongChuan);
                                dr["LuongLeTet"] = LuongLeTet_CT;
                                dr["TongTienPhuCap"] = TongTienPhuCap_CT + (decimal)(item.XuatAn * 30000) + (decimal)(item.TrucDemDenTran * 150000);
                                dr["TongTienGiamTru"] = TongTienGiamTru_CT;
                                dr["LuongThucNhan"] = TongienLuong_CT + TongTienPhuCap_CT + PCTrucDem + PCXuatAn + LuongLeTet_CT - TongTienGiamTru_CT;
                                dr["CongChuan"] = item.CongChuan;
                                dr["SoCong"] = item.SoCong;
                                dr["SoCongLeTet"] = item.SoCongLeTet_CT;
                                dr["TrucDem"] = item.TrucDem;
                                dr["TrucDemDenTran"] = item.TrucDemDenTran;
                                dr["XuatAn"] = item.XuatAn;
                                dr["HoTroTrucDemDenTran"] = PCTrucDem;
                                dr["HoTroXuatAn"] = PCXuatAn;
                            }
                            catch (Exception ex)
                            {

                            }
                        }
                    }
                    else
                    {
                        if (int.Parse(dr["ID_LoaiHopDong"].ToString()) == 0)
                        {
                            //Full thử việc
                            try
                            {
                                TinhBangLuongModel item = list.Where(x => x.ID_HoSoNhanSu == int.Parse(dr["ID"].ToString())).FirstOrDefault();
                                foreach (DataColumn col in dt.Columns)
                                {
                                    if (lstcs.Any(x => x.Ma == col.ColumnName))
                                    {
                                        decimal value = string.IsNullOrWhiteSpace(dr[col.ColumnName + "_TV"].ToString()) ? 0 : decimal.Parse(dr[col.ColumnName + "_TV"].ToString());
                                        dr[col.ColumnName] = value;
                                        MucLuong_TV += value;
                                    }
                                    if (lstpc.Where(z => z.Loai == 1).Any(x => x.Ma == col.ColumnName))
                                    {
                                        TongTienPhuCap_TV += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                    }
                                    if (lstpc.Where(z => z.Loai == -1).Any(x => x.Ma == col.ColumnName))
                                    {
                                        TongTienGiamTru_TV += string.IsNullOrWhiteSpace(dr[col].ToString()) ? 0 : decimal.Parse(dr[col].ToString());
                                    }
                                }
                                PCTrucDem = (decimal)item.TrucDemDenTran * 150000;
                                PCXuatAn = (decimal)item.XuatAn * 30000;
                                TongTienGiamTru_TV += string.IsNullOrWhiteSpace(dr["NLD_ThucTe"].ToString()) ? 0 : decimal.Parse(dr["NLD_ThucTe"].ToString());
                                TongTienGiamTru_TV += string.IsNullOrWhiteSpace(dr["TienPhat"].ToString()) ? 0 : decimal.Parse(dr["TienPhat"].ToString());
                                dr["MucLuong"] = MucLuong_TV;
                                item.SoCong = item.SoCong + SoNgayNghiPH_TV;
                                TongienLuong_TV = MucLuong_TV * (decimal)(item.SoCong / item.CongChuan);
                                dr["TongTienLuong"] = TongienLuong_TV;
                                LuongLeTet_TV = ((string.IsNullOrWhiteSpace(dr["LCB_TV"].ToString()) ? 0 : decimal.Parse(dr["LCB_TV"].ToString()))
                                       + (string.IsNullOrWhiteSpace(dr["PCHS_TV"].ToString()) ? 0 : decimal.Parse(dr["PCHS_TV"].ToString()))) * 2 * (decimal)(item.SoCongLeTet_TV / item.CongChuan);
                                dr["TongTienPhuCap"] = TongTienPhuCap_TV + (decimal)(item.XuatAn * 30000) + (decimal)(item.TrucDemDenTran * 150000);
                                dr["LuongLeTet"] = LuongLeTet_TV;
                                dr["TongTienGiamTru"] = TongTienGiamTru_TV;
                                dr["LuongThucNhan"] = TongienLuong_TV + TongTienPhuCap_TV + PCTrucDem + PCXuatAn + LuongLeTet_TV - TongTienGiamTru_TV;
                                dr["CongChuan"] = item.CongChuan;
                                dr["SoCong"] = item.SoCong;
                                dr["SoCongLeTet"] = item.SoCongLeTet_TV;
                                dr["TrucDem"] = item.TrucDem;
                                dr["TrucDemDenTran"] = item.TrucDemDenTran;
                                dr["XuatAn"] = item.XuatAn;
                                dr["HoTroTrucDemDenTran"] = PCTrucDem;
                                dr["HoTroXuatAn"] = PCXuatAn;
                            }
                            catch (Exception ex)
                            {

                            }
                        }
                    }

                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(StringHelper.RemoveVietNameseSign(col.ColumnName).Trim().Replace(" ", "_"), dr[col]);
                    }
                    parentRow.Add(childRow);
                }
                string p = "/Content/BangLuong/";
                string path = System.IO.Path.Combine(Server.MapPath(p), nam + "-" + thang + "-" + quy + "-" + tuan + ".json");
                using (var streamWriter = System.IO.File.CreateText(path))
                {
                    streamWriter.Write(JsonConvert.SerializeObject(parentRow));
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