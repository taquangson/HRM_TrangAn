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
    public class NhanVien_ToNhomDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_ToNhomDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_ToNhomDAO()
        {
            helper = new DataHelper();
        }

        private NhanVien_ToNhomModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_ToNhomModel obj = new NhanVien_ToNhomModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ToNhom_Delete", pars);
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
                log.Error("sp_NhanVien_ToNhom_Delete " + ex.Message);
                return false;
            }
        }


        public List<NhanVien_ToNhomModel> GetAllByToNhom(int ID_ToNhom)
        {
            List<NhanVien_ToNhomModel> result = new List<NhanVien_ToNhomModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ToNhom_GetAllNhanVienTrongToNhom",pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ToNhom_GetAllNhanVienTrongToNhom " + ex.Message);
                return result;
            }
        }

        public int Insert(NhanVien_ToNhomModel model, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_ToNhom", ID_ToNhom),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@IsToTruong", model.IsToTruong),
                new SqlParameter("@IsToPho", model.IsToPho),
                //new SqlParameter("@TrangThai", model.TrangThai),
                //new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_ToNhom_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ToNhom_Insert " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByIDToNhom(int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ToNhom",ID_ToNhom ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ToNhom_DeleteByIDToNhom", pars);
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
                log.Error("sp_NhanVien_ToNhom_DeleteByIDToNhom " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDToNhom(string ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ToNhom",ID_ToNhom ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ToNhom_DeleteMultiByIDToNhom", pars);
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
                log.Error("sp_NhanVien_ToNhom_DeleteMultiByIDToNhom " + ex.Message);
                return false;
            }
        }
    }
}