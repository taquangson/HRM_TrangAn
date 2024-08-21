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
    public class CaLamViec_PhanBoCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CaLamViec_PhanBoCongDAO));
        private DataHelper helper;
        public CaLamViec_PhanBoCongDAO()
        {
            helper = new DataHelper();
        }

        private CaLamViec_PhanBoCongModel GetObjFromDataRow(DataRow dr)
        {
            CaLamViec_PhanBoCongModel obj = new CaLamViec_PhanBoCongModel();
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

        public List<CaLamViec_PhanBoCongModel> GetByCaLamViec(int ID_CaLamViec)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_CaLamViec", ID_CaLamViec),
                };
                DataSet ds = helper.ExecuteDataSet("sp_CaLamViec_PhanBoCong_GetByCaLamViec", pars);
                DataTable dt = ds.Tables[0];
                List<CaLamViec_PhanBoCongModel> result = new List<CaLamViec_PhanBoCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int Insert(CaLamViec_PhanBoCongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_CaLamViec", model.ID_CaLamViec),
                new SqlParameter("@BatDau", model.BatDau),
                new SqlParameter("@KetThuc", model.KetThuc),
                new SqlParameter("@SoCong", model.SoCong),
                new SqlParameter("@TangCa", model.TangCa)
                };

                object id = helper.ExecuteScalar("sp_CaLamViec_PhanBoCong_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CaLamViec_PhanBoCong_Insert " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByCaLamViec(int ID_CaLamViec)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_CaLamViec",ID_CaLamViec ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CaLamViec_PhanBoCong_DeleteByCaLamViec", pars);
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
                log.Error("sp_CaLamViec_PhanBoCong_DeleteByCaLamViec " + ex.Message);
                return false;
            }
        }
    }
}