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
    public class NguoiGiamSatDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NguoiGiamSatDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NguoiGiamSatDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private NguoiGiamSatModel GetObjFromDataRow(DataRow dr)
        {
            NguoiGiamSatModel obj = new NguoiGiamSatModel();
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

        public List<NguoiGiamSatModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_NguoiGiamSat_GetAll");
                DataTable dt = ds.Tables[0];
                List<NguoiGiamSatModel> result = new List<NguoiGiamSatModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NguoiGiamSatModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NguoiGiamSatModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NguoiGiamSat_GetAll " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_NguoiGiamSat_Delete", pars);
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
                log.Error("sp_NguoiGiamSat_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_NguoiGiamSat_DeleteMulti", pars);
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
                log.Error("sp_NguoiGiamSat_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool InsertOrUpdateMulti(List<NguoiGiamSatModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (NguoiGiamSatModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                        new SqlParameter("@DiaDiemLamViec", model.DiaDiemLamViec),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@DienThoai", model.DienThoai),
                        new SqlParameter("@TenDayDu", model.TenDayDu),
                        new SqlParameter("@Loai", model.Loai)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_NguoiGiamSat_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
                
            }
            catch (Exception ex)
            {
                log.Error("sp_NguoiGiamSat_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public int InsertOrUpdate(NguoiGiamSatModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@DiaDiemLamViec", model.DiaDiemLamViec),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@DienThoai", model.DienThoai),
                    new SqlParameter("@TenDayDu", model.TenDayDu),
                    new SqlParameter("@Loai", model.Loai),

                };

                object id = helper.ExecuteScalar("sp_NguoiGiamSat_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NguoiGiamSat_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
    }
}