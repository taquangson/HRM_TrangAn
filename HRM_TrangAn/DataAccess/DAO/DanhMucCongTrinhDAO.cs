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
    public class DanhMucCongTrinhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucCongTrinhDAO));
        private DataHelper helper;
        public DanhMucCongTrinhDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucCongTrinhModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucCongTrinhModel obj = new DanhMucCongTrinhModel();
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

        public List<DanhMucCongTrinhModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCongTrinh_GetAll");
                DataTable dt = ds.Tables[0];
                List<DanhMucCongTrinhModel> result = new List<DanhMucCongTrinhModel>();
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

        public DanhMucCongTrinhModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCongTrinh_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<DanhMucCongTrinhModel> result = new List<DanhMucCongTrinhModel>();
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

        public int InsertOrUpdate(DanhMucCongTrinhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenCongTrinh", model.TenCongTrinh)
                };

                object id = helper.ExecuteScalar("sp_DanhMucCongTrinh_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCongTrinh_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucCongTrinh_Delete", pars);
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
                log.Error("sp_DanhMucCongTrinh_Delete " + ex.Message);
                return false;
            }
        }
    }
}