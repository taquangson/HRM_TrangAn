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
    public class XinNghiPhepDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(XinNghiPhepDAO));
        private DataHelper helper;
        public XinNghiPhepDAO()
        {
            helper = new DataHelper();
        }

        private XinNghiPhepModel GetObjFromDataRow(DataRow dr)
        {
            XinNghiPhepModel obj = new XinNghiPhepModel();
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
        public List<XinNghiPhepModel> GetByLop(int ID_Lop, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@TuNgay", TuNgay),
                new SqlParameter("@DenNgay", DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_XinNghiPhep_GetByLop", pars);
                DataTable dt = ds.Tables[0];
                List<XinNghiPhepModel> result = new List<XinNghiPhepModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    XinNghiPhepModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<XinNghiPhepModel> GetByHocSinh(int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_XinNghiPhep_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<XinNghiPhepModel> result = new List<XinNghiPhepModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    XinNghiPhepModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(XinNghiPhepModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@NgayNghi", model.NgayNghi),
                new SqlParameter("@LyDoNghi", model.LyDoNghi),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_XinNghiPhep_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_XinNghiPhep_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_XinNghiPhep_Delete", pars);
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
                log.Error("sp_XinNghiPhep_Delete " + ex.Message);
                return false;
            }
        }
    }
}