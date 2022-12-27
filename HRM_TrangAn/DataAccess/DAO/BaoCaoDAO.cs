using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
namespace HRM_TrangAn.DataAccess.DAO
{
    public class BaoCaoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public BaoCaoDAO()
        {
            helper = new DataHelper();
        }

        public class ThongKeBuoiHocTheoHocSinhModel
        {
            public string TenLop { get; set; }
            public string TenHocSinh { get; set; }
            public string TenGiaoVien { get; set; }
            public DateTime ThoiGianVaoLop { get; set; }
            public int CoPhep { get; set; }
            public string CoMat { get; set; }
            public string VangCoPhep { get; set; }
            public string VangKhongPhep { get; set; }
        }

        private ThongKeBuoiHocTheoHocSinhModel GetThongKeBuoiHocTheoHocSinhModelFromDataRow(DataRow dr)
        {
            ThongKeBuoiHocTheoHocSinhModel obj = new ThongKeBuoiHocTheoHocSinhModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<ThongKeBuoiHocTheoHocSinhModel> ThongKeBuoiHocTheoHocSinh(int ID_Lop, int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<ThongKeBuoiHocTheoHocSinhModel> result = new List<ThongKeBuoiHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_ThongKeBuoiHocTheoHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    ThongKeBuoiHocTheoHocSinhModel item = GetThongKeBuoiHocTheoHocSinhModelFromDataRow(dr);
                    switch (item.CoPhep)
                    {
                        case 0:
                            item.CoMat = "x";
                            item.VangCoPhep = "";
                            item.VangKhongPhep = "";
                            break;
                        case -1:
                            item.CoMat = "";
                            item.VangCoPhep = "";
                            item.VangKhongPhep = "x";
                            break;
                        case 1:
                            item.CoMat = "";
                            item.VangCoPhep = "x";
                            item.VangKhongPhep = "";
                            break;
                    }
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_ThongKeBuoiHocTheoHocSinh " + ex.Message);
                return null;


            }
        }

        public class BaoCaoPhieuHocTheoHocSinhModel
        {
            public int ID_HocSinh { get; set; }
            public string TenHocSinh { get; set; }
            public int ID_PhieuHoc { get; set; }
            public int ID_Lop { get; set; }
            public string TenLop { get; set; }
            public int SoBuoi { get; set; }
            public int SoBuoiDaHoc { get; set; }
            public DateTime NgayTao { get; set; }
            public int ID_NhanVien { get; set; }
            public string TenNhanVien { get; set; }
        }

        private BaoCaoPhieuHocTheoHocSinhModel GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(DataRow dr)
        {
            BaoCaoPhieuHocTheoHocSinhModel obj = new BaoCaoPhieuHocTheoHocSinhModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoPhieuHocTheoHocSinhModel> GetBaoCaoPhieuHocTheoHocSinh(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoPhieuHocTheoHocSinhModel> result = new List<BaoCaoPhieuHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoPhieuHocTheoHocSinhModel item = GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh " + ex.Message);
                return null;
            }
        }
        public List<BaoCaoPhieuHocTheoHocSinhModel> GetBaoCaoPhieuHocTheoHocSinh_TheoThang(int ID_HocSinh, int Thang)
        {
            try
            {
                List<BaoCaoPhieuHocTheoHocSinhModel> result = new List<BaoCaoPhieuHocTheoHocSinhModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@Thang",Thang)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh_TheoThang", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoPhieuHocTheoHocSinhModel item = GetBaoCaoPhieuHocTheoHocSinhModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh " + ex.Message);
                return null;
            }
        }

        public class BaoCaoSoBuoiHoc_HocSinh_ThangModel
        {
            public string TenLop { get; set; }
            public int Thang { get; set; }
            public int Nam { get; set; }
            public int SoBuoiHoc { get; set; }
            public int SoBuoiDaMua { get; set; }
            public int SoBuoiDaMuaPhuThu { get; set; }
            public int SoBuoiDaMuaGiamTru { get; set; }
            public int SoBuoiTheoLich { get; set; }
            public int ID_LopHoc { get; set; }
            public int ID_PhieuHoc { get; set; }
            public List<int> LichHoc { get; set; }
        }

        public class BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate
        {
            public int Thang { get; set; }
            public int Nam { get; set; }
            public bool NoHocPhi { get; set; }
            public List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> data { get; set; }
        }

        private BaoCaoSoBuoiHoc_HocSinh_ThangModel GetBaoCaoSoBuoiHoc_HocSinh_ThangModelFromDataRow(DataRow dr)
        {
            BaoCaoSoBuoiHoc_HocSinh_ThangModel obj = new BaoCaoSoBuoiHoc_HocSinh_ThangModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }


        public List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> GetBaoCaoSoBuoiHoc_HocSinh_Thang(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> result = new List<BaoCaoSoBuoiHoc_HocSinh_ThangModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoSoBuoiHoc_HocSinh_Thang", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoSoBuoiHoc_HocSinh_ThangModel item = GetBaoCaoSoBuoiHoc_HocSinh_ThangModelFromDataRow(dr);
                    item.SoBuoiDaMua += item.SoBuoiDaMuaPhuThu;
                    item.SoBuoiDaMua -= item.SoBuoiDaMuaGiamTru;
                    item.LichHoc = new List<int>();
                    List<LichHocModel> lich = new LichHocDAO().GetByLop(item.ID_LopHoc);
                    foreach (LichHocModel l in lich)
                    {
                        item.LichHoc.Add(l.Thu);
                    }
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoPhieuHocTheoHocSinh_TheoThang " + ex.Message);
                return null;
            }
        }

        public class ThongKeBuoiHocTheoGiaoVienModel
        {
            public DateTime NgayHoc { get; set; }
            public string TenLop { get; set; }
            public string TenCa { get; set; }
            public int SiSo { get; set; }
            public int ID_Lop { get; set; }
        }

        private ThongKeBuoiHocTheoGiaoVienModel GetThongKeBuoiHocTheoGiaoVienModelFromDataRow(DataRow dr)
        {
            ThongKeBuoiHocTheoGiaoVienModel obj = new ThongKeBuoiHocTheoGiaoVienModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<ThongKeBuoiHocTheoGiaoVienModel> GetData_ThongKeBuoiHocTheoGiaoVien(int ID_Lop, int ID_GiaoVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<ThongKeBuoiHocTheoGiaoVienModel> result = new List<ThongKeBuoiHocTheoGiaoVienModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_GiaoVien",ID_GiaoVien),
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoSoBuoiHocTheoGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    ThongKeBuoiHocTheoGiaoVienModel item = GetThongKeBuoiHocTheoGiaoVienModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoSoBuoiHocTheoGiaoVien " + ex.Message);
                return null;


            }
        }

        public class BaoCaoDoanhThuModel
        {
            public DateTime NgayTao { get; set; }
            public string MaPhieu { get; set; }
            public DateTime ThoiGianIn { get; set; }
            public double TongThu { get; set; }
            public string TenNhanVien { get; set; }
            public string TenHocSinh { get; set; }
            public string HinhThucThanhToan { get; set; }
        }

        private BaoCaoDoanhThuModel GetBaoCaoDoanhThuModelFromDataRow(DataRow dr)
        {
            BaoCaoDoanhThuModel obj = new BaoCaoDoanhThuModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoDoanhThuModel> GetBaoCaoDoanhThu(int ID_ChiNhanh, int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                List<BaoCaoDoanhThuModel> result = new List<BaoCaoDoanhThuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien),
                    new SqlParameter("@TuNgay",TuNgay),
                    new SqlParameter("@DenNgay",DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoDoanhThu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoDoanhThuModel item = GetBaoCaoDoanhThuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoDoanhThu " + ex.Message);
                return null;
            }
        }

        public class BaoCaoNoPhieuModel
        {
            public string TenHocSinh { get; set; }
            public int SoPhieuNo { get; set; }
            public string TenLop { get; set; }
            public string TenLopDaMua { get; set; }
            public int ID_HocSinh { get; set; }
        }

        private BaoCaoNoPhieuModel GetBaoCaoNoPhieuModelFromDataRow(DataRow dr)
        {
            BaoCaoNoPhieuModel obj = new BaoCaoNoPhieuModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaoCaoNoPhieuModel> GetBaoCaoNoPhieu(int ID_ChiNhanh, int Thang, int Nam)
        {
            try
            {
                List<BaoCaoNoPhieuModel> result = new List<BaoCaoNoPhieuModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh",ID_ChiNhanh),
                    new SqlParameter("@Thang",Thang),
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BaoCaoNoPhieu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaoCaoNoPhieuModel item = GetBaoCaoNoPhieuModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BaoCaoNoPhieu " + ex.Message);
                return null;
            }
        }

        public class BieuDoDiemModel
        {
            public string TenHocSinh { get; set; }
            public float Diem { get; set; }
            public string ThoiGianVaoLop { get; set; }
        }

        private BieuDoDiemModel GetBieuDoDiemModelFromDataRow(DataRow dr)
        {
            BieuDoDiemModel obj = new BieuDoDiemModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BieuDoDiemModel> GetBieuDoDiem(int ID_Lop, int ID_HocSinh, DateTime from, DateTime to)
        {
            try
            {
                List<BieuDoDiemModel> result = new List<BieuDoDiemModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@ID_HocSinh",ID_HocSinh),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BieuDoDiem", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BieuDoDiemModel item = GetBieuDoDiemModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BieuDoDiem " + ex.Message);
                return null;
            }
        }

        public List<BieuDoDiemModel> GetBieuDoDiemTrungBinh_TheoLop(int ID_Lop, DateTime from, DateTime to)
        {
            try
            {
                List<BieuDoDiemModel> result = new List<BieuDoDiemModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoCao_BieuDoDiemTrungBinh_TheoLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BieuDoDiemModel item = GetBieuDoDiemModelFromDataRow(dr);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoCao_BieuDoDiemTrungBinh_TheoLop " + ex.Message);
                return null;
            }
        }
        public DataTable GetLichSuChotCongByThang(int Thang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Thang",Thang),
                    new SqlParameter("@Nam",Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuChotCong_GetLichSuByThang", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuChotCong_GetLichSuByThang " + ex.Message);
                return null;
            }
        }


        public string SoLaiDoCoTichKeTrongThang()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_SoLaiDoCoTichKeTrongThang");
                DataTable dt = ds.Tables[0];
                return dt.Rows[0][0].ToString();
            }
            catch (Exception ex)
            {
                log.Error("sp_SoLaiDoCoTichKeTrongThang " + ex.Message);
                return "";
            }
        }

        public DataRow SoLaiDoDangLam_DaNghi()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_SoLaiDoDangLam_DaNghi");
                DataTable dt = ds.Tables[0];
                return dt.Rows[0];
            }
            catch (Exception ex)
            {
                log.Error("sp_SoLaiDoDangLam_DaNghi " + ex.Message);
                return null;
            }
        }

        public class TinhTrangChungChiModel
        {
            public int TongSoLaiDo { get; set; }
            public int CCDuongThuy { get; set; }
            public int CCNghiepVu { get; set; }
            public int CCPCCC { get; set; }
            public int CCTiengAnh { get; set; }
        }

        public TinhTrangChungChiModel GetTinhTrangChungChi()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_TinhTrangChungChi_GetData");
                DataTable dt = ds.Tables[0];
                TinhTrangChungChiModel item = new TinhTrangChungChiModel();
                item.TongSoLaiDo = int.Parse(dt.Rows[0]["TongSoLaiDo"].ToString());
                item.CCDuongThuy = int.Parse(dt.Rows[0]["CCDuongThuy"].ToString());
                item.CCNghiepVu = int.Parse(dt.Rows[0]["CCNghiepVu"].ToString());
                item.CCPCCC = int.Parse(dt.Rows[0]["CCPCCC"].ToString());
                item.CCTiengAnh = int.Parse(dt.Rows[0]["CCTiengAnh"].ToString());
                return item;
            }
            catch (Exception ex)
            {
                log.Error("sp_SoLaiDoCoTichKeTrongThang " + ex.Message);
                return new TinhTrangChungChiModel();
            }
        }

        public class HopDongSapHetHanModel
        {
            public int HocViec { get; set; }
            public int ThuViec { get; set; }
            public int ChinhThuc { get; set; }
        }

        public HopDongSapHetHanModel SoHopDongSapHetHan()
        {
            try
            {
                HopDongSapHetHanModel item = new HopDongSapHetHanModel();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_LoaiHopDong",0)
                };
                DataSet ds = helper.ExecuteDataSet("sp_SoHopDongSapHetHan_BetByLoaiHD", pars);
                DataTable dt = ds.Tables[0];
                item.ThuViec = int.Parse(dt.Rows[0][0].ToString());

                pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_LoaiHopDong",1)
                };
                ds = helper.ExecuteDataSet("sp_SoHopDongSapHetHan_BetByLoaiHD", pars);
                dt = ds.Tables[0];
                item.ChinhThuc = int.Parse(dt.Rows[0][0].ToString());

                pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_LoaiHopDong",2)
                };
                ds = helper.ExecuteDataSet("sp_SoHopDongSapHetHan_BetByLoaiHD", pars);
                dt = ds.Tables[0];
                item.HocViec = int.Parse(dt.Rows[0][0].ToString());
                return item;
            }
            catch (Exception ex)
            {
                log.Error("sp_SoLaiDoCoTichKeTrongThang " + ex.Message);
                return new HopDongSapHetHanModel();
            }
        }
    }
}