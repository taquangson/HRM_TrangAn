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
    public class CheckInSuKienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public CheckInSuKienDAO()
        {
            helper = new DataHelper();
        }

        private CheckInSuKienModel GetObjFromDataRow(DataRow dr)
        {
            CheckInSuKienModel obj = new CheckInSuKienModel();
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
        public List<CheckInSuKienModel> GetByHocSinh(int ID_HocSinh, DateTime NgayToChucSuKien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@NgayToChucSuKien", NgayToChucSuKien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChechInSuKien_GetByIDHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<CheckInSuKienModel> result = new List<CheckInSuKienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CheckInSuKienModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return new List<CheckInSuKienModel>();
            }
        }

        public bool Insert(CheckInSuKienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@NgayToChucSuKien", model.NgayToChucSuKien),
                new SqlParameter("@ThoiGianCheckIn", model.ThoiGianCheckIn),
                };

                int rowaff = helper.ExecuteNonQuery("sp_ChechInSuKien_Insert", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChechInSuKien_Insert " + ex.Message);
            }

            return false;
        }
    }
}