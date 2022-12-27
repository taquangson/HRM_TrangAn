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
    public class DangKyHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DangKyHocDAO));
        private DataHelper helper;
        public DangKyHocDAO()
        {
            helper = new DataHelper();
        }

        private DangKyHocModel GetObjFromDataRow(DataRow dr)
        {
            DangKyHocModel obj = new DangKyHocModel();
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
        public List<DangKyHocModel> GetByHocSinh(int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyHocModel> result = new List<DangKyHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyHocModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<DangKyHocModel> GetAll(int ID_ChiNhanh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyHoc_GetAll", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyHocModel> result = new List<DangKyHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyHocModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public DangKyHocModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyHoc_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyHocModel> result = new List<DangKyHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyHocModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(DangKyHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@User_DangKy", model.User_DangKy),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_DangKyHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyHoc_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DangKyHoc_Delete", pars);
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
                log.Error("sp_DangKyHoc_Delete " + ex.Message);
                return false;
            }
        }
    }
}