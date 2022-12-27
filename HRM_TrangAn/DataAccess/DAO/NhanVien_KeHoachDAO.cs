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
    public class NhanVien_KeHoachDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_KeHoachDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_KeHoachDAO()
        {
            helper = new DataHelper();
        }

        private NhanVien_KeHoachModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_KeHoachModel obj = new NhanVien_KeHoachModel();
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
        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_KeHoach_Delete", pars);
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
                log.Error("sp_NhanVien_KeHoach_Delete " + ex.Message);
                return false;
            }
        }


        public List<NhanVien_KeHoachModel> GetAllByKeHoach(int ID_KeHoach)
        {
            List<NhanVien_KeHoachModel> result = new List<NhanVien_KeHoachModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_KeHoach", ID_KeHoach)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_KeHoach_GetAllNhanVienTrongKeHoach",pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành KeHoachModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_KeHoach_GetAllNhanVienTrongKeHoach " + ex.Message);
                return result;
            }
        }

        public List<NhanVien_KeHoachModel> GetAllNhanVienTrongKeHoach(int ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_KeHoach", ID_KeHoach)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_KeHoach_GetAllNhanVien_TrongKeHoach", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVien_KeHoachModel> result = new List<NhanVien_KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_KeHoach_GetAllNhanVien_TrongKeHoach " + ex.Message);
                return null;
            }
        }

        public int Insert(int ID_NhanVien, int ID_KeHoach,float Cong, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_KeHoach", ID_KeHoach),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                new SqlParameter("@Cong", Cong),
                new SqlParameter("@TrangThai", TrangThai)
                //new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_KeHoach_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_KeHoach_Insert " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate(int ID_NhanVien, int ID_KeHoach, float Cong, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_KeHoach", ID_KeHoach),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                new SqlParameter("@Cong", Cong),
                new SqlParameter("@TrangThai", TrangThai)
                //new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_KeHoach_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_KeHoach_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByIDKeHoach(int ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_KeHoach",ID_KeHoach ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_KeHoach_DeleteByIDKeHoach", pars);
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
                log.Error("sp_NhanVien_KeHoach_DeleteByIDKeHoach " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDKeHoach(string ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_KeHoach",ID_KeHoach ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_KeHoach_DeleteMultiByIDKeHoach", pars);
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
                log.Error("sp_NhanVien_KeHoach_DeleteMultiByIDKeHoach " + ex.Message);
                return false;
            }
        }
    }
}