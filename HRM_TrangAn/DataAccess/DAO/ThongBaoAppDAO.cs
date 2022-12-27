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
    public class ThongBaoAppDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public ThongBaoAppDAO()
        {
            helper = new DataHelper();
        }

        private ThongBaoAppModel GetObjFromDataRow(DataRow dr)
        {
            ThongBaoAppModel obj = new ThongBaoAppModel();
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
        public List<ThongBaoAppModel> GetByUser(string Username, string ThongBao)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_User", Username),
                new SqlParameter("@ThongBao", ThongBao),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ThongBaoApp_GetByUser", pars);
                DataTable dt = ds.Tables[0];
                List<ThongBaoAppModel> result = new List<ThongBaoAppModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThongBaoAppModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_GetByUser " + ex.Message);
                return null;
            }
        }
        public int CountUnReadByUser(string UserName)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_User", UserName)
                };
                object count = helper.ExecuteScalar("sp_ThongBaoApp_CountUnReadByUser", pars);
                if(count != null)
                return int.Parse(count.ToString());
                return 0;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_CountUnReadByUser " + ex.Message);
                return 0;
            }
        }
        public List<ThongBaoAppModel> GetByLop(int ID_Lop)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ThongBaoApp_GetByLop", pars);
                DataTable dt = ds.Tables[0];
                List<ThongBaoAppModel> result = new List<ThongBaoAppModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThongBaoAppModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_GetByLop " + ex.Message);
                return null;
            }
        }

        public List<ThongBaoAppModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ThongBaoApp_GetAll");
                DataTable dt = ds.Tables[0];
                List<ThongBaoAppModel> result = new List<ThongBaoAppModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThongBaoAppModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_GetAll " + ex.Message);
                return null;
            }
        }

        public ThongBaoAppModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ThongBaoApp_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<ThongBaoAppModel> result = new List<ThongBaoAppModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThongBaoAppModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_InsertOrUpdate " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(ThongBaoAppModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TieuDe", model.TieuDe),
                new SqlParameter("@NoiDung", model.NoiDung),
                new SqlParameter("@Loai", model.Loai),
                new SqlParameter("@NoiDungHtml", model.NoiDungHtml),
                new SqlParameter("@AnhDaiDien", model.AnhDaiDien),
                new SqlParameter("@Data", model.Data),
                new SqlParameter("@NoiDungRieng", model.NoiDungRieng),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_ThongBaoApp_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongBaoApp_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int GhiLichSu(LichSuThongBaoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ThongBao", model.ID_ThongBao),
                new SqlParameter("@UserName", model.UserName),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@NoiDungRieng", model.NoiDungRieng)
                };

                object id = helper.ExecuteScalar("sp_LichSuThongBao_Insert", pars);
                
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThongBao_Insert " + ex.Message);
            }

            return 0;
        }
    }
}