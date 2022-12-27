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
    public class NghiPhepDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NghiPhepDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NghiPhepDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private NghiPhepModel GetObjFromDataRow(DataRow dr)
        {
            NghiPhepModel obj = new NghiPhepModel();
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

        public List<NghiPhepModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_NghiPhep_GetAll");
                DataTable dt = ds.Tables[0];
                List<NghiPhepModel> result = new List<NghiPhepModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NghiPhepModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NghiPhepModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NghiPhep_GetAll " + ex.Message);
                return null;
            }
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NghiPhep_DeleteMulti", pars);
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
                log.Error("sp_NghiPhep_DeleteMulti " + ex.Message);
                return false;
            }
        }


        public int InsertOrUpdate(NghiPhepModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                    new SqlParameter("@TenNhanVien", model.TenNhanVien),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@MaToNhom", model.MaToNhom),
                    new SqlParameter("@MaThuyen", model.MaThuyen),
                    new SqlParameter("@Loai", model.Loai),
                    new SqlParameter("@NgayNghi",((model.NgayNghi.Year == 1 || model.NgayNghi == null) ? (object)DBNull.Value : model.NgayNghi)),

                };

                object id = helper.ExecuteScalar("sp_NghiPhep_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NghiPhep_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
    }
}