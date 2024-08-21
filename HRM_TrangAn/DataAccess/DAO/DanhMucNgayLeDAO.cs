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
    public class DanhMucNgayLeDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucNgayLeDAO));
        private DataHelper helper;
        public DanhMucNgayLeDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucNgayLeModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucNgayLeModel obj = new DanhMucNgayLeModel();
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

        public List<DanhMucNgayLeModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucNgayLe_GetAll");
                DataTable dt = ds.Tables[0];
                List<DanhMucNgayLeModel> result = new List<DanhMucNgayLeModel>();
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

        public List<DanhMucNgayLeModel> GetByDate(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucNgayLe_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                List<DanhMucNgayLeModel> result = new List<DanhMucNgayLeModel>();
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

        public DanhMucNgayLeModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucNgayLe_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<DanhMucNgayLeModel> result = new List<DanhMucNgayLeModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(DanhMucNgayLeModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenNgayNghi", model.TenNgayNghi),
                new SqlParameter("@SoNgayNghi", model.SoNgayNghi),
                new SqlParameter("@NgayBatDauNghi", model.NgayBatDauNghi),
                new SqlParameter("@NgayKetThucNghi", model.NgayKetThucNghi),
                new SqlParameter("@TinhLuong", model.TinhLuong)
                };

                object id = helper.ExecuteScalar("sp_DanhMucNgayLe_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucNgayLe_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucNgayLe_Delete", pars);
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
                log.Error("sp_DanhMucNgayLe_Delete " + ex.Message);
                return false;
            }
        }
    }
}