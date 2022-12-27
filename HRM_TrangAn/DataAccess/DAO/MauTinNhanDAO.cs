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
    public class MauTinNhanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(MauTinNhanDAO));
        private DataHelper helper;
        public MauTinNhanDAO()
        {
            helper = new DataHelper();
        }

        private MauTinNhanModel GetObjFromDataRow(DataRow dr)
        {
            MauTinNhanModel obj = new MauTinNhanModel();
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

        public List<MauTinNhanModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_MauTinNhan_GetAll");
                DataTable dt = ds.Tables[0];
                List<MauTinNhanModel> result = new List<MauTinNhanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    MauTinNhanModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public MauTinNhanModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_MauTinNhan_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<MauTinNhanModel> result = new List<MauTinNhanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    MauTinNhanModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_MauTinNhan_Delete", pars);
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
                log.Error("sp_MauTinNhan_Delete " + ex.Message);
                return false;
            }
        }
    }
}