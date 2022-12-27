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
    public class RatingLaiDoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(RatingLaiDoDAO));
        private DataHelper helper;
        public RatingLaiDoDAO()
        {
            helper = new DataHelper();
        }

        private RatingLaiDoModel GetObjFromDataRow(DataRow dr)
        {
            RatingLaiDoModel obj = new RatingLaiDoModel();
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

        public List<RatingLaiDoModel> RatingLaiDo_GetByLaiDo(int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };
                DataSet ds = helper.ExecuteDataSet("sp_RatingLaiDo_GetByLaiDo", pars);
                DataTable dt = ds.Tables[0];
                List<RatingLaiDoModel> result = new List<RatingLaiDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_RatingLaiDo_GetByLaiDo " + ex.Message);
                return null;
            }
        }

        public int Insert(RatingLaiDoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@MaNhanVien", model.MaNhanVien),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@Rate", model.Rate),
                new SqlParameter("@KhachHang", model.KhachHang),
                new SqlParameter("@GhiChu", model.GhiChu)
                };

                object id = helper.ExecuteScalar("sp_RatingLaiDo_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_RatingLaiDo_Insert " + ex.Message);
            }

            return 0;
        }

        public int UpdateTrangThai(int ID, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                new SqlParameter("@TrangThai", TrangThai)
                };

                object id = helper.ExecuteScalar("sp_RatingLaiDo_UpdateTrangThai", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_RatingLaiDo_UpdateTrangThai " + ex.Message);
            }

            return 0;
        }
    }
}