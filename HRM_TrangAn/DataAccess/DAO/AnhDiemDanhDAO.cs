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
    public class AnhDiemDanhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public AnhDiemDanhDAO()
        {
            helper = new DataHelper();
        }

        private AnhDiemDanhModel GetObjFromDataRow(DataRow dr)
        {
            AnhDiemDanhModel obj = new AnhDiemDanhModel();
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
        public List<AnhDiemDanhModel> GetByDiemDanh(int ID_LopHoc, int ID_CaHoc, DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_LopHoc", ID_LopHoc),
                new SqlParameter("@ID_CaHoc", ID_CaHoc),
                new SqlParameter("@Ngay", Ngay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_AnhDiemDanh_GetByDiemDanh", pars);
                DataTable dt = ds.Tables[0];
                List<AnhDiemDanhModel> result = new List<AnhDiemDanhModel>();
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

        public bool InsertOrUpdate(AnhDiemDanhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {                    
                new SqlParameter("@ID_LopHoc", model.ID_LopHoc),
                new SqlParameter("@ID_CaHoc", model.ID_CaHoc),
                new SqlParameter("@Ngay", model.NgayTao),
                new SqlParameter("@DuongDan", model.DuongDan)
                };

                int id = helper.ExecuteNonQuery("sp_AnhDiemDanh_InsertOrUpdate", pars);
                if (id > 0)
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
                log.Error("sp_AnhDiemDanh_InsertOrUpdate " + ex.Message);
                return false;

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
                int rowaff = helper.ExecuteNonQuery("sp_AnhDiemDanh_Delete", pars);
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
                log.Error("sp_AnhDiemDanh_Delete " + ex.Message);
                return false;
            }
        }
    }
}