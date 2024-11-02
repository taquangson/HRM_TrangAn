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
    public class ToNhom_KeHoachDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ToNhomDAO));
        private DataHelper helper;
        public ToNhom_KeHoachDAO()
        {
            helper = new DataHelper();
        }

        private ToNhom_KeHoachModel GetObjFromDataRow(DataRow dr)
        {
            ToNhom_KeHoachModel obj = new ToNhom_KeHoachModel();
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

        public List<ToNhom_KeHoachModel> GetToNhomByID_KeHoach(int ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_KeHoach", ID_KeHoach )
                };
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_KeHoach_GetByID_KeHoach", pars);
                DataTable dt = ds.Tables[0];
                List<ToNhom_KeHoachModel> result = new List<ToNhom_KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhom_KeHoachModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_KeHoach_GetToNhomByID_KeHoach " + ex.Message);
                return new List<ToNhom_KeHoachModel>();
            }
        }

        public List<ToNhom_KeHoachModel> GetAllByKeHoach(int ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_KeHoach", ID_KeHoach )
                };
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_KeHoach_GetByID_KeHoach", pars);
                DataTable dt = ds.Tables[0];
                List<ToNhom_KeHoachModel> result = new List<ToNhom_KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhom_KeHoachModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_KeHoach_GetByID_KeHoach " + ex.Message);
                return new List<ToNhom_KeHoachModel>();
            }
        }

        public bool InsertOrUpdate(ToNhom_KeHoachModel model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ID_KeHoach", model.ID_KeHoach),
                        new SqlParameter("@ID_ToNhom", model.ID_ToNhom),
                        new SqlParameter("@SoNguoi", model.SoNguoi)
                    };
                int rowaff = helper.ExecuteNonQuery("sp_ToNhom_KeHoach_InsertOrUpdate", pars);
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
                log.Error("sp_DiemQuetThe_InsertOrUpdate " + ex.Message);
            }

            return false;
        }
        
        public bool Delete(int ID_KeHoach, int ID_ToNhom)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID_KeHoach", ID_KeHoach),
                        new SqlParameter("@ID_ToNhom", ID_ToNhom),
                    };
                int rowaff = helper.ExecuteNonQuery("sp_ToNhom_KeHoach_Delete", pars);
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
                log.Error("sp_ToNhom_KeHoach_Delete " + ex.Message);
            }

            return false;
        }

        public bool InsertOrUpdateMulti(List<ToNhom_KeHoachModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (ToNhom_KeHoachModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ID_KeHoach", model.ID_KeHoach),
                        new SqlParameter("@ID_ToNhom", model.ID_ToNhom),
                        new SqlParameter("@SoNguoi", model.SoNguoi)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_ToNhom_KeHoach_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }
                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemQuetThe_InsertOrUpdate " + ex.Message);
            }

            return false;
        }
    }
}