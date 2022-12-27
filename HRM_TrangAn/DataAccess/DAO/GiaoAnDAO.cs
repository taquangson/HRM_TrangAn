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
    public class GiaoAnDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CaHocDAO));
        private DataHelper helper;
        public GiaoAnDAO()
        {
            helper = new DataHelper();
        }

        private GiaoAnModel GetObjFromDataRow(DataRow dr)
        {
            GiaoAnModel obj = new GiaoAnModel();
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


        public GiaoAnModel GetByLichHoc(int ID_Lop, int ID_Ca, DateTime NgayHoc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_Ca", ID_Ca),
                new SqlParameter("@NgayHoc", NgayHoc),
                };
                DataSet ds = helper.ExecuteDataSet("sp_GiaoAn_GetByLichHoc", pars);
                DataTable dt = ds.Tables[0];
                List<GiaoAnModel> result = new List<GiaoAnModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_GiaoAn_GetByLichHoc " + ex.Message);
                return null;
            }
        }

        public bool InsertOrUpdate(GiaoAnModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@ID_Ca", model.ID_Ca),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@NgayHoc", model.NgayHoc),
                new SqlParameter("@TenBai", model.TenBai),
                new SqlParameter("@BaiTap", model.BaiTap)
                };

                int rowaff = helper.ExecuteNonQuery("sp_GiaoAn_InsertOrUpdate", pars);
                if (rowaff> 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_GiaoAn_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_GiaoAn_Delete", pars);
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
                log.Error("sp_GiaoAn_Delete " + ex.Message);
                return false;
            }
        }
    }
}