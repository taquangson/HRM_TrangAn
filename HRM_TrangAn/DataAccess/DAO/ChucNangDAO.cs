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
    public class ChucNangDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChucNangDAO));
        private DataHelper helper;
        public ChucNangDAO()
        {
            helper = new DataHelper();
        }

        private ChucNangModel GetObjFromDataRow(DataRow dr)
        {
            ChucNangModel obj = new ChucNangModel();
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

        public List<ChucNangModel> GetChucNangByTaiKhoan(int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAllChucNangByTaiKhoan", pars);
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public List<ChucNangModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public List<ChucNangModel> GetChucNangTrongPhongBan(int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhongBan", ID_PhongBan),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAllByPhongBan", pars);
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public List<ChucNangModel> GetChucNangNgoaiPhongBan(int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhongBan", ID_PhongBan),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAllNgoaiPhongBan", pars);
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public bool ThemChucNangPhongBan(int ID_ChucNang, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChucNang",ID_ChucNang ),
                    new SqlParameter("@ID_PhongBan",ID_PhongBan )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChucNang_ThemChucNangPhongBan", pars);
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
                log.Error("sp_ChucNang_ThemChucNangPhongBan " + ex.Message);
                return false;
            }
        }

        public bool XoaChucNangPhongBan(int ID_ChucNang, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChucNang",ID_ChucNang ),
                    new SqlParameter("@ID_PhongBan",ID_PhongBan )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChucNang_XoaChucNangPhongBan", pars);
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
                log.Error("sp_ChucNang_XoaChucNangPhongBan " + ex.Message);
                return false;
            }
        }

        public List<ChucNangModel> GetChucNangTrongNhanVien(int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAllByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public List<ChucNangModel> GetChucNangNgoaiNhanVien(int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucNang_GetAllNgoaiNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChucNangModel> result = new List<ChucNangModel>();
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

        public bool ThemChucNangNhanVien(int ID_ChucNang, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChucNang",ID_ChucNang ),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChucNang_ThemChucNangNhanVien", pars);
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
                log.Error("sp_ChucNang_ThemChucNangNhanVien " + ex.Message);
                return false;
            }
        }

        public bool XoaChucNangNhanVien(int ID_ChucNang, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChucNang",ID_ChucNang ),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChucNang_XoaChucNangNhanVien", pars);
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
                log.Error("sp_ChucNang_XoaChucNangNhanVien " + ex.Message);
                return false;
            }
        }
    }
}