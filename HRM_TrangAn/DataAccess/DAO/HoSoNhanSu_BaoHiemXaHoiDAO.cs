using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class HoSoNhanSu_BaoHiemXaHoiDAO
    {

        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HoSoNhanSu_BaoHiemXaHoiDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public HoSoNhanSu_BaoHiemXaHoiDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private HoSoNhanSu_BaoHiemXaHoiModel GetObjFromDataRow(DataRow dr)
        {
            HoSoNhanSu_BaoHiemXaHoiModel obj = new HoSoNhanSu_BaoHiemXaHoiModel();
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

        public List<HoSoNhanSu_BaoHiemXaHoiModel> GetAll()
        {
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_GetAll");
                DataTable dt = ds.Tables[0];
                List<HoSoNhanSu_BaoHiemXaHoiModel> result = new List<HoSoNhanSu_BaoHiemXaHoiModel>();
                //File_HoSoNhanSuDAO fdao = new File_HoSoNhanSuDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    HoSoNhanSu_BaoHiemXaHoiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành HoSoNhanSuModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_HoSoNhanSu_GetAll " + ex.Message);
                return null;
            }
        }
        

        /* public HoSoNhanSu_BaoHiemXaHoiModel GetByID(int ID)
         {
             try
             {
                 SqlParameter[] pars = new SqlParameter[] {
                 new SqlParameter("@ID", ID)
                 };
                 DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_GetById", pars);
                 DataTable dt = ds.Tables[0];
                 File_NhanVienDAO fdao = new File_NhanVienDAO();
                 if (dt.Rows.Count > 0)
                 {
                     HoSoNhanSuModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành HoSoNhanSuModel
                     model.files = fdao.GetAllByHoSoNhanSu(model.ID);
                     return model;
                 }
                 return null;
             }
             catch (Exception ex)
             {
                 log.Error("sp_HoSoNhanSu_GetById " + ex.Message);
                 return null;
             }
         }

         public HoSoNhanSuModel GetByID_TaiKhoan(int ID_TaiKhoan)
         {
             try
             {
                 SqlParameter[] pars = new SqlParameter[] {
                 new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                 };
                 DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_GetByID_TaiKhoan", pars);
                 DataTable dt = ds.Tables[0];
                 File_NhanVienDAO fdao = new File_NhanVienDAO();
                 if (dt.Rows.Count > 0)
                 {
                     HoSoNhanSuModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành HoSoNhanSuModel
                     model.files = fdao.GetAllByHoSoNhanSu(model.ID);
                     return model;
                 }
                 return null;
             }
             catch (Exception ex)
             {
                 log.Error("sp_HoSoNhanSu_GetByID_TaiKhoan " + ex.Message);
                 return null;
             }
         }

         public HoSoNhanSuModel GetByMa(string Ma)
         {
             try
             {
                 SqlParameter[] pars = new SqlParameter[] {
                 new SqlParameter("@MaNhanVien", Ma)
                 };
                 DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_GetByMa", pars);
                 DataTable dt = ds.Tables[0];
                 File_NhanVienDAO fdao = new File_NhanVienDAO();
                 if (dt.Rows.Count > 0)
                 {
                     HoSoNhanSuModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành NhanVienModel
                     model.files = fdao.GetAllByHoSoNhanSu(model.ID);
                     return model;
                 }
                 return null;
             }
             catch (Exception ex)
             {
                 log.Error("sp_HoSoNhanSu_GetByMa " + ex.Message);
                 return null;
             }
         }*/

        public bool InsertOrUpdate(List<HoSoNhanSu_BaoHiemXaHoiModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (HoSoNhanSu_BaoHiemXaHoiModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_HoSoNhanSu", model.ID_HoSoNhanSu),
                    new SqlParameter("@ID_BaoHiemXaHoi", model.ID_BaoHiemXaHoi),
                    new SqlParameter("@ID_NguoiTao", model.ID_NguoiTao),
                    new SqlParameter("@ThoiGianBatDau", ((model.BatDauApDung.Year == 1 || model.BatDauApDung == null) ? (object)DBNull.Value : model.BatDauApDung)),
                    new SqlParameter("@ThoiGianKetThuc", ((model.KetThucApDung.Year == 1 || model.KetThucApDung == null) ? (object)DBNull.Value : model.KetThucApDung)),
                };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_HoSoNhanSu_BaoHiemXaHoi_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }

                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_HoSoNhanSu_BaoHiemXaHoi_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_HoSoNhanSu_Delete", pars);
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
                log.Error("sp_HoSoNhanSu_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_HoSoNhanSu_DeleteMulti", pars);
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
                log.Error("sp_HoSoNhanSu_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public List<HoSoNhanSu_BaoHiemXaHoiModel> GetByID_BaoHiemXaHoi(int ID_BaoHiemXaHoi)
        {
            try
            {
                List<HoSoNhanSu_BaoHiemXaHoiModel> result = new List<HoSoNhanSu_BaoHiemXaHoiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaoHiemXaHoi",ID_BaoHiemXaHoi),
                };
                DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_BaoHiemXaHoi_GetByID_BaoHiemXaHoi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    HoSoNhanSu_BaoHiemXaHoiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_HoSoNhanSu_BaoHiemXaHoi_GetByID_BaoHiemXaHoi " + ex.Message);
                return new List<HoSoNhanSu_BaoHiemXaHoiModel>();
            }
        }
       
    }
}