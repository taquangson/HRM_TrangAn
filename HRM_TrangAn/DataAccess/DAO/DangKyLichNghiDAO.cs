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
    public class DangKyLichNghiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DangKyLichNghiDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public DangKyLichNghiDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private DangKyLichNghiModel GetObjFromDataRow(DataRow dr)
        {
            DangKyLichNghiModel obj = new DangKyLichNghiModel();
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

        public List<DangKyLichNghiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetAll");
                DataTable dt = ds.Tables[0];
                List<DangKyLichNghiModel> result = new List<DangKyLichNghiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DangKyLichNghiModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetAll " + ex.Message);
                return null;
            }
        }

        public List<DangKyLichNghiModel> GetByDate(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
              {
                    new SqlParameter("@from",from ),
                    new SqlParameter("@to",to )
              };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetByDate", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyLichNghiModel> result = new List<DangKyLichNghiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DangKyLichNghiModel
                    model.Tag_NhanVien = model.Tags_NhanVien.Trim().Split(',');
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetByDate " + ex.Message);
                return null;
            }
        }
        
        
        public List<DangKyLichNghiModel> GetDataLichNghiDaDuyet(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
              {
                    new SqlParameter("@from",from ),
                    new SqlParameter("@to",to )
              };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetDataLichNghiDaDuyet", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyLichNghiModel> result = new List<DangKyLichNghiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DangKyLichNghiModel
                    model.Tag_NhanVien = model.Tags_NhanVien.Trim().Split(',');
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetByDate " + ex.Message);
                return null;
            }
        }

        public List<DangKyLichNghiModel> GetByID_NhanVien(int ID_TaiKhoan, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
              {
                    new SqlParameter("@ID_TaiKhoan",ID_TaiKhoan ),
                    new SqlParameter("@from",from ),
                    new SqlParameter("@to",to )
              };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyLichNghiModel> result = new List<DangKyLichNghiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DangKyLichNghiModel
                    model.Tag_NhanVien = model.Tags_NhanVien.Trim().Split(',');
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetByNhanVien " + ex.Message);
                return null;
            }
        }

        public List<DangKyLichNghiModel> GetByDate_Tag(int ID_TaiKhoan, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
              {
                    new SqlParameter("@ID_TaiKhoan",ID_TaiKhoan ),
                    new SqlParameter("@from",from ),
                    new SqlParameter("@to",to )
              };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetByTag", pars);
                DataTable dt = ds.Tables[0];
                List<DangKyLichNghiModel> result = new List<DangKyLichNghiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DangKyLichNghiModel
                    model.Tag_NhanVien = model.Tags_NhanVien.Trim().Split(',');
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetByTag " + ex.Message);
                return null;
            }
        }

        public DangKyLichNghiModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
              {
                    new SqlParameter("@ID",ID )
              };
                DataSet ds = helper.ExecuteDataSet("sp_DangKyLichNghi_GetByID", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    DangKyLichNghiModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành DangKyLichNghiModel
                    model.Tag_NhanVien = model.Tags_NhanVien.Trim().Split(',');
                    return model;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_GetByID " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_DangKyLichNghi_DeleteMulti", pars);
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
                log.Error("sp_DangKyLichNghi_DeleteMulti " + ex.Message);
                return false;
            }
        }


        public int InsertOrUpdate(DangKyLichNghiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@Loai", model.Loai),
                    new SqlParameter("@TrangThai", model.TrangThai),
                    new SqlParameter("@BatDauNghi", model.BatDauNghi),
                    new SqlParameter("@KetThucNghi", model.KetThucNghi),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@Tag_NhanVien", string.Join(",", model.Tag_NhanVien)),
                    new SqlParameter("@NgayPheDuyet",((model.NgayPheDuyet.Year == 1 || model.NgayPheDuyet == null) ? (object)DBNull.Value : model.NgayPheDuyet)),

                };

                object id = helper.ExecuteScalar("sp_DangKyLichNghi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool MultiInsert(List<DangKyLichNghiModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (DangKyLichNghiModel model in list) {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                        new SqlParameter("@Loai", model.Loai),
                        new SqlParameter("@TrangThai", model.TrangThai),
                        new SqlParameter("@BatDauNghi", model.BatDauNghi),
                        new SqlParameter("@KetThucNghi", model.KetThucNghi),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@Tag_NhanVien", string.Join(",", model.Tag_NhanVien)),
                        new SqlParameter("@NgayPheDuyet",((model.NgayPheDuyet.Year == 1 || model.NgayPheDuyet == null) ? (object)DBNull.Value : model.NgayPheDuyet)),
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_DangKyLichNghi_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }
                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch(Exception ex)
            {
                log.Error("sp_DangKyLichNghi_InsertOrUpdate" + ex.Message);
                return false;
            }
        }

        public int UpdateTrangThai(DangKyLichNghiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                      new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_TrangThai", model.TrangThai),
                    new SqlParameter("@NgayPheDuyet",((model.NgayPheDuyet.Year == 1 || model.NgayPheDuyet == null) ? (object)DBNull.Value : model.NgayPheDuyet)),

                };

                object id = helper.ExecuteScalar("sp_DangKyLichNghi_UpdateTrangThai", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DangKyLichNghi_UpdateTrangThai " + ex.Message);
            }

            return 0;
        }
    }
}