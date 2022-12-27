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
    public class PhatSinhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhatSinhDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public PhatSinhDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private PhatSinhModel GetObjFromDataRow(DataRow dr)
        {
            PhatSinhModel obj = new PhatSinhModel();
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

        public List<PhatSinhModel> GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_PhatSinh_GetAll");
                DataTable dt = ds.Tables[0];
                List<PhatSinhModel> result = new List<PhatSinhModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    PhatSinhModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành PhatSinhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhatSinh_GetAll " + ex.Message);
                return null;
            }
        }

        public List<PhatSinhModel> GetByNhanVien_Ngay(int ID_NhanVien, DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                    new SqlParameter("@Ngay",Ngay )
                };
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_PhatSinh_GetByNhanVien_Ngay", pars);
                DataTable dt = ds.Tables[0];
                List<PhatSinhModel> result = new List<PhatSinhModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    PhatSinhModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành PhatSinhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhatSinh_GetByNhanVien_Ngay " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_PhatSinh_DeleteMulti", pars);
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
                log.Error("sp_PhatSinh_DeleteMulti " + ex.Message);
                return false;
            }
        }
        public int InsertOrUpdate(PhatSinhModel model, int idnv)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@Cong", model.Cong),
                    new SqlParameter("@ID_CongViec", model.ID_CongViec),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayApDung", model.NgayApDung),
                    new SqlParameter("@ID_NhanVien", idnv),

                };

                object id = helper.ExecuteScalar("sp_PhatSinh_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhatSinh_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(PhatSinhModel model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (int idnv in model.lstNhanVienPhatSinh)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@Cong", model.Cong),
                        new SqlParameter("@ID_CongViec", model.ID_CongViec),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@NgayApDung", model.NgayApDung),
                        new SqlParameter("@ID_NhanVien", idnv),

                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_PhatSinh_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;

            }
            catch (Exception ex)
            {
                log.Error("sp_PhatSinh_InsertOrUpdate " + ex.Message);
            }

            return false;
        }


    }
}