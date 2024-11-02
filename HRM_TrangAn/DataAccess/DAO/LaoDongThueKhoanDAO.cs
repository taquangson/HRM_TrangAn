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
    public class LaoDongThueKhoanDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LaoDongThueKhoanDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public LaoDongThueKhoanDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private LaoDongThueKhoanModel GetObjFromDataRow(DataRow dr)
        {
            LaoDongThueKhoanModel obj = new LaoDongThueKhoanModel();
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

        public List<LaoDongThueKhoanModel> GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_LaoDongThueKhoan_GetAll");
                DataTable dt = ds.Tables[0];
                List<LaoDongThueKhoanModel> result = new List<LaoDongThueKhoanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LaoDongThueKhoanModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành LaoDongThueKhoanModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LaoDongThueKhoan_GetAll " + ex.Message);
                return null;
            }
        }

        public List<LaoDongThueKhoanModel> GetByNhanVien_Ngay(int ID_NhanVien, DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                    new SqlParameter("@Ngay",Ngay )
                };
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_LaoDongThueKhoan_GetByNhanVien_Ngay", pars);
                DataTable dt = ds.Tables[0];
                List<LaoDongThueKhoanModel> result = new List<LaoDongThueKhoanModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LaoDongThueKhoanModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành LaoDongThueKhoanModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LaoDongThueKhoan_GetByNhanVien_Ngay " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_LaoDongThueKhoan_DeleteMulti", pars);
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
                log.Error("sp_LaoDongThueKhoan_DeleteMulti " + ex.Message);
                return false;
            }
        }
        public int InsertOrUpdate(LaoDongThueKhoanModel model, int idnv)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ThanhTien", model.ThanhTien),
                    new SqlParameter("@ID_CongViec", model.ID_CongViec),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayApDung", model.NgayApDung),
                    new SqlParameter("@ID_NhanVien", idnv),

                };

                object id = helper.ExecuteScalar("sp_LaoDongThueKhoan_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LaoDongThueKhoan_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(LaoDongThueKhoanModel model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (int idnv in model.lstNhanVienPhatSinh)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ThanhTien", model.ThanhTien),
                        new SqlParameter("@ID_CongViec", model.ID_CongViec),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@NgayApDung", model.NgayApDung),
                        new SqlParameter("@ID_NhanVien", idnv),

                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_LaoDongThueKhoan_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;

            }
            catch (Exception ex)
            {
                log.Error("sp_LaoDongThueKhoan_InsertOrUpdate " + ex.Message);
            }

            return false;
        }


    }
}