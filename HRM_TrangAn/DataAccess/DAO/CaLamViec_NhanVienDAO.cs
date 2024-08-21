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
    public class CaLamViec_NhanVienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CaLamViecDAO));
        private DataHelper helper;
        public CaLamViec_NhanVienDAO()
        {
            helper = new DataHelper();
        }

        private CaLamViec_NhanVienModel GetObjFromDataRow(DataRow dr)
        {
            CaLamViec_NhanVienModel obj = new CaLamViec_NhanVienModel();
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

        public List<CaLamViec_NhanVienModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetAll");
                DataTable dt = ds.Tables[0];
                List<CaLamViec_NhanVienModel> result = new List<CaLamViec_NhanVienModel>();
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

        public List<CaLamViec_NhanVienModel> GetByDate(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                List<CaLamViec_NhanVienModel> result = new List<CaLamViec_NhanVienModel>();
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


        public List<CaLamViec_NhanVienModel> GetByNhanVienDate(int ID_NhanVien, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetByNhanVienDate", pars);
                DataTable dt = ds.Tables[0];
                List<CaLamViec_NhanVienModel> result = new List<CaLamViec_NhanVienModel>();
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

        public List<CaLamViec_NhanVienModel> sp_CaLamViec_NhanVien_GetByPhongBanDate(int ID_PhongBan, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetByPhongBanDate", pars);
                DataTable dt = ds.Tables[0];
                List<CaLamViec_NhanVienModel> result = new List<CaLamViec_NhanVienModel>();
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

        public DataTable GetDataTreeCaLamViec(DateTime from, DateTime to, int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetDataTree", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public CaLamViec_NhanVienModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_NhanVien_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<CaLamViec_NhanVienModel> result = new List<CaLamViec_NhanVienModel>();
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

        public int InsertOrUpdate(CaLamViec_NhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenCa", model.ID_CaLamViec),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@IsCaDem", model.NgayLamViec),
                new SqlParameter("@BatDau", model.TrangThai),
                new SqlParameter("@CreateBy", model.CreateBy)
                };

                object id = helper.ExecuteScalar("sp_CaLamViec_NhanVien_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CaLamViec_NhanVien_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdateMultiDate(CaLamViecNhanVienViewModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_CaLamViec", model.ID_CaLamViec),
                new SqlParameter("@ID_TaiKhoan", model.ID_NhanVien),
                new SqlParameter("@ID_PhongBan", model.ID_NhomNhanVien),
                new SqlParameter("@BatDau", model.BatDau),
                new SqlParameter("@KetThuc", model.KetThuc),
                new SqlParameter("@CreateBy", model.CreateBy)
                };

                int rowaff = helper.ExecuteNonQuery("sp_CaLamViec_NhanVien_InsertOrUpdateMultiDate", pars);

                return rowaff;

            }
            catch (Exception ex)
            {
                log.Error("sp_CaLamViec_NhanVien_InsertOrUpdateMultiDate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID_TaiKhoan, int ID_PhongBan, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TaiKhoan",ID_TaiKhoan ),
                    new SqlParameter("@ID_PhongBan",ID_PhongBan ),
                    new SqlParameter("@from",from ),
                    new SqlParameter("@to",to ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CaLamViecNhanVien_Delete", pars);
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
                log.Error("sp_CaLamViecNhanVien_Delete " + ex.Message);
                return false;
            }
        }
    }
}