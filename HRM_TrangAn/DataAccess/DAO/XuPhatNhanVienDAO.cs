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
    public class XuPhatNhanVienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(XuPhatNhanVienDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public XuPhatNhanVienDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private XuPhatNhanVienModel GetObjFromDataRow(DataRow dr)
        {
            XuPhatNhanVienModel obj = new XuPhatNhanVienModel();
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

        public List<XuPhatNhanVienModel> GetAll()
        {
            try
            {
                TaiKhoanDAO nvdao = new TaiKhoanDAO();
                DataSet ds = helper.ExecuteDataSet("sp_XuPhatNhanVien_GetAll");
                DataTable dt = ds.Tables[0];
                List<XuPhatNhanVienModel> result = new List<XuPhatNhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    XuPhatNhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatNhanVienModel
                    //model.lstNhanVien = nvdao.GetAllNhanVienTrongXuPhatNhanVien(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhatNhanVien_GetAll " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_XuPhatNhanVien_Delete", pars);
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
                log.Error("sp_XuPhatNhanVien_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_XuPhatNhanVien_DeleteMulti", pars);
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
                log.Error("sp_XuPhatNhanVien_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdate(XuPhatNhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@ID_DanhMucLoi", model.ID_DanhMucLoi),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayPhat", model.NgayPhat)
                };

                object id = helper.ExecuteScalar("sp_XuPhatNhanVien_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhatNhanVien_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(XuPhatNhanVienModel model)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (NhanVien_XuPhatModel item in model.lstNhanVienXuPhat)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_TaiKhoan", item.ID_NhanVien),
                    new SqlParameter("@ID_DanhMucLoi", model.ID_DanhMucLoi),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayPhat", model.NgayPhat)

                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_XuPhatNhanVien_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;

            }
            catch (Exception ex)
            {
                log.Error("sp_XuPhatNhanVien_InsertOrUpdate " + ex.Message);
            }

            return false;
        }


    }
}