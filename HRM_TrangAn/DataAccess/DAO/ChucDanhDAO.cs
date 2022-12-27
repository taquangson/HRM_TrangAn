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
    public class ChucDanhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChucDanhDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ChucDanhDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ChucDanhModel GetObjFromDataRow(DataRow dr)
        {
            ChucDanhModel obj = new ChucDanhModel();
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

        public List<ChucDanhModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChucDanh_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChucDanhModel> result = new List<ChucDanhModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChucDanhModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChucDanh_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ChucDanhModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaChucDanh", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChucDanh_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<ChucDanhModel> result = new List<ChucDanhModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChucDanhModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChucDanh_GetByMa " + ex.Message);
                return new List<ChucDanhModel>();
            }
        }

        public int InsertOrUpdate(ChucDanhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaChucDanh", model.MaChucDanh),
                new SqlParameter("@TenChucDanh", model.TenChucDanh)
                };

                object id = helper.ExecuteScalar("sp_ChucDanh_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChucDanh_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<ChucDanhModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (ChucDanhModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@MaChucDanh", model.MaChucDanh),
                        new SqlParameter("@TenChucDanh", model.TenChucDanh)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_ChucDanh_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChucDanh_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ChucDanh_Delete", pars);
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
                log.Error("sp_ChucDanh_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ChucDanh_DeleteMulti", pars);
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
                log.Error("sp_ChucDanh_DeleteMulti " + ex.Message);
                return false;
            }
        }


    }
}