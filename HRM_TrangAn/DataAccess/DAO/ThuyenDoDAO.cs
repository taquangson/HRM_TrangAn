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
    public class ThuyenDoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ThuyenDoDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ThuyenDoDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ThuyenDoModel GetObjFromDataRow(DataRow dr)
        {
            ThuyenDoModel obj = new ThuyenDoModel();
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

        public List<ThuyenDoModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ThuyenDo_GetAll");
                DataTable dt = ds.Tables[0];
                List<ThuyenDoModel> result = new List<ThuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThuyenDoModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ThuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ThuyenDoModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaThuyen", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ThuyenDo_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<ThuyenDoModel> result = new List<ThuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ThuyenDoModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ThuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_GetByMa " + ex.Message);
                return new List<ThuyenDoModel>();
            }
        }

        public int InsertOrUpdate(ThuyenDoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaThuyen", model.MaThuyen),
                new SqlParameter("@LoaiThuyen", model.LoaiThuyen),
                new SqlParameter("@SoLanCap", model.SoLanCap),
                new SqlParameter("@ChieuDai", model.ChieuDai),
                new SqlParameter("@ChieuRong", model.ChieuRong),
                new SqlParameter("@MauSon", model.MauSon),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_ThuyenDo_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<ThuyenDoModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (ThuyenDoModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@MaThuyen", model.MaThuyen),
                        new SqlParameter("@LoaiThuyen", model.LoaiThuyen),
                        new SqlParameter("@SoLanCap", model.SoLanCap),
                        new SqlParameter("@ChieuDai", model.ChieuDai),
                        new SqlParameter("@ChieuRong", model.ChieuRong),
                        new SqlParameter("@MauSon", model.MauSon),
                        new SqlParameter("@TrangThai", model.TrangThai)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_ThuyenDo_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
                
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ThuyenDo_Delete", pars);
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
                log.Error("sp_ThuyenDo_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ThuyenDo_DeleteMulti", pars);
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
                log.Error("sp_ThuyenDo_DeleteMulti " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ThuyenDo_ChangeStatus", pars);
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
                log.Error("sp_ThuyenDo_ChangeStatus " + ex.Message);
                return false;
            }
        }




    }
}