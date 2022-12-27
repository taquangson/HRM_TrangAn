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
    public class CongLaoDongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CongLaoDongDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public CongLaoDongDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private CongLaoDongModel GetObjFromDataRow(DataRow dr)
        {
            CongLaoDongModel obj = new CongLaoDongModel();
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

        public List<CongLaoDongModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_CongLaoDong_GetAll");
                DataTable dt = ds.Tables[0];
                List<CongLaoDongModel> result = new List<CongLaoDongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CongLaoDongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành CongLaoDongModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongLaoDong_GetAll " + ex.Message);
                return null;
            }
        }

        public bool Delete(int ID_NhanVien, int Loai, int ID_Loai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                    new SqlParameter("@ID_ChuyenTo", Loai == 3 ? ID_Loai : 0),
                    new SqlParameter("@ID_KeHoach", Loai == 2 ? ID_Loai : 0),
                    new SqlParameter("@ID_ChuyenDo", Loai == 1 ? ID_Loai : 0),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_DeleteMulti", pars);
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
                log.Error("sp_CongLaoDong_DeleteMulti " + ex.Message);
                return false;
            }
        }


        public int InsertOrUpdate(int ID_NhanVien, int Loai, float SoCong, int ID_Loai, DateTime NgayTinhCong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                    new SqlParameter("@ID_ChuyenTo", (Loai == 3 || Loai == 7) ? ID_Loai : 0),
                    new SqlParameter("@ID_KeHoach", (Loai == 2 || Loai == 6) ? ID_Loai : 0),
                    new SqlParameter("@ID_ChuyenDo", (Loai == 1 || Loai == 2 || Loai == 5) ? ID_Loai : 0),
                    new SqlParameter("@ID_PhatSinh", (Loai == 4 || Loai == 8) ? ID_Loai : 0),
                    new SqlParameter("@Loai", Loai),
                    new SqlParameter("@SoCong", SoCong),
                    new SqlParameter("@NgayTinhCong", NgayTinhCong),
                };

                object id = helper.ExecuteScalar("sp_CongLaoDong_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CongLaoDong_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
        public bool DeleteMultiByIDChuyenTo(string ID_ChuyenTo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_ChuyenTo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_DeleteByID_ChuyenToMulti", pars);
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
                log.Error("sp_CongLaoDong_DeleteByID_ChuyenToMulti " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDKeHoach(string ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_KeHoach ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_DeleteByID_KeHoachMulti", pars);
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
                log.Error("sp_CongLaoDong_DeleteByID_KeHoachMulti " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDChuyenDo(string ID_ChuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_ChuyenDo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_DeleteByID_ChuyenDoMulti", pars);
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
                log.Error("sp_CongLaoDong_DeleteByID_ChuyenDoMulti " + ex.Message);
                return false;
            }
        }

    }

}