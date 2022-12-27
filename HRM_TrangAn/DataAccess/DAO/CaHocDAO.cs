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
    public class CaHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CaHocDAO));
        private DataHelper helper;
        public CaHocDAO()
        {
            helper = new DataHelper();
        }

        private CaHocModel GetObjFromDataRow(DataRow dr)
        {
            CaHocModel obj = new CaHocModel();
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

        public List<CaHocModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_CaHoc_GetAll");
                DataTable dt = ds.Tables[0];
                List<CaHocModel> result = new List<CaHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public CaHocModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaHoc_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<CaHocModel> result = new List<CaHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(CaHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenCa", model.TenCa),
                new SqlParameter("@GioBatDau", model.GioBatDau),
                new SqlParameter("@GioKetThuc", model.GioKetThuc)
                };

                object id = helper.ExecuteScalar("sp_CaHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CaHoc_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_CaHoc_Delete", pars);
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
                log.Error("sp_CaHoc_Delete " + ex.Message);
                return false;
            }
        }
    }
}