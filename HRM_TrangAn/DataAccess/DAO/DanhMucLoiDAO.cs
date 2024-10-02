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
    public class DanhMucLoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DanhMucLoiDAO));
        private DataHelper helper;
        public DanhMucLoiDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucLoiModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucLoiModel obj = new DanhMucLoiModel();
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

        public List<DanhMucLoiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucLoi_GetAll");
                DataTable dt = ds.Tables[0];
                List<DanhMucLoiModel> result = new List<DanhMucLoiModel>();
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

        public DanhMucLoiModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucLoi_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<DanhMucLoiModel> result = new List<DanhMucLoiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(DanhMucLoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenLoi", model.TenLoi),
                new SqlParameter("@PhatTien", model.PhatTien),
                new SqlParameter("@PhatCong", model.PhatCong),
                new SqlParameter("@LoaiLoi", model.LoaiLoi),
                new SqlParameter("@SoPhutDiMuon", model.SoPhutDiMuon),
                new SqlParameter("@SoPhutVeSom", model.SoPhutVeSom),
                new SqlParameter("@QuenChamCong", model.QuenChamCong),
                new SqlParameter("@SoLanViPham", model.SoLanViPham),
                new SqlParameter("@MoTa", model.MoTa)
                };

                object id = helper.ExecuteScalar("sp_DanhMucLoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucLoi_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DanhMucLoi_Delete", pars);
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
                log.Error("sp_DanhMucLoi_Delete " + ex.Message);
                return false;
            }
        }
    }
}