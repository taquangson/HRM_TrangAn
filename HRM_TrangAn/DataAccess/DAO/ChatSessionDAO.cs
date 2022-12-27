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
    public class ChatSessionDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChatSessionDAO));
        private DataHelper helper;
        public ChatSessionDAO()
        {
            helper = new DataHelper();
        }

        private ChatSessionModel GetObjFromDataRow(DataRow dr)
        {
            ChatSessionModel obj = new ChatSessionModel();
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

        public ChatSessionModel GetByTaiKhoan(int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChatSession_GetByTaiKhoan", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    List<ChatSessionModel> result = new List<ChatSessionModel>();
                    foreach (DataRow dr in dt.Rows)
                    {
                        result.Add(GetObjFromDataRow(dr));
                    }
                    return result.FirstOrDefault();
                }
                else
                {
                    return new ChatSessionModel();
                }
            }
            catch (Exception ex)
            {
                return new ChatSessionModel();
            }
        }

        public List<ChatSessionModel> GetAll()
        {
            try
            { 
                DataSet ds = helper.ExecuteDataSet("sp_ChatSession_GetAll");
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    List<ChatSessionModel> result = new List<ChatSessionModel>();
                    foreach (DataRow dr in dt.Rows)
                    {
                        result.Add(GetObjFromDataRow(dr));
                    }
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ChatSessionModel GetBySesion(string Session)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Session", Session),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChatSession_GetBySession", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    List<ChatSessionModel> result = new List<ChatSessionModel>();
                    foreach (DataRow dr in dt.Rows)
                    {
                        result.Add(GetObjFromDataRow(dr));
                    }
                    return result.FirstOrDefault();
                }
                else
                {
                    return new ChatSessionModel();
                }
            }
            catch (Exception ex)
            {
                return new ChatSessionModel();
            }
        }

        public int InsertOrUpdate(ChatSessionModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@Session", model.Session)
                };

                object id = helper.ExecuteScalar("sp_ChatSession_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChatSession_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChatSession_Delete", pars);
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
                log.Error("sp_ChatSession_Delete " + ex.Message);
                return false;
            }
        }
    }
}