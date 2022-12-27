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
    public class NhanVien_ChuyenToDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_ChuyenToDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_ChuyenToDAO()
        {
            helper = new DataHelper();
        }

        private NhanVien_ChuyenToModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_ChuyenToModel obj = new NhanVien_ChuyenToModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ChuyenTo_Delete", pars);
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
                log.Error("sp_NhanVien_ChuyenTo_Delete " + ex.Message);
                return false;
            }
        }


        public List<NhanVien_ChuyenToModel> GetAllByChuyenTo(int ID_ChuyenTo)
        {
            List<NhanVien_ChuyenToModel> result = new List<NhanVien_ChuyenToModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChuyenTo", ID_ChuyenTo)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ChuyenTo_GetAllNhanVienTrongChuyenTo",pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_ChuyenToModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChuyenToModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ChuyenTo_GetAllNhanVienTrongChuyenTo " + ex.Message);
                return result;
            }
        }

        public int Insert(int ID_NhanVien, int ID_ChuyenTo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_ChuyenTo", ID_ChuyenTo),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                //new SqlParameter("@TrangThai", model.TrangThai)
                //new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_ChuyenTo_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ChuyenTo_Insert " + ex.Message);
            }

            return 0;
        }

        

        public bool DeleteMultiByIDChuyenTo(string ID_ChuyenTo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChuyenTo",ID_ChuyenTo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_ChuyenTo_DeleteMultiByIDChuyenTo", pars);
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
                log.Error("sp_NhanVien_ChuyenTo_DeleteMultiByIDChuyenTo " + ex.Message);
                return false;
            }
        }
    }
}