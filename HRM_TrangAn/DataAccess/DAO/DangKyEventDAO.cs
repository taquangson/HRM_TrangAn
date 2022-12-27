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
    public class DangKyEventDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DangKyEventDAO));
        private DataHelper helper;
        public DangKyEventDAO()
        {
            helper = new DataHelper();
        }

        private DangKyEventModel GetObjFromDataRow(DataRow dr)
        {
            DangKyEventModel obj = new DangKyEventModel();
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
        public List<DangKyEventModel> GetByNgayTao(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyEvent_GetByNgayDangKy", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyEventModel> result = new List<DangKyEventModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyEventModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        public bool Insert(DangKyEventModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                };

                int rowaff = helper.ExecuteNonQuery("sp_DangKyEvent_Insert", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyEvent_Insert " + ex.Message);
            }

            return false;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_DangKyEvent_Delete", pars);
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
                log.Error("sp_DangKyEvent_Delete " + ex.Message);
                return false;
            }
        }
    }
}