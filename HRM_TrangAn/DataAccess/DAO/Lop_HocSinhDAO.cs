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

    public class Lop_HocSinhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(Lop_HocSinhDAO));
        private DataHelper helper;
        public Lop_HocSinhDAO()
        {
            helper = new DataHelper();
        }

        private Lop_HocSinhModel GetObjFromDataRow(DataRow dr)
        {
            Lop_HocSinhModel obj = new Lop_HocSinhModel();
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

        public int InsertOrUpdate(Lop_HocSinhModel model)
        {
            try
            {
                log.Info("Insert HocSinh_LopHoc: ID_HocSinh=" + model.ID_HocSinh + " - ID_Lop=" + model.ID_Lop);
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_Lop", model.ID_Lop),
                    new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                    new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_LopHocSinh_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHocSinh_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_LopHocSinh_Delete", pars);
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
                log.Error("sp_LopHocSinh_Delete " + ex.Message);
                return false;
            }
        }

        public bool DeleteByLop_HocSinh(int ID_Lop, int ID_HocSinh)
        {
            try
            {
                log.Info("Delete HocSinh_LopHoc: ID_HocSinh=" + ID_HocSinh + " - ID_Lop=" + ID_Lop);
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop ),
                    new SqlParameter("@ID_HocSinh",ID_HocSinh )
                };
                int rowaff = helper.ExecuteNonQuery("sp_LopHocSinh_DeleteByLop_HocSinh", pars);
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
                log.Error("sp_LopHocSinh_DeleteByLop_HocSinh " + ex.Message);
                return false;
            }
        }


        public bool ResetLop(int ID)
        {
            try
            {
                log.Info("ResetLop: ID=" + ID);
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_LopHocSinh_ResetLop", pars);
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
                log.Error("sp_LopHocSinh_ResetLop " + ex.Message);
                return false;
            }
        }
    }
}