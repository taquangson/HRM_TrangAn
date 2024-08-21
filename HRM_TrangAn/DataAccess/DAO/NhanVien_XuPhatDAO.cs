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
    public class NhanVien_XuPhatDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_XuPhatDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_XuPhatDAO()
        {
            helper = new DataHelper();
        }

        private NhanVien_XuPhatModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_XuPhatModel obj = new NhanVien_XuPhatModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_XuPhat_Delete", pars);
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
                log.Error("sp_NhanVien_XuPhat_Delete " + ex.Message);
                return false;
            }
        }


        public List<NhanVien_XuPhatModel> GetAllByXuPhat(int ID_XuPhat)
        {
            List<NhanVien_XuPhatModel> result = new List<NhanVien_XuPhatModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_XuPhat", ID_XuPhat)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_XuPhat_GetAllNhanVienTrongXuPhat",pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_XuPhatModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành XuPhatModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_XuPhat_GetAllNhanVienTrongXuPhat " + ex.Message);
                return result;
            }
        }

        public int Insert(int ID_NhanVien, int ID_XuPhat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_XuPhat", ID_XuPhat),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                //new SqlParameter("@NgayTao", ((model.NgayTao.Year == 1 || model.NgayTao == null) ? (object)DBNull.Value : model.NgayTao)),
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_XuPhat_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_XuPhat_Insert " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByIDXuPhat(int ID_XuPhat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_XuPhat",ID_XuPhat ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_XuPhat_DeleteByIDXuPhat", pars);
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
                log.Error("sp_NhanVien_XuPhat_DeleteByIDXuPhat " + ex.Message);
                return false;
            }
        }

        public bool DeleteMultiByIDXuPhat(string ID_XuPhat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_XuPhat",ID_XuPhat )
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_XuPhat_DeleteMultiByIDXuPhat", pars);
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
                log.Error("sp_NhanVien_XuPhat_DeleteMultiByIDXuPhat " + ex.Message);
                return false;
            }
        }
    }
}