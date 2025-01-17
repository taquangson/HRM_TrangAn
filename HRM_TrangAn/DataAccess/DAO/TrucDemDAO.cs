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
    public class TrucDemDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public TrucDemDAO()
        {
            helper = new DataHelper();
        }

        private TrucDemModel GetObjFromDataRow(DataRow dr)
        {
            TrucDemModel obj = new TrucDemModel();
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
        private CountTrucDemModel GetCountObjFromDataRow(DataRow dr)
        {
            CountTrucDemModel obj = new CountTrucDemModel();
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
        public List<TrucDemModel> GetByNgay(int ID_PhongBan, string ListID_HSNS, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_PhongBan",ID_PhongBan),
                    new SqlParameter("@ListID_HSNS",ListID_HSNS),
                    new SqlParameter("@from", from),
                    new SqlParameter("@to", to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TrucDem_GetByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<TrucDemModel> result = new List<TrucDemModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TrucDemModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        public List<CountTrucDemModel> CountByNgay(int ID_PhongBan, string ListID_HSNS, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_PhongBan",ID_PhongBan),
                    new SqlParameter("@ListID_HSNS",ListID_HSNS),
                    new SqlParameter("@from", from),
                    new SqlParameter("@to", to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TrucDem_CountByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<CountTrucDemModel> result = new List<CountTrucDemModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CountTrucDemModel model = GetCountObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<TrucDemModel> GetNhanVienByDate(int ID_PhongBan, string ListID_HSNS, DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                      new SqlParameter("@ID_PhongBan",ID_PhongBan),
                    new SqlParameter("@ListID_HSNS",ListID_HSNS),
                new SqlParameter("@Ngay", Ngay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TrucDem_GetNhanVienByDate", pars);
                DataTable dt = ds.Tables[0];
                List<TrucDemModel> result = new List<TrucDemModel>();
                ChamCongNhanVienDAO ccdao = new ChamCongNhanVienDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    TrucDemModel model = GetObjFromDataRow(dr);
                    model.lstChamCong = ccdao.GetListChamCong_ByNgay_NhanVien(model.ID_TaiKhoan,Ngay,Ngay.AddHours(30));
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public int InsertOrUpdate(TrucDemModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@Ngay", model.Ngay),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@PhuCap", model.PhuCap)
                };

                object id = helper.ExecuteScalar("sp_TrucDem_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TrucDem_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TrucDem_Delete", pars);
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
                log.Error("sp_BaiKiemTra_Delete " + ex.Message);
                return false;
            }
        }
    }
}