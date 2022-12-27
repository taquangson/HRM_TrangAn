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
    public class TuyenDo_DiemDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TuyenDo_DiemDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public TuyenDo_DiemDAO()
        {
            helper = new DataHelper();
        }

        private TuyenDo_DiemModel GetObjFromDataRow(DataRow dr)
        {
            TuyenDo_DiemModel obj = new TuyenDo_DiemModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_TuyenDo_Diem_Delete", pars);
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
                log.Error("sp_TuyenDo_Diem_Delete " + ex.Message);
                return false;
            }
        }


        public List<TuyenDo_DiemModel> GetAllByTuyen(int ID_TuyenDo)
        {
            List<TuyenDo_DiemModel> result = new List<TuyenDo_DiemModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TuyenDo", ID_TuyenDo)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TuyenDo_Diem_GetAllDiemTrongTuyen",pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    TuyenDo_DiemModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_Diem_GetAllDiemTrongTuyen " + ex.Message);
                return result;
            }
        }

        public int Insert(TuyenDo_DiemModel model, int ID_TuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_TuyenDo", ID_TuyenDo),
                new SqlParameter("@ID_DiemQuetThe", model.ID_DiemQuetThe),
                new SqlParameter("@STT", model.STT)
                };

                object id = helper.ExecuteScalar("sp_TuyenDo_Diem_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_Diem_Insert " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByIDTuyenDo(int ID_TuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TuyenDo",ID_TuyenDo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TuyenDo_Diem_DeleteByIDTuyen", pars);
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
                log.Error("sp_TuyenDo_Diem_DeleteByIDTuyen " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDTuyenDo(string ID_TuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TuyenDo",ID_TuyenDo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_TuyenDo_Diem_DeleteMultiByIDTuyen", pars);
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
                log.Error("sp_TuyenDo_Diem_DeleteMultiByIDTuyen " + ex.Message);
                return false;
            }
        }
    }
}