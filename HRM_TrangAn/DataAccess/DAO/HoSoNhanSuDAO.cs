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
    public class HoSoNhanSuDAO
    {

        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HoSoNhanSuDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public HoSoNhanSuDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private HoSoNhanSuModel GetObjFromDataRow(DataRow dr)
        {
            HoSoNhanSuModel obj = new HoSoNhanSuModel();
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

        public List<HoSoNhanSuModel> GetAll()
        {
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_HoSoNhanSu_GetAll");
                DataTable dt = ds.Tables[0];
                List<HoSoNhanSuModel> result = new List<HoSoNhanSuModel>();
                //File_HoSoNhanSuDAO fdao = new File_HoSoNhanSuDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    HoSoNhanSuModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành HoSoNhanSuModel
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

        public HoSoNhanSuModel GetByID(int ID)
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


        }
        public int InsertOrUpdate(HoSoNhanSuModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaNhanVien", model.MaNhanVien),
                new SqlParameter("@TenDayDu", model.TenDayDu),
                new SqlParameter("@SoDienThoai", model.SoDienThoai),
                new SqlParameter("@CCCD", model.CCCD),
                new SqlParameter("@DiaChi", model.DiaChi),
                new SqlParameter("@Email", model.Email),
                new SqlParameter("@NgaySinh", ((model.NgaySinh.Year == 1 || model.NgaySinh == null) ? (object)DBNull.Value : model.NgaySinh)),
                new SqlParameter("@NgayBatDauLamViec", ((model.NgayBatDauLamViec.Year == 1 || model.NgayBatDauLamViec == null) ? (object)DBNull.Value : model.NgayBatDauLamViec)),
                new SqlParameter("@NgayKetThucLamViec",((model.NgayKetThucLamViec.Year == 1 || model.NgayKetThucLamViec == null) ? (object)DBNull.Value : model.NgayKetThucLamViec)),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@ID_ChucVu", model.ID_ChucVu),
                new SqlParameter("@ID_GioiTinh", model.ID_GioiTinh),
                new SqlParameter("@MaTheBH", model.MaTheBH),
                new SqlParameter("@Tinh", model.Tinh),
                new SqlParameter("@Quan", model.Quan),
                new SqlParameter("@Phuong", model.Phuong),
                new SqlParameter("@DuongPho", model.DuongPho),
                new SqlParameter("@NoiCapCCCD", model.NoiCapCCCD),
                new SqlParameter("@MaSoThue", model.MaSoThue),
                new SqlParameter("@CoQuanThueQuanLy", model.CoQuanThueQuanLy),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@NgayCapCCCD",((model.NgayCapCCCD.Year == 1 || model.NgayCapCCCD == null) ? (object)DBNull.Value : model.NgayCapCCCD)),
                new SqlParameter("@NgayCapMaSoThue",((model.NgayCapMaSoThue.Year == 1 || model.NgayCapMaSoThue == null) ? (object)DBNull.Value : model.NgayCapMaSoThue)),
                new SqlParameter("@NgayBatDauHopDong",((model.NgayBatDauHopDong.Year == 1 || model.NgayBatDauHopDong == null) ? (object)DBNull.Value : model.NgayBatDauHopDong)),
                new SqlParameter("@NgayKetThucHopDong",((model.NgayKetThucHopDong.Year == 1 || model.NgayKetThucHopDong == null) ? (object)DBNull.Value : model.NgayKetThucHopDong)),
                new SqlParameter("@ID_LoaiHopDong", model.ID_LoaiHopDong),
                new SqlParameter("@MaNganHang", model.MaNganHang),
                new SqlParameter("@TenNganHang", model.TenNganHang),
                new SqlParameter("@SoTaiKhoan", model.SoTaiKhoan),
                new SqlParameter("@ChuTaiKhoan", model.ChuTaiKhoan),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan)
                };

                object id = helper.ExecuteScalar("sp_HoSoNhanSu_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HoSoNhanSu_InsertOrUpdate " + ex.Message);
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
    }
}