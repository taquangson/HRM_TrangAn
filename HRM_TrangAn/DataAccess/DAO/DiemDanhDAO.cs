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
    public class DiemDanhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DiemDanhDAO()
        {
            helper = new DataHelper();
        }

        private DiemDanhModel GetObjFromDataRow(DataRow dr)
        {
            DiemDanhModel obj = new DiemDanhModel();
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

        public DiemDanhModel GetByHocSinh_Ngay(int ID_Lop, int ID_HocSinh, DateTime Ngay, int Ca)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@Ngay", Ngay),
                new SqlParameter("@Ca", Ca)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DiemDanh_GetByHocSinh_Ngay", pars);
                DataTable dt = ds.Tables[0];
                DiemDanhModel result = new DiemDanhModel();
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
                return result;
            }
            catch (Exception ex)
            {
                return new DiemDanhModel();
            }
        }

        public DiemDanhModel GetById(long ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DiemDanh_GetByID", pars);
                DataTable dt = ds.Tables[0];
                DiemDanhModel result = new DiemDanhModel();
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
                return result;
            }
            catch (Exception ex)
            {
                return new DiemDanhModel();
            }
        }

        public DiemDanhModel GetByHocSinh_NgayGio(int ID_Lop, int ID_HocSinh, DateTime BatDau, DateTime KetThuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@BatDau", BatDau),
                new SqlParameter("@KetThuc", KetThuc)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DiemDanh_GetByHocSinh_NgayGio", pars);
                DataTable dt = ds.Tables[0];
                DiemDanhModel result = new DiemDanhModel();
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
                return result;
            }
            catch (Exception ex)
            {
                return new DiemDanhModel();
            }
        }

        public long InsertOrUpdate(DiemDanhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@Ca", model.Ca),
                new SqlParameter("@CoPhep", model.CoPhep),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@HocDuoi", model.HocDuoi),
                new SqlParameter("@YeuCauTraoDoi", model.YeuCauTraoDoi),
                new SqlParameter("@ThoiGianVaoLop", model.ThoiGianVaoLop != null ? model.ThoiGianVaoLop : DateTime.Now)
                };

                object result = helper.ExecuteScalar("sp_DiemDanh_InsertOrUpdate", pars);
                if (result != null)
                {
                    return long.Parse(result.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemDanh_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(long ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DiemDanh_Delete", pars);
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
                log.Error("sp_DiemDanh_Delete " + ex.Message);
                return false;
            }
        }
    }
}