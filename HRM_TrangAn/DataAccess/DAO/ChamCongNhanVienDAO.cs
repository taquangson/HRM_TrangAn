using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class ChamCongNhanVienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChamCongNhanVienDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ChamCongNhanVienDAO()
        {
            helper = new DataHelper();
        }

        private ChamCongNhanVienModel GetObjFromDataRow(DataRow dr)
        {
            ChamCongNhanVienModel obj = new ChamCongNhanVienModel();
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

        private TinhCongNhanVienModel GetObjTCFromDataRow(DataRow dr)
        {
            TinhCongNhanVienModel obj = new TinhCongNhanVienModel();
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

        public List<ChamCongNhanVienModel> GetListChamCong_ByNgay(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCongNhanVien_ByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongNhanVienModel> result = new List<ChamCongNhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongNhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_ByNgay " + ex.Message);
                return null;
            }
        }

        public List<ChamCongNhanVienModel> GetListChamCong_ByNgay_NhanVien(int ID_NhanVien, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCongNhanVien_GetListChamCong_ByNgayNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongNhanVienModel> result = new List<ChamCongNhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongNhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCongNhanVien_ByNgayNhanVien " + ex.Message);
                return null;
            }
        }

        public List<TinhCongNhanVienModel> GetLichSuDiMuonVeSom(int ID_PhongBan, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_LichSuDiMuonVeSom_GetList", pars);
                DataTable dt = ds.Tables[0];
                List<TinhCongNhanVienModel> result = new List<TinhCongNhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TinhCongNhanVienModel model = GetObjTCFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuDiMuonVeSom_GetList " + ex.Message);
                return null;
            }
        }


        public int Insert(ChamCongNhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {

                    new SqlParameter("@EnrollNumber", model.EnrollNumber),
                    new SqlParameter("@VerifyMode", 1),
                    new SqlParameter("@InOutMode", 0),
                    new SqlParameter("@WorkDate", model.WorkDate),
                    new SqlParameter("@Workcode", 0),
                    new SqlParameter("@ID_DiemQuetThe", model.ID_DiemQuetThe),
                    new SqlParameter("@DiaChiIP", model.DiaChiIP),
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan)

                };

                object id = helper.ExecuteScalar("sp_ChamCongNhanSu_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCongNhanSu_Insert " + ex.Message);
            }

            return 0;
        }

        public bool InsertCongNhanVien(TinhCongNhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {

                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@NgayTinhCong", model.Ngay),
                    new SqlParameter("@SoCong", model.SoCong),
                    new SqlParameter("@SoCongTangCa", model.SoCongTangCa),
                    new SqlParameter("@XuatAn", model.XuatAn),
                    new SqlParameter("@Loai", 1),
                    new SqlParameter("@ID_CaLamViec", model.ID_CaLamViec)

                };

                int rowaff = helper.ExecuteNonQuery("sp_CongNhanSu_Insert", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_Insert " + ex.Message);
            }

            return false;
        }

        public bool InsertLichSuDiMuonVeSom(TinhCongNhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {

                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@Ngay", model.Ngay),
                    new SqlParameter("@ID_CaLamViec", model.ID_CaLamViec),

                };

                int rowaff = helper.ExecuteNonQuery("sp_LichSuDiMuonVeSom_Insert", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuDiMuonVeSom_Insert " + ex.Message);
            }

            return false;
        }

        public bool UpdateLichSuDiMuonVeSom(int ID, int DaTinhCong, int DaXuLy)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {

                    new SqlParameter("@ID", ID),
                    new SqlParameter("@DaXuLy", DaXuLy),
                    new SqlParameter("@DaTinhCong", DaTinhCong),

                };

                int rowaff = helper.ExecuteNonQuery("sp_LichSuDiMuonVeSom_Update", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuDiMuonVeSom_Update " + ex.Message);
            }

            return false;
        }


        public DataTable GetDataCong(DateTime from, DateTime to, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongLaoDong", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongLaoDong " + ex.Message);
                return null;
            }
        }


        public DataTable CongNhanSu_GetDataTree(DateTime from, DateTime to, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_CongNhanSu_GetDataTree", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_GetDataTree " + ex.Message);
                return null;
            }
        }

        public DataTable CongNhanSu_GetDataTree_XuatAn(DateTime from, DateTime to, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_CongNhanSu_GetDataTree_XuatAn", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_GetDataTree_XuatAn " + ex.Message);
                return null;
            }
        }

        public float CongNhanSu_CountXuatAn(DateTime from, DateTime to, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@from", from),
                    new SqlParameter("@to", to),
                    new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };

                object d = helper.ExecuteScalar("sp_CongNhanSu_CountXuatAn", pars);
                return float.Parse(d.ToString());
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_CountXuatAn " + ex.Message);
                return 0;
            }
        }



        public DataTable CongNhanSu_GetDataTree_TangCa(DateTime from, DateTime to, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_CongNhanSu_GetDataTree_TangCa", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_GetDataTree_TangCa " + ex.Message);
                return null;
            }
        }

        public DataTable CongNhanSu_GetDataByNhanVien(DateTime from, DateTime to, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_CongNhanSu_GetDataByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongNhanSu_GetDataByNhanVien " + ex.Message);
                return null;
            }
        }


        public bool ChotCong(DateTime Ngay, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ThangChotCong",Ngay ),
                    new SqlParameter("@ID_TaiKhoan",ID_TaiKhoan ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_LichSuChotCong_Insert", pars);
                if (rowaff > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuChotCong_Insert " + ex.Message);
                return false;
            }
        }


        public DataTable GetBangChamCong(int ID_PhongBan, string ListID_HSNS, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_PhongBan",ID_PhongBan),
                    new SqlParameter("@ListID_HSNS",ListID_HSNS),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChamCongNhanVien_GetBangChamCong", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCongNhanVien_GetBangChamCong " + ex.Message);
                return null;
            }
        }

        public DataTable GetBangChamCongForNhanVien(int ID_HSNS, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HSNS",ID_HSNS),
                    new SqlParameter("@from",from),
                    new SqlParameter("@to",to),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChamCongNhanVien_GetBangChamCongForNhanVien", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCongNhanVien_GetBangChamCong " + ex.Message);
                return null;
            }
        }
    }

}