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
    public class XuPhatDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(XuPhatDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public XuPhatDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private XuPhatModel GetObjFromDataRow(DataRow dr)
        {
            XuPhatModel obj = new XuPhatModel();
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

        public List<XuPhatModel> GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_XuPhat_GetAll");
                DataTable dt = ds.Tables[0];
                List<XuPhatModel> result = new List<XuPhatModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    XuPhatModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongXuPhat(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhat_GetAll " + ex.Message);
                return null;
            }
        }

        public List<XuPhatModel> GetByDateRange(DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("TuNgay", TuNgay),
                    new SqlParameter("DenNgay", DenNgay),
                };
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_XuPhat_GetByDateRange",pars);
                DataTable dt = ds.Tables[0];
                List<XuPhatModel> result = new List<XuPhatModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    XuPhatModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongXuPhat(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhat_GetByDateRange " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_XuPhat_Delete", pars);
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
                log.Error("sp_XuPhat_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_XuPhat_DeleteMulti", pars);
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
                log.Error("sp_XuPhat_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdate(XuPhatModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@SoTien", model.SoTien),
                    new SqlParameter("@LyDo", model.LyDo),
                    new SqlParameter("@NgayPhat", model.NgayPhat)
                };

                object id = helper.ExecuteScalar("sp_XuPhat_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhat_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(XuPhatModel model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (NhanVien_XuPhatModel item in model.lstNhanVienXuPhat)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@SoTien", model.SoTien),
                        new SqlParameter("@LyDo", model.LyDo),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@NgayPhat", model.NgayPhat),
                        new SqlParameter("@ID_NhanVien", item.ID_NhanVien),

                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_XuPhat_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;

            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhat_InsertOrUpdate " + ex.Message);
            }

            return false;
        }


    }
}