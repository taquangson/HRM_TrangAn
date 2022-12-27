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
    public class BaiKiemTraDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public BaiKiemTraDAO()
        {
            helper = new DataHelper();
        }

        private BaiKiemTraModel GetObjFromDataRow(DataRow dr)
        {
            BaiKiemTraModel obj = new BaiKiemTraModel();
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
        public List<BaiKiemTraModel> GetByHocSinh(int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiKiemTra_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<BaiKiemTraModel> result = new List<BaiKiemTraModel>();
                AnhBaiKiemTraDAO abktdao = new AnhBaiKiemTraDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    BaiKiemTraModel model = GetObjFromDataRow(dr);
                    model.lstAnh = abktdao.GetByBaiKiemTra(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public BaiKiemTraModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiKiemTra_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<BaiKiemTraModel> result = new List<BaiKiemTraModel>();
                AnhBaiKiemTraDAO abktdao = new AnhBaiKiemTraDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    BaiKiemTraModel model = GetObjFromDataRow(dr);
                    model.lstAnh = abktdao.GetByBaiKiemTra(model.ID);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(BaiKiemTraModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@TenBaiKiemTra", model.TenBaiKiemTra),
                };

                object id = helper.ExecuteScalar("sp_BaiKiemTra_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiKiemTra_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_BaiKiemTra_Delete", pars);
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
                log.Error("sp_BaiKiemTra_Delete " + ex.Message);
                return false;
            }
        }
    }
}