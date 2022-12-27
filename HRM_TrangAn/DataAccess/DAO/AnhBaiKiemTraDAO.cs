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
    public class AnhBaiKiemTraDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public AnhBaiKiemTraDAO()
        {
            helper = new DataHelper();
        }

        private AnhBaiKiemTraModel GetObjFromDataRow(DataRow dr)
        {
            AnhBaiKiemTraModel obj = new AnhBaiKiemTraModel();
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
        public List<AnhBaiKiemTraModel> GetByBaiKiemTra(int ID_BaiKiemTra)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_BaiKiemTra", ID_BaiKiemTra),
                };
                DataSet ds = helper.ExecuteDataSet("sp_AnhBaiKiemTra_GetByBaiKiemTra", pars);
                DataTable dt = ds.Tables[0];
                List<AnhBaiKiemTraModel> result = new List<AnhBaiKiemTraModel>();
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

        public int InsertOrUpdate(AnhBaiKiemTraModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_BaiKiemTra", model.ID_BaiKiemTra),
                new SqlParameter("@DuongDan", model.DuongDan)
                };

                object id = helper.ExecuteScalar("sp_AnhBaiKiemTra_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_AnhBaiKiemTra_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_AnhBaiKiemTra_Delete", pars);
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
                log.Error("sp_AnhBaiKiemTra_Delete " + ex.Message);
                return false;
            }
        }
    }
}