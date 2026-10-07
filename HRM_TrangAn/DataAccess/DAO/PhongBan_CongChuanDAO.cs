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
    public class PhongBan_CongChuanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhongBan_CongChuanDAO));
        private DataHelper helper;

        public PhongBan_CongChuanDAO()
        {
            helper = new DataHelper();
        }

        private PhongBan_CongChuanModel GetObjFromDataRow(DataRow dr)
        {
            PhongBan_CongChuanModel obj = new PhongBan_CongChuanModel();
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

        public List<PhongBan_CongChuanModel> GetByPhongBan(int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_PhongBan", ID_PhongBan),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhongBanCongChuan_GetByPhongBan", pars);
                DataTable dt = ds.Tables[0];
                List<PhongBan_CongChuanModel> result = new List<PhongBan_CongChuanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBanCongChuan_GetByPhongBan " + ex.Message);
                return null;
            }
        }

        public List<PhongBan_CongChuanModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_PhongBan_CongChuan_GetAll");
                DataTable dt = ds.Tables[0];
                List<PhongBan_CongChuanModel> result = new List<PhongBan_CongChuanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBan_CongChuan_GetAll " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(PhongBan_CongChuanModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_PhongBan", model.ID_PhongBan),
                    new SqlParameter("@CongChuan", model.CongChuan),
                    new SqlParameter("@CongChuanTheoThang", model.CongChuanTheoThang),
                    new SqlParameter("@TrangThai", model.TrangThai),
                    new SqlParameter("@NgayTao", model.NgayTao)
                };

                object id = helper.ExecuteScalar("sp_PhongBanCongChuan_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBanCongChuan_Insert " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_PhongBan", ID_PhongBan),
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhongBanCongChuan_Delete", pars);
                return rowaff > 0;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhongBanCongChuan_Delete " + ex.Message);
                return false;
            }
        }
    }
}
