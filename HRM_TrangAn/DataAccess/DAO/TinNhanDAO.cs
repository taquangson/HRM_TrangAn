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
    public class TinNhanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public TinNhanDAO()
        {
            helper = new DataHelper();
        }

        private TinNhanModel GetObjFromDataRow(DataRow dr)
        {
            TinNhanModel obj = new TinNhanModel();
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
        public List<TinNhanModel> GetByUser(string ID_User)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_User", ID_User),
                };
                DataSet ds = helper.ExecuteDataSet("sp_TinNhan_GetByUser", pars);
                DataTable dt = ds.Tables[0];
                List<TinNhanModel> result = new List<TinNhanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TinNhanModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<TinNhanModel> GetAll(int ID_ChiNhanh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TinNhan_GetAll", pars);
                DataTable dt = ds.Tables[0];
                List<TinNhanModel> result = new List<TinNhanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TinNhanModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public TinNhanModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_TinNhan_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<TinNhanModel> result = new List<TinNhanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TinNhanModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(TinNhanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@ID_User", model.ID_User),
                new SqlParameter("@Loai", model.Loai),
                new SqlParameter("@DaTraLoi", model.DaTraLoi),
                new SqlParameter("@NoiDung", model.NoiDung),
                new SqlParameter("@DaXem", model.DaXem),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@Session", model.Session)
                };

                object id = helper.ExecuteScalar("sp_TinNhan_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TinNhan_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool UpdateDaXem(string ID_User)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_User",ID_User ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TinNhan_UpdateDaXem", pars);
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
                log.Error("sp_TinNhan_UpdateDaXem " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_TinNhan_Delete", pars);
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
                log.Error("sp_TinNhan_Delete " + ex.Message);
                return false;
            }
        }
    }
}