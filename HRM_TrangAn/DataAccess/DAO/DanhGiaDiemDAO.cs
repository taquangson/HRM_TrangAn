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
    public class DanhGiaDiemDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DanhGiaDiemDAO()
        {
            helper = new DataHelper();
        }

        private DanhGiaDiemModel GetObjFromDataRow(DataRow dr)
        {
            DanhGiaDiemModel obj = new DanhGiaDiemModel();
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
        public List<DanhGiaDiemModel> GetBySTT(int STT)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@STT", STT),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhGiaDiem_GetBySTT", pars);
                DataTable dt = ds.Tables[0];
                List<DanhGiaDiemModel> result = new List<DanhGiaDiemModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DanhGiaDiemModel model = GetObjFromDataRow(dr);
                    result.Add( model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<DanhGiaDiemModel> GetAll(string MaDiem, DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@MaDiem", MaDiem),
                new SqlParameter("@From", From),
                new SqlParameter("@To", To),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhGiaDiem_GetByBoLoc", pars);
                DataTable dt = ds.Tables[0];
                List<DanhGiaDiemModel> result = new List<DanhGiaDiemModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DanhGiaDiemModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(DanhGiaDiemModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@STT", model.STT),
                new SqlParameter("@CauHoi", model.CauHoi),
                new SqlParameter("@TraLoi", model.TraLoi),
                new SqlParameter("@MaCauHoi", model.MaCauHoi)
                };

                object id = helper.ExecuteScalar("sp_DanhGiaDiem_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhGiaDiem_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

       

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@STT",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_DanhGiaDiem_Delete", pars);
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
                log.Error("sp_DanhGiaDiem_Delete " + ex.Message);
                return false;
            }
        }

        public bool UpdateTrangThai(int ID,int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@STT",ID ),
                    new SqlParameter("@TrangThai",TrangThai )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DanhGiaDiem_UpdateTrangThai", pars);
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
                log.Error("sp_DanhGiaDiem_UpdateTrangThai " + ex.Message);
                return false;
            }
        }
    }
}