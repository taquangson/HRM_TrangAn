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
    public class ChinhSachLuongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public ChinhSachLuongDAO()
        {
            helper = new DataHelper();
        }

        private ChinhSachLuongModel GetObjFromDataRow(DataRow dr)
        {
            ChinhSachLuongModel obj = new ChinhSachLuongModel();
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

        public List<ChinhSachLuongModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetAll " + ex.Message);
                return null;
            }
        }

        public ChinhSachLuongModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetByID " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuongModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Ma", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChinhSachLuongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DanhMucCongViecModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetByMa " + ex.Message);
                return new List<ChinhSachLuongModel>();
            }
        }

        public bool InsertOrUpdate(ChinhSachLuongModel model, string ListID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@Ten", model.Ten),
                    new SqlParameter("@Ma", model.Ma),
                    new SqlParameter("@SoTien", model.SoTien),
                    new SqlParameter("@KyHanThanhToan", model.KyHanThanhToan),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@ListID_NV", ListID_NhanVien),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_InsertOrUpdate", pars);
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
                log.Error("sp_ChinhSachLuong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_DeleteMulti", pars);
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
                log.Error("sp_ChinhSachLuong_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool InsertCSL_NVFromChinhSachLuong(int ID_ChinhSachLuong, string ListID_NhanVien, int ID_NguoiApDung, DateTime? NgayBatDau, DateTime? NgayKetThuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                    new SqlParameter("@ListID_NhanVien", ListID_NhanVien),
                    new SqlParameter("@ID_NguoiApDung", ID_NguoiApDung),
                    new SqlParameter("@GhiChu", ""),
                    new SqlParameter("@NgayBatDau", NgayBatDau),
                    new SqlParameter("@NgayKetThuc", NgayKetThuc),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_InsertFromChinhSachLuong", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_InsertFromChinhSachLuong " + ex.Message);
                return false;
            }
        }

        public bool DeleteCSL_NVFromChinhSachLuong(int ID_ChinhSachLuong, string ListID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                    new SqlParameter("@ListID_NhanVien", ListID_NhanVien),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_DeleteFromChinhSachLuong", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_DeleteFromChinhSachLuong" + ex.Message);
                return false;
            }
        }
    }
}