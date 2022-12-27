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
    public class ThongTinCongTyDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ThongTinCongTyDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ThongTinCongTyDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ThongTinCongTyModel GetObjFromDataRow(DataRow dr)
        {
            ThongTinCongTyModel obj = new ThongTinCongTyModel();
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

        public List<ThongTinCongTyModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ThongTinCongTy_GetAll");
                DataTable dt = ds.Tables[0];
                List<ThongTinCongTyModel> result = new List<ThongTinCongTyModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThongTinCongTyModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ThongTinCongTyModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongTinCongTy_GetAll " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(ThongTinCongTyModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@MaCongTy", model.MaCongTy),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@TenCongTy", model.TenCongTy),
                    new SqlParameter("@PhoGiamDoc", model.PhoGiamDoc),
                    new SqlParameter("@DiaChi", model.DiaChi),
                    new SqlParameter("@BanQuanLy", model.BanQuanLy),
                    new SqlParameter("@KeToan", model.KeToan),
                    new SqlParameter("@NguoiLap", model.NguoiLap),
                    new SqlParameter("@ID_NguoiLap", model.ID_NguoiLap)
                };

                object id = helper.ExecuteScalar("sp_ThongTinCongTy_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThongTinCongTy_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ThongTinCongTy_Delete", pars);
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
                log.Error("sp_ThongTinCongTy_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ThongTinCongTy_DeleteMulti", pars);
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
                log.Error("sp_ThongTinCongTy_DeleteMulti " + ex.Message);
                return false;
            }
        }





    }
}