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
    public class LichSuThongBaoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public LichSuThongBaoDAO()
        {
            helper = new DataHelper();
        }

        private LichSuThongBaoModel GetObjFromDataRow(DataRow dr)
        {
            LichSuThongBaoModel obj = new LichSuThongBaoModel();
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

        public int Insert(LichSuThongBaoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ThongBao", model.ID_ThongBao),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@UserName", model.UserName)               
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