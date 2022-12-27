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
    public class TuyenDoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TuyenDoDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public TuyenDoDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private TuyenDoModel GetObjFromDataRow(DataRow dr)
        {
            TuyenDoModel obj = new TuyenDoModel();
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

        public List<TuyenDoModel> GetAll()
        {
            try
            {
                DiemQuetTheDAO ddao = new DiemQuetTheDAO();
                TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
                DataSet ds = helper.ExecuteDataSet("sp_TuyenDo_GetAll");
                DataTable dt = ds.Tables[0];
                List<TuyenDoModel> result = new List<TuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TuyenDoModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    model.lstDiemTuyen = tddao.GetAllByTuyen(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_GetAll " + ex.Message);
                return null;
            }
        }
        
        
        public List<TuyenDoModel> GetTuyenDoTheoDiemCuoi(int ID_DiemQuetThe)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
               {
                    new SqlParameter("@ID_DiemQuetThe",ID_DiemQuetThe ),
               };
                DiemQuetTheDAO ddao = new DiemQuetTheDAO();
                TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
                DataSet ds = helper.ExecuteDataSet("sp_TuyenDo_GetByDiemCuoi", pars);
                DataTable dt = ds.Tables[0];
                List<TuyenDoModel> result = new List<TuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    TuyenDoModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    model.lstDiemTuyen = tddao.GetAllByTuyen(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_GetAll " + ex.Message);
                return null;
            }
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TuyenDo_Delete", pars);
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
                log.Error("sp_TuyenDo_Delete " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdate(TuyenDoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaTuyen", model.MaTuyen),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@TenTuyen", model.TenTuyen),
                new SqlParameter("@ThoiGianToiThieu", model.ThoiGianToiThieu),
                new SqlParameter("@ThoiGianToiDa", model.ThoiGianToiDa)
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_TuyenDo_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TuyenDo_DeleteMulti", pars);
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
                log.Error("sp_TuyenDo_DeleteMulti " + ex.Message);
                return false;
            }
        }


    }
}