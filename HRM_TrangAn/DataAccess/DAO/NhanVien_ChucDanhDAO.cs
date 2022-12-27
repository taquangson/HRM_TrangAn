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
    public class NhanVien_ChucDanhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_ChucDanhDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_ChucDanhDAO()
        {
            helper = new DataHelper();
        }

        private NhanVien_ChucDanhModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_ChucDanhModel obj = new NhanVien_ChucDanhModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ChucDanh_Delete", pars);
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
                log.Error("sp_NhanVien_ChucDanh_Delete " + ex.Message);
                return false;
            }
        }


        public List<NhanVien_ChucDanhModel> GetAllByNhanVien(int ID_NhanVien)
        {
            List<NhanVien_ChucDanhModel> result = new List<NhanVien_ChucDanhModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ChucDanh_GetAllChucDanhNhanVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_ChucDanhModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ChucDanh_GetAllChucDanhNhanVien " + ex.Message);
                return result;
            }
        }

        public int Insert(int ID_NhanVien, int ID_ChucDanh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChucDanh", ID_ChucDanh),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_ChucDanh_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ChucDanh_Insert " + ex.Message);
            }

            return 0;
        }

        

        public bool DeleteMultiByIDNhanVien(string ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ChucDanh_DeleteMultiByIDNhanVien", pars);
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
                log.Error("sp_NhanVien_ChucDanh_DeleteMultiByIDNhanVien " + ex.Message);
                return false;
            }
        }
    }
}