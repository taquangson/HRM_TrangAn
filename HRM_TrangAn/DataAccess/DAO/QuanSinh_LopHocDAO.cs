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
    public class QuanSinh_LopHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(QuanSinh_LopHocDAO));
        private DataHelper helper;
        public QuanSinh_LopHocDAO()
        {
            helper = new DataHelper();
        }

        private QuanSinhLopHocModel GetObjFromDataRow(DataRow dr)
        {
            QuanSinhLopHocModel obj = new QuanSinhLopHocModel();
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

        public bool AddQuanSinh_LopHoc(int ID_Lop, int ID_QuanSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_QuanSinh", ID_QuanSinh)
                };

                int rowaff = helper.ExecuteNonQuery("sp_QuanSinhLopHoc_Insert", pars);
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
                log.Error("sp_QuanSinhLopHoc_Insert " + ex.Message);
                return false;
            }
        }

        public bool DeleteQuanSinh_LopHoc(int ID_Lop, string ID_QuanSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_QuanSinh", ID_QuanSinh)
                };

                int rowaff = helper.ExecuteNonQuery("sp_QuanSinhLopHoc_Delete", pars);
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
                log.Error("sp_QuanSinhLopHoc_Insert " + ex.Message);
                return false;
            }
        }


    }
}