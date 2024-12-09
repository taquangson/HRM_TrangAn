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
    public class DonSuaChuaThuyenDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DonSuaChuaThuyenDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public DonSuaChuaThuyenDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private DonSuaChuaThuyenModel GetObjFromDataRow(DataRow dr)
        {
            DonSuaChuaThuyenModel obj = new DonSuaChuaThuyenModel();
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

        public List<DonSuaChuaThuyenModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DonSuaChuaThuyen_GetAll");
                DataTable dt = ds.Tables[0];
                List<DonSuaChuaThuyenModel> result = new List<DonSuaChuaThuyenModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DonSuaChuaThuyenModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DonSuaChuaThuyenModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DonSuaChuaThuyen_GetAll " + ex.Message);
                return null;
            }
        }

        public List<DonSuaChuaThuyenModel> GetByDateRange(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("TuNgay", TuNgay),
                    new SqlParameter("DenNgay", DenNgay),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DonSuaChuaThuyen_GetByDateRange", pars);
                DataTable dt = ds.Tables[0];
                List<DonSuaChuaThuyenModel> result = new List<DonSuaChuaThuyenModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DonSuaChuaThuyenModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DonSuaChuaThuyenModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NghiPhep_GetByDateRange " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(DonSuaChuaThuyenModel model)
        {
            try
            {
                Console.WriteLine("DonSuaChuaThuyenModel: ", model);
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_ThuyenDo", model.ID_ThuyenDo),
                new SqlParameter("@SoDo", model.SoDo),
                new SqlParameter("@LyDo", model.LyDo),
                new SqlParameter("@GhiChu1", model.GhiChu1),
                new SqlParameter("@GhiChu2", model.GhiChu2),
                new SqlParameter("@GhiChu3", model.GhiChu3),
                new SqlParameter("@GhiChu4", model.GhiChu4),
                new SqlParameter("@SoTienSua", model.SoTienSua),
                new SqlParameter("@NgayLapPhieu", ((model.NgayLapPhieu.Year == 1 || model.NgayLapPhieu == null) ? (object)DBNull.Value : model.NgayLapPhieu)),
                new SqlParameter("@NgayHoanThanh", ((model.NgayHoanThanh.Year == 1 || model.NgayHoanThanh == null) ? (object)DBNull.Value : model.NgayHoanThanh)),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_DonSuaChuaThuyen_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DonSuaChuaThuyen_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DonSuaChuaThuyen_Delete", pars);
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
                log.Error("sp_DonSuaChuaThuyen_Delete " + ex.Message);
                return false;
            }
        }

        public bool UpdateTrangThai(int ID, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID ),
                    new SqlParameter("@TrangThai",TrangThai ),

                };
                int rowaff = helper.ExecuteNonQuery("sp_DonSuaChuaThuyen_ChangeStatus", pars);
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
                log.Error("sp_DonSuaChuaThuyen_ChangeStatus " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DonSuaChuaThuyen_DeleteMulti", pars);
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
                log.Error("sp_DonSuaChuaThuyen_DeleteMulti " + ex.Message);
                return false;
            }
        }




    }
}