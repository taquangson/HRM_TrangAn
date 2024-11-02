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
    public class KeHoach_FileDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(KeHoach_FileDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public KeHoach_FileDAO()
        {
            helper = new DataHelper();
        }

        private KeHoach_FileModel GetObjFromDataRow(DataRow dr)
        {
            KeHoach_FileModel obj = new KeHoach_FileModel();
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
        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_KeHoach_File_Delete", pars);
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
                log.Error("sp_KeHoach_File_Delete " + ex.Message);
                return false;
            }
        }


        public List<KeHoach_FileModel> GetAllByKeHoach(int ID_KeHoach)
        {
            List<KeHoach_FileModel> result = new List<KeHoach_FileModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_KeHoach", ID_KeHoach)
                };
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_File_GetAll", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    KeHoach_FileModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_File_GetAll " + ex.Message);
                return result;
            }
        }

        public int Insert(int ID_KeHoach, KeHoach_FileModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@FileName", model.FileName),
                new SqlParameter("@FilePath", model.FilePath),
                 new SqlParameter("@FileType", model.FileType),
                new SqlParameter("@FileStatus", model.FileStatus),
                new SqlParameter("@ID_KeHoach", ID_KeHoach),
                };

                object id = helper.ExecuteScalar("sp_KeHoach_File_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_File_Insert " + ex.Message);
            }

            return 0;
        }       
    }
}