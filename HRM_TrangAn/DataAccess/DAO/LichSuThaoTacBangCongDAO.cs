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
    public class LichSuThaoTacBangCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LichSuThaoTacBangCongDAO));
        private DataHelper helper;
        public LichSuThaoTacBangCongDAO()
        {
            helper = new DataHelper();
        }

        private LichSuThaoTacBangCongModel GetObjFromDataRow(DataRow dr)
        {
            LichSuThaoTacBangCongModel obj = new LichSuThaoTacBangCongModel();
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

        public LichSuThaoTacBangCongModel GetLichSu(int ID_TaiKhoan, int Thang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Nam", Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThaoTacBangCong_GetLichSu", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuThaoTacBangCongModel> result = new List<LichSuThaoTacBangCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichSuThaoTacBangCongModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThaoTacBangCong_GetLichSu " + ex.Message);
                return null;
            }
        }

        public bool InsertOrUpdate(LichSuThaoTacBangCongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@Nam", model.Nam),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@ThoiGianGuiMail", ((model.ThoiGianGuiMail.Year == 1 || model.ThoiGianGuiMail == null) ? (object)DBNull.Value : model.ThoiGianGuiMail)),
                new SqlParameter("@ThoiGianXemBangCong", ((model.ThoiGianXemBangCong.Year == 1 || model.ThoiGianXemBangCong == null) ? (object)DBNull.Value : model.ThoiGianXemBangCong)),
                new SqlParameter("@ThoiGianChotBangCong", ((model.ThoiGianChotBangCong.Year == 1 || model.ThoiGianChotBangCong == null) ? (object)DBNull.Value : model.ThoiGianChotBangCong)),
                new SqlParameter("@KeyEvent", model.KeyEvent)
                };

            int rowaff = helper.ExecuteNonQuery("sp_LichSuThaoTacBangCong_InsertOrUpdate", pars);
            if (rowaff > 0)
            {
                return true;
            }
        }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThaoTacBangCong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

    }
}