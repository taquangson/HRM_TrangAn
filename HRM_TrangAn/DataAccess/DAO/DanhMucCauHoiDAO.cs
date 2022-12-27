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
    public class DanhMucCauHoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucCauHoiDAO));
        private DataHelper helper;
        public DanhMucCauHoiDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucCauHoiModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucCauHoiModel obj = new DanhMucCauHoiModel();
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

        public List<DanhMucCauHoiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCauHoi_GetAll");
                DataTable dt = ds.Tables[0];
                List<DanhMucCauHoiModel> result = new List<DanhMucCauHoiModel>();
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


        public int InsertOrUpdate_DanhMucCauHoi(DanhMucCauHoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenDanhMucCauHoi", model.TenDanhMucCauHoi),
                new SqlParameter("@ID_Cha", model.ID_Cha)
                };

                object id = helper.ExecuteScalar("sp_DanhMucCauHoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCauHoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_DanhMucCauHoi(int ID_DanhMucCauHoi)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DanhMucCauHoi )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucCauHoi_Delete", pars);
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
                log.Error("sp_DanhMucCauHoi_Delete " + ex.Message);
                return false;
            }
        }
    }
}