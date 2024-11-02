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
    public class PhuCapDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhuCapDAO));
        private DataHelper helper;
        public PhuCapDAO()
        {
            helper = new DataHelper();
        }

        private PhuCapModel GetObjFromDataRow(DataRow dr)
        {
            PhuCapModel obj = new PhuCapModel();
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

        public List<PhuCapModel> GetAll()
        {
            try
            {
                List<PhuCapModel> result = new List<PhuCapModel>();
                DataSet ds = helper.ExecuteDataSet("sp_PhuCap_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    PhuCapModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuCap_GetAll " + ex.Message);
                return null;
            }
        }

        public PhuCapModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhuCap_GetByID", pars);
                DataTable dt = ds.Tables[0];
                PhuCapModel result = GetObjFromDataRow(dt.Rows[0]);
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuCap_GetByID " + ex.Message);
                return null;
            }
        }

        public List<PhuCapModel> GetByID_NhanVien(int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhuCap_GetByID_NhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<PhuCapModel> result = new List<PhuCapModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    PhuCapModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuCap_GetByID_NhanVien " + ex.Message);
                return null;
            }
        }
        public List<PhuCapModel> GetByDateRange(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
             new SqlParameter("@TuNgay", TuNgay),
             new SqlParameter("@DenNgay", DenNgay)
         };

                DataSet ds = helper.ExecuteDataSet("sp_PhuCap_GetByDateRange", pars);
                DataTable dt = ds.Tables[0];
                List<PhuCapModel> result = new List<PhuCapModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    PhuCapModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuCap_GetByDateRange " + ex.Message);
                return null;
            }
        }

        public bool InsertOrUpdate(PhuCapModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                    new SqlParameter("@Tien", model.Tien),
                    new SqlParameter("@NoiDung", model.NoiDung),
                    new SqlParameter("@ID_NguoiTao", model.ID_NguoiTao),
                    new SqlParameter("@NgayHuongPhuCap", ((model.NgayHuongPhuCap.Year == 1 || model.NgayHuongPhuCap == null) ? (object)DBNull.Value : model.NgayHuongPhuCap)),
                };

                int rowaff = helper.ExecuteNonQuery("sp_PhuCap_InsertOrUpdate", pars);
                if (rowaff > 0)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuCap_InsertOrUpdate " + ex.Message);
                return false;
            }
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", ID),
                };

                int rowaff = helper.ExecuteNonQuery("sp_PhuCap_DeleteMulti", pars);
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
                log.Error("sp_PhuCap_DeleteMulti " + ex.Message);
                return false;
            }
        }
    }
}