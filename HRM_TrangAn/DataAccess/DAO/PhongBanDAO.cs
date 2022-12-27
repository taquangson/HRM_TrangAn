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
    public class PhongBanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhongBanDAO));
        private DataHelper helper;
        public PhongBanDAO()
        {
            helper = new DataHelper();
        }

        private PhongBanModel GetObjFromDataRow(DataRow dr)
        {
            PhongBanModel obj = new PhongBanModel();
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

        public List<PhongBanModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_PhongBan_GetAll");
                DataTable dt = ds.Tables[0];
                List<PhongBanModel> result = new List<PhongBanModel>();
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


        public List<PhongBanModel> GetByChiNhanh(int ChiNhanh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChiNhanh", ChiNhanh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhongBan_GetByChiNhanh", pars);
                DataTable dt = ds.Tables[0];
                List<PhongBanModel> result = new List<PhongBanModel>();
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


        public PhongBanModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhongBan_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<PhongBanModel> result = new List<PhongBanModel>();
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

        public int InsertOrUpdate(PhongBanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenPhongBan", model.TenPhongBan),
                new SqlParameter("@ID_PhongBanCha", model.ID_PhongBanCha),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh)
                };

                object id = helper.ExecuteScalar("sp_PhongBan_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBan_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_PhongBan_Delete", pars);
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
                log.Error("sp_PhongBan_Delete " + ex.Message);
                return false;
            }
        }

        public bool ThemTaiKhoanVaoPhongBan(int ID_TaiKhoan, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                int id = helper.ExecuteNonQuery("sp_PhongBanTaiKhoan_Insert", pars);
                if (id > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBanTaiKhoan_Insert " + ex.Message);
            }

            return false;
        }
        public bool XoaTaiKhoanKhoiPhongBan(int ID_TaiKhoan, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                int id = helper.ExecuteNonQuery("sp_PhongBanTaiKhoan_Delete", pars);
                if (id > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBanTaiKhoan_Delete " + ex.Message);
            }

            return false;
        }
    }
}