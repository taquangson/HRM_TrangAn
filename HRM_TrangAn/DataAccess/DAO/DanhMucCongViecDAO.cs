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
    public class DanhMucCongViecDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucCongViecDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public DanhMucCongViecDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private DanhMucCongViecModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucCongViecModel obj = new DanhMucCongViecModel();
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

        public List<DanhMucCongViecModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_CongViec_GetAll");
                DataTable dt = ds.Tables[0];
                List<DanhMucCongViecModel> result = new List<DanhMucCongViecModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucCongViecModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DanhMucCongViecModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongViec_GetAll " + ex.Message);
                return null;
            }
        }

        public List<DanhMucCongViecModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaCongViec", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CongViec_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<DanhMucCongViecModel> result = new List<DanhMucCongViecModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucCongViecModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DanhMucCongViecModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongViec_GetByMa " + ex.Message);
                return new List<DanhMucCongViecModel>();
            }
        }

        public int InsertOrUpdate(DanhMucCongViecModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@MaCongViec", model.MaCongViec),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@TenCongViec", model.TenCongViec),
                    new SqlParameter("@Cong", model.Cong),
                    new SqlParameter("@ThoiGian", model.ThoiGian),
                    new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                    new SqlParameter("@TrangThai", model.TrangThai)
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_CongViec_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CongViec_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<DanhMucCongViecModel> model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (DanhMucCongViecModel dm in model)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", dm.ID),
                        new SqlParameter("@MaCongViec", dm.MaCongViec),
                        new SqlParameter("@GhiChu", dm.GhiChu),
                        new SqlParameter("@TenCongViec", dm.TenCongViec),
                        new SqlParameter("@Cong", dm.Cong),
                        new SqlParameter("@ThoiGian", dm.ThoiGian),
                        new SqlParameter("@NgayTao", ((dm.NgayTao.Year == 1 || dm.NgayTao == null) ? (object)DBNull.Value : dm.NgayTao)),
                        new SqlParameter("@TrangThai", dm.TrangThai)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_CongViec_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }

                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongViec_InsertOrUpdate " + ex.Message);
            }
            return false;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongViec_Delete", pars);
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
                log.Error("sp_CongViec_Delete " + ex.Message);
                return false;
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
                int rowaff = helper.ExecuteNonQuery("sp_CongViec_DeleteMulti", pars);
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
                log.Error("sp_CongViec_DeleteMulti " + ex.Message);
                return false;
            }
        }





    }
}