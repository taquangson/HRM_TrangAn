using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;


namespace HRM_TrangAn.DataAccess.DAO
{
    public class DoanhSo_LuongKhachDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DoanhSo_LuongKhachDAO()
        {
            helper = new DataHelper();
        }

        private DoanhSo_LuongKhachModel GetObjFromDataRow(DataRow dr)
        {
            DoanhSo_LuongKhachModel obj = new DoanhSo_LuongKhachModel();
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

        public List<DoanhSo_LuongKhachModel> GetAll()
        {
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_DoanhSo_LuongKhach_GetAll");
                DataTable dt = ds.Tables[0];
                List<DoanhSo_LuongKhachModel> result = new List<DoanhSo_LuongKhachModel>();
                //File_HoSoNhanSuDAO fdao = new File_HoSoNhanSuDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    DoanhSo_LuongKhachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành HoSoNhanSuModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DoanhSo_LuongKhach_GetAll " + ex.Message);
                return null;
            }
        }

        public List<DoanhSo_LuongKhachModel> GetByDateRange(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
             new SqlParameter("@TuNgay", from),
             new SqlParameter("@DenNgay", to)
         };

                DataSet ds = helper.ExecuteDataSet("sp_DoanhSo_LuongKhach_GetByDateRange", pars);
                DataTable dt = ds.Tables[0];
                List<DoanhSo_LuongKhachModel> result = new List<DoanhSo_LuongKhachModel>();
                //File_NhanVienDAO fdao = new File_NhanVienDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    DoanhSo_LuongKhachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DoanhSo_LuongKhach_GetByDateRange " + ex.Message);
                return null;
            }
        }


        public bool InsertOrUpdate(DoanhSo_LuongKhachModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@DoanhSo", model.DoanhSo),
                new SqlParameter("@LuongKhach", model.LuongKhach),
                 new SqlParameter("@TuNgay", ((model.TuNgay.Year == 1 || model.TuNgay == null) ? (object)DBNull.Value : model.TuNgay)),
                    new SqlParameter("@DenNgay", ((model.DenNgay.Year == 1 || model.DenNgay == null) ? (object)DBNull.Value : model.DenNgay)),
                };

                int rowaff = helper.ExecuteNonQuery("sp_DoanhSo_LuongKhach_InsertOrUpdate", pars);
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
                log.Error("sp_DoanhSo_LuongKhach_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DoanhSo_LuongKhach_DeleteMulti", pars);
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
                log.Error("sp_DoanhSo_LuongKhach_DeleteMulti " + ex.Message);
                return false;
            }
        }
    }
}