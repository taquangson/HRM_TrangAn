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
    public class NoCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NoCongDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NoCongDAO()
        {
            helper = new DataHelper();
        }

        private NoCongModel GetObjFromDataRow(DataRow dr)
        {
            NoCongModel obj = new NoCongModel();
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

        public List<NoCongModel> GetDataNoCong(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetDataNoCong", pars);
                DataTable dt = ds.Tables[0];
                List<NoCongModel> result = new List<NoCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NoCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetDataNoCong " + ex.Message);
                return new List<NoCongModel>();
            }
        }
    }
}