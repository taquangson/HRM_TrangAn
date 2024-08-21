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
    public class CongLaoDong_TransferDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CongLaoDong_TransferDAO));
        private DataHelper helper;
        public CongLaoDong_TransferDAO()
        {
            helper = new DataHelper();
        }

        private CongLaoDong_TransferModel GetObjFromDataRow(DataRow dr)
        {
            CongLaoDong_TransferModel obj = new CongLaoDong_TransferModel();
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
        public List<CongLaoDong_TransferModel> GetByDate(DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@From", From),
                new SqlParameter("@To", To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CongLaoDong_Transfer_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                List<CongLaoDong_TransferModel> result = new List<CongLaoDong_TransferModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongLaoDong_Transfer_GetByDate " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(CongLaoDong_TransferModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_NhanVien_From", model.ID_NhanVien_From),
                new SqlParameter("@ID_NhanVien_To", model.ID_NhanVien_To),
                new SqlParameter("@ID_Taikhoan", model.ID_Taikhoan),
                new SqlParameter("@ID_ChuyenDo", model.ID_ChuyenDo),
                new SqlParameter("@ID_KeHoach", model.ID_KeHoach),
                new SqlParameter("@ID_ChuyenTo", model.ID_ChuyenTo)
                };

                object id = helper.ExecuteScalar("sp_CongLaoDong_Transfer_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CongLaoDong_Transfer_Insert " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_Transfer_Delete", pars);
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
                log.Error("sp_CongLaoDong_Transfer_Delete " + ex.Message);
                return false;
            }
        }
    }
}