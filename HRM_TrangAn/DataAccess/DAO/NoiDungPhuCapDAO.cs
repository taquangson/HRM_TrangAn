using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class NoiDungPhuCapDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhuCapDAO));
        private DataHelper helper;
        public NoiDungPhuCapDAO()
        {
            helper = new DataHelper();
        }

        private NoiDungPhuCapModel GetObjFromDataRow(DataRow dr)
        {
            NoiDungPhuCapModel obj = new NoiDungPhuCapModel();
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

        public List<NoiDungPhuCapModel> GetAll()
        {
            try
            {
                List<NoiDungPhuCapModel> result = new List<NoiDungPhuCapModel>();
                DataSet ds = helper.ExecuteDataSet("sp_NoiDungPhuCap_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NoiDungPhuCapModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NoiDungPhuCap_GetAll " + ex.Message);
                return null;
            }
        }

        public bool InsertOrUpdate(NoiDungPhuCapModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@Ten", model.Ten),
                    new SqlParameter("@Ma", model.Ma),
                    new SqlParameter("@Loai", model.Loai),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NguoiTao", model.NguoiTao),
                };

                int rowaff = helper.ExecuteNonQuery("sp_NoiDungPhuCap_InsertOrUpdate", pars);
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
                log.Error("sp_NoiDungPhuCap_InsertOrUpdate " + ex.Message);
                return false;
            }
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@StringID", ID),
                };

                int rowaff = helper.ExecuteNonQuery("sp_NoiDungPhuCap_DeleteMulti", pars);
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
                log.Error("sp_NoiDungPhuCap_DeleteMulti " + ex.Message);
                return false;
            }
        }
    }
}