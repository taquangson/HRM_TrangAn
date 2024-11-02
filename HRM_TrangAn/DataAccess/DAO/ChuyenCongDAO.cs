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
    public class ChuyenCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChuyenCongDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ChuyenCongDAO()
        {
            helper = new DataHelper();
        }
        private LichSuChuyenCongModel GetObjFromDataRow(DataRow dr)
        {
            LichSuChuyenCongModel obj = new LichSuChuyenCongModel();
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

        public List<LichSuChuyenCongModel> GetByThangAndNguoiTao(int ID_NguoiTao, DateTime NgayDau, DateTime NgayCuoi)
        {

            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("NgayDau", NgayDau),
                    new SqlParameter("NgayCuoi", NgayCuoi),
                    new SqlParameter("ID_NguoiTao", ID_NguoiTao),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenCong_GetLichSuChuyenCongByThangAndNguoiTao", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuChuyenCongModel> result = new List<LichSuChuyenCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichSuChuyenCongModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenCong_GetLichSuChuyenCongByThangAndNguoiTao " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenCong_DeleteMulti", pars);
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
                log.Error("sp_ChuyenCong_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool InsertOrUpdate(LichSuChuyenCongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_NguoiChuyenCong", model.ID_NguoiChuyenCong),
                    new SqlParameter("@ID_NguoiNhanCong", model.ID_NguoiNhanCong),
                    new SqlParameter("@ID_NguoiTao", model.ID_NguoiTao),
                    new SqlParameter("@TrangThai", model.TrangThai),
                    new SqlParameter("@CongChuyen", model.CongChuyen),
                    new SqlParameter("@NgayTinhCong", model.NgayTinhCong),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenCong_InsertOrUpdate", pars);
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
                log.Error("sp_ChuyenCong_InsertOrUpdate " + ex.Message);
                return false;
            }
        }

    }
}