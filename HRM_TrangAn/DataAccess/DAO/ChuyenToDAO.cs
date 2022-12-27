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
    public class ChuyenToDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChuyenToDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ChuyenToDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ChuyenToModel GetObjFromDataRow(DataRow dr)
        {
            ChuyenToModel obj = new ChuyenToModel();
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

        public List<ChuyenToModel> GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenTo_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChuyenToModel> result = new List<ChuyenToModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenToModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChuyenToModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongChuyenTo(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenTo_GetAll " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenTo_DeleteMulti", pars);
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
                log.Error("sp_ChuyenTo_DeleteMulti " + ex.Message);
                return false;
            }
        }


        public int InsertOrUpdate(ChuyenToModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                    new SqlParameter("@TenNhanVien", model.TenNhanVien),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@MaToNhom", model.MaToNhom),
                    new SqlParameter("@TenToNhom", model.TenToNhom),
                    new SqlParameter("@MaThuyen", model.MaThuyen),
                    new SqlParameter("@Cong", model.Cong),

                };

                object id = helper.ExecuteScalar("sp_ChuyenTo_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenTo_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
    }
}