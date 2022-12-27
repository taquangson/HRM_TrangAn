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
    public class TinNhanPhanHoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(XinNghiPhepDAO));
        private DataHelper helper;
        public TinNhanPhanHoiDAO()
        {
            helper = new DataHelper();
        }

        private TinNhanPhanHoiModel GetObjFromDataRow(DataRow dr)
        {
            TinNhanPhanHoiModel obj = new TinNhanPhanHoiModel();
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


        public List<TinNhanPhanHoiModel> GetAllByNgayGui(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@TuNgay", TuNgay),
                new SqlParameter("@DenNgay", DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TinNhan_GetByNgayGui", pars);
                DataTable dt = ds.Tables[0];
                List<TinNhanPhanHoiModel> result = new List<TinNhanPhanHoiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TinNhanPhanHoiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_GetByUser " + ex.Message);
                return null;
            }
        }

    }
}