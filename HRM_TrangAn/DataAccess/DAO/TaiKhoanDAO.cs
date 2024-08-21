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
    public class TaiKhoanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public TaiKhoanDAO()
        {
            helper = new DataHelper();
        }
        private TaiKhoanModel GetObjFromDataRow(DataRow dr)
        {
            TaiKhoanModel obj = new TaiKhoanModel();
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
        private UserAppModel GetAppObjFromDataRow(DataRow dr)
        {
            UserAppModel obj = new UserAppModel();
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


        private ChiNhanhModels GetChiNhanhFromDataRow(DataRow dr)
        {
            ChiNhanhModels obj = new ChiNhanhModels();
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

        public List<TaiKhoanModel> GetAll()
        {
            List<TaiKhoanModel> result = new List<TaiKhoanModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    TaiKhoanModel t = GetObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetAll " + ex.Message);
            }

            return result;
        }

        public List<TaiKhoanModel> GetAllByChiNhanh(int ID_ChiNhanh)
        {
            List<TaiKhoanModel> result = new List<TaiKhoanModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetAllByChiNhanh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    TaiKhoanModel t = GetObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetAll " + ex.Message);
            }

            return result;
        }

        public List<TaiKhoanModel> GetAllByPhongBan(int ID_PhongBan)
        {
            List<TaiKhoanModel> result = new List<TaiKhoanModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetAllByPhongBan", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    TaiKhoanModel t = GetObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetAllByPhongBan " + ex.Message);
            }

            return result;
        }

        public List<TaiKhoanModel> GetAllNgoaiPhongBan(int ID_PhongBan)
        {
            List<TaiKhoanModel> result = new List<TaiKhoanModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetAllNgoaiPhongBan", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    TaiKhoanModel t = GetObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetAllNgoaiPhongBan " + ex.Message);
            }

            return result;
        }

        public List<ChiNhanhModels> GetDsChiNhanh()
        {
            List<ChiNhanhModels> result = new List<ChiNhanhModels>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChiNhanh_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    ChiNhanhModels t = GetChiNhanhFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiNhanh_GetAll " + ex.Message);
            }

            return result;
        }

        public bool CheckLogin(string TenTaiKhoan, string MatKhau)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Email", TenTaiKhoan),
                new SqlParameter("@TaiKhoan", TenTaiKhoan),
                new SqlParameter("@MatKhau", MatKhau)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetByTaiKhoanEmail", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
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
                log.Error("sp_TaiKhoan_GetByTaiKhoanEmail " + ex.Message);
            }

            return false;
        }


        public bool CheckLogin_App(string UserName, string Password, string Current_Imei, string Current_Device, string NotifyID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@UserName", UserName),
                new SqlParameter("@Password", Password),
                new SqlParameter("@Current_Imei", Current_Imei),
                new SqlParameter("@Current_Device", Current_Device),
                new SqlParameter("@NotifyID", NotifyID)
                };
                object id = helper.ExecuteScalar("sp_TaiKhoan_CheckLoginApp", pars);
                if (id != null)
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
                log.Error("sp_TaiKhoan_CheckLoginApp " + ex.Message);
            }
            return false;
        }

        public bool CheckLogin_AppForChangePass(string UserName, string Password)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@UserName", UserName),
                new SqlParameter("@Password", Password)
                };
                object id = helper.ExecuteScalar("sp_TaiKhoan_CheckLoginAppForChangePass", pars);
                if (id != null)
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
                log.Error("sp_TaiKhoan_CheckLoginAppForChangePass " + ex.Message);
            }
            return false;
        }



        public TaiKhoanModel GetByTenTaiKhoanOrEmail(string TenTaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@TaiKhoan", TenTaiKhoan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetByTenTaiKhoanOrEmail", pars);
                DataTable dt = ds.Tables[0];
                TaiKhoanModel t = GetObjFromDataRow(dt.Rows[0]);
                return t;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetByTenTaiKhoanOrEmail " + ex.Message);
            }

            return new TaiKhoanModel();
        }
        public UserAppModel GetAppUserInfoByName(string TenTaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@TaiKhoan", TenTaiKhoan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoanApp_GetByUserName", pars);
                DataTable dt = ds.Tables[0];
                UserAppModel t = GetAppObjFromDataRow(dt.Rows[0]);
                t.lstHocSinh = new HocSinhDAO().GetAllBySDT(TenTaiKhoan);
                return t;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_GetByUserName " + ex.Message);
            }

            return null;
        }

        public UserAppModel GetAppUserByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoanApp_GetByID", pars);
                DataTable dt = ds.Tables[0];
                UserAppModel t = GetAppObjFromDataRow(dt.Rows[0]);
                return t;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_GetByID " + ex.Message);
            }

            return null;
        }

        public List<UserAppModel> GetAllUserApp()
        {
            List<UserAppModel> result = new List<UserAppModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoanApp_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    UserAppModel t = GetAppObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_GetAll " + ex.Message);
            }

            return result;
        }

        public List<TaiKhoanModel> GetAllNhanVienTrongXuPhatNhanVien(int ID_XuPhat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_XuPhat", ID_XuPhat)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_XuPhat_GetAllNhanVien_TrongXuPhat", pars);
                DataTable dt = ds.Tables[0];
                List<TaiKhoanModel> result = new List<TaiKhoanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TaiKhoanModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_XuPhat_GetAllNhanVien_TrongXuPhat " + ex.Message);
                return null;
            }
        }


        public List<UserAppModel> GetUserOnline_TinNhanMoi()
        {
            List<UserAppModel> result = new List<UserAppModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoanApp_GetUserOnline_TinNhanMoi");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    UserAppModel t = GetAppObjFromDataRow(dr);
                    result.Add(t);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_GetUserOnline_TinNhanMoi " + ex.Message);
            }

            return result;
        }

        public bool ChangeAppUserPassword(string Username, string Password)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@Username", Username),
                new SqlParameter("@Password", Password)
                };
                int ds = helper.ExecuteNonQuery("sp_TaiKhoanApp_GChangeAppUserPassword", pars);
                if (ds > 0)
                    return true;
                else return false;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_GChangeAppUserPassword " + ex.Message);
            }

            return false;
        }


        public TaiKhoanModel GetById(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TaiKhoan_GetById", pars);
                DataTable dt = ds.Tables[0];
                TaiKhoanModel t = GetObjFromDataRow(dt.Rows[0]);
                return t;
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_GetById " + ex.Message);
            }

            return null;
        }

        public int InsertOrUpdate(TaiKhoanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TaiKhoan", model.TaiKhoan),
                new SqlParameter("@MatKhau", model.MatKhau),
                new SqlParameter("@TenDayDu", model.TenDayDu),
                new SqlParameter("@DiaChi", model.DiaChi),
                new SqlParameter("@DienThoai", model.DienThoai),
                new SqlParameter("@Email", model.Email),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_HoSoNhanSu", model.ID_HoSoNhanSu)
                };

                object id = helper.ExecuteScalar("sp_TaiKhoan_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
        public int InsertOrUpdate_AppUser(UserAppModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@UserName", model.UserName),
                new SqlParameter("@Status", model.Status),
                new SqlParameter("@EmployeeType", model.EmployeeType),
                new SqlParameter("@ExpriedTime", model.ExpriedTime)
                };

                object id = helper.ExecuteScalar("sp_TaiKhoanApp_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoanApp_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public int LockOrUnlock(int ID, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                if (TrangThai == 0)
                {
                    object id = helper.ExecuteScalar("sp_TaiKhoan_KhoaTaiKhoan");
                    if (id != null)
                    {
                        return int.Parse(id.ToString());
                    }
                }
                else if (TrangThai == 1)
                {
                    object id = helper.ExecuteScalar("sp_TaiKhoan_MoKhoaTaiKhoan");
                    if (id != null)
                    {
                        return int.Parse(id.ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_MoKhoaTaiKhoan " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                int rowaff = helper.ExecuteNonQuery("sp_TaiKhoan_Delete", pars);
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
                log.Error("sp_TaiKhoan_Delete " + ex.Message);
                return false;
            }

        }

        public int GetQuyen(int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };
                object id = helper.ExecuteScalar("sp_PhanQuyenTaiKhoan_GetByIdTaiKhoan", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public bool ThemQuyen(int ID_Quyen, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Quyen", ID_Quyen),
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };
                object id = helper.ExecuteScalar("sp_PhanQuyenTaiKhoan_InsertOrUpdate", pars);
                if (id != null)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhanQuyenTaiKhoan_InsertOrUpdate " + ex.Message);
                return false;
            }

            return false;
        }

        public bool XoaQuyen(int ID_Quyen, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Quyen", ID_Quyen),
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };
                object id = helper.ExecuteScalar("sp_PhanQuyenTaiKhoan_Delete");
                if (id != null)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhanQuyenTaiKhoan_Delete " + ex.Message);
                return false;
            }

            return false;
        }

        public bool UpdateToken(int ID, string Token)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                new SqlParameter("@FirebaseToken", Token),
                };

                int rowaff = helper.ExecuteNonQuery("sp_TaiKhoan_UpdateToken", pars);
                if (rowaff > 0)
                {
                    return true;
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_UpdateToken " + ex.Message);
            }

            return false;
        }

    }
}