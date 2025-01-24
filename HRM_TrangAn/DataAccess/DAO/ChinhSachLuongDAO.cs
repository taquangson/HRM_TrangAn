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
    public class ChinhSachLuongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChinhSachLuongDAO));
        private DataHelper helper;
        public ChinhSachLuongDAO()
        {
            helper = new DataHelper();
        }

        private ChinhSachLuongModel GetObjFromDataRow(DataRow dr)
        {
            ChinhSachLuongModel obj = new ChinhSachLuongModel();
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

        private ChinhSachLuong_NhanVienModel GetNVObjFromDataRow(DataRow dr)
        {
            ChinhSachLuong_NhanVienModel obj = new ChinhSachLuong_NhanVienModel();
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

        private ChinhSachLuong_CauHinhModel GetCHObjFromDataRow(DataRow dr)
        {
            ChinhSachLuong_CauHinhModel obj = new ChinhSachLuong_CauHinhModel();
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

        private ChinhSachLuong_NhanVien_TreeModel GetTreeCSNVObjFromDataRow(DataRow dr)
        {
            ChinhSachLuong_NhanVien_TreeModel obj = new ChinhSachLuong_NhanVien_TreeModel();
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



        public List<ChinhSachLuongModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuongModel> GetAllByThangNam(int Thang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Nam", Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetAllByThangNam", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuong_NhanVien_TreeModel> GetDataTreeChinhSachLuongNhanVien(int ID_PhongBan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhongBan", ID_PhongBan)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_NhanVien_GetDataTree", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuong_NhanVien_TreeModel> result = new List<ChinhSachLuong_NhanVien_TreeModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChinhSachLuong_NhanVien_TreeModel item = GetTreeCSNVObjFromDataRow(dr);
                    item.chinhsachluong = GetNV_ByIDCSL(0, item.ID_HoSoNhanSu, null, null);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_NhanVien_GetDataTree " + ex.Message);
                return null;
            }
        }

        public ChinhSachLuongModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetByID " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuong_NhanVienModel> GetNV_ByIDCSL(int ID_ChinhSachLuong, int ID_HoSoNhanSu, DateTime? From, DateTime? To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                    new SqlParameter("@ID_HoSoNhanSu", ID_HoSoNhanSu),
                    new SqlParameter("@NgayBatDau",From == null ? (object)DBNull.Value : From),
                    new SqlParameter("@NgayKetThuc",To == null ? (object)DBNull.Value : To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_NhanVien_GetByIDCSL", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuong_NhanVienModel> result = new List<ChinhSachLuong_NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetNVObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_NhanVien_GetByIDCSL " + ex.Message);
                return null;
            }
        }
        
        public List<ChinhSachLuong_NhanVienModel> GetNV_ByIDCSLThuViec(int ID_ChinhSachLuong, int ID_HoSoNhanSu, DateTime? From, DateTime? To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                    new SqlParameter("@ID_HoSoNhanSu", ID_HoSoNhanSu),
                    new SqlParameter("@NgayBatDau",From == null ? (object)DBNull.Value : From),
                    new SqlParameter("@NgayKetThuc",To == null ? (object)DBNull.Value : To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_NhanVien_GetByIDCSL_ThuViec", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuong_NhanVienModel> result = new List<ChinhSachLuong_NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetNVObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_NhanVien_GetByIDCSL " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuongModel> GetCSLByID_HSNS(int ID_HoSoNhanSu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_HoSoNhanSu", ID_HoSoNhanSu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetCSLByID_HSNS", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_NhanVien_GetByIDCSL " + ex.Message);
                return new List<ChinhSachLuongModel>();
            }
        }

        public List<ChinhSachLuong_CauHinhModel> GetCH_ByIDCSL(int ID_ChinhSachLuong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_CauHinh_GetByIDCSL", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuong_CauHinhModel> result = new List<ChinhSachLuong_CauHinhModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetCHObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_CauHinh_GetByIDCSL " + ex.Message);
                return null;
            }
        }

        public List<ChinhSachLuongModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Ma", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChinhSachLuong_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<ChinhSachLuongModel> result = new List<ChinhSachLuongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChinhSachLuongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DanhMucCongViecModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChinhSachLuong_GetByMa " + ex.Message);
                return new List<ChinhSachLuongModel>();
            }
        }

        public bool InsertOrUpdate(ChinhSachLuongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@Ten", model.Ten),
                    new SqlParameter("@Ma", model.Ma),
                    new SqlParameter("@Loai", model.Loai),
                    new SqlParameter("@ID_LoaiHopDong", model.ID_LoaiHopDong),
                    new SqlParameter("@KyHanThanhToan", model.KyHanThanhToan),
                    new SqlParameter("@GhiChu", model.GhiChu),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_InsertOrUpdate", pars);
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
                log.Error("sp_ChinhSachLuong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_DeleteMulti", pars);
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
                log.Error("sp_ChinhSachLuong_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool InsertCSL_NV(ChinhSachLuong_NhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", model.ID_ChinhSachLuong),
                    new SqlParameter("@MucLuong", model.MucLuong),
                    new SqlParameter("@ID_HoSoNhanSu", model.ID_HoSoNhanSu),
                    new SqlParameter("@ID_NguoiApDung", model.ID_NguoiApDung),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayBatDau",((model.NgayBatDau.Year == 1 || model.NgayBatDau == null) ? (object)DBNull.Value : model.NgayBatDau)),
                    new SqlParameter("@NgayKetThuc",((model.NgayKetThuc.Year == 1 || model.NgayKetThuc == null) ? (object)DBNull.Value : model.NgayKetThuc)),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_Insert", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_Insert " + ex.Message);
                return false;
            }
        }

        public bool UpdateCSL_NV(ChinhSachLuong_NhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", model.ID_ChinhSachLuong),
                    new SqlParameter("@ID_HoSoNhanSu", model.ID_HoSoNhanSu),
                    new SqlParameter("@MucLuong", model.MucLuong),
                    new SqlParameter("@ID_NguoiApDung", model.ID_NguoiApDung),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayBatDau",((model.NgayBatDau.Year == 1 || model.NgayBatDau == null) ? (object)DBNull.Value : model.NgayBatDau)),
                    new SqlParameter("@NgayKetThuc",((model.NgayKetThuc.Year == 1 || model.NgayKetThuc == null) ? (object)DBNull.Value : model.NgayKetThuc)),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_Update", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_Update " + ex.Message);
                return false;
            }
        }

        public bool DeleteCSL_NV(int ID_ChinhSachLuong, int ID_HoSoNhanSu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", ID_ChinhSachLuong),
                    new SqlParameter("@ID_HoSoNhanSu", ID_HoSoNhanSu),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_Delete", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_Delete" + ex.Message);
                return false;
            }
        }

        public bool DeleteCSL_NV(int ID_ChinhSachLuong_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", ID_ChinhSachLuong_NhanVien),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_NhanVien_DeleteByID", pars);
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
                log.Error("sp_ChinhSachLuong_NhanVien_DeleteByID" + ex.Message);
                return false;
            }
        }

        public bool InsertCSL_CH(ChinhSachLuong_CauHinhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_ChinhSachLuong", model.ID_ChinhSachLuong),
                    new SqlParameter("@CongChuan", model.CongChuan),
                    new SqlParameter("@CongChuanTheoThang", model.CongChuanTheoThang),
                    new SqlParameter("@DoanhSoToiThieu", model.DoanhSoToiThieu),
                    new SqlParameter("@LuyKe_DoanhSoToiThieu", model.LuyKe_DoanhSoToiThieu),
                    new SqlParameter("@LuongKhachToiThieu", model.LuongKhachToiThieu),
                    new SqlParameter("@LuyKe_LuongKhachToiThieu", model.LuyKe_LuongKhachToiThieu),
                    new SqlParameter("@NgayCongToiThieu", model.NgayCongToiThieu),
                    new SqlParameter("@LuyKe_NgayCongToiThieu", model.LuyKe_NgayCongToiThieu),
                    new SqlParameter("@ID_NguoiApDung", model.ID_NguoiApDung),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayBatDau",((model.NgayBatDau.Year == 1 || model.NgayBatDau == null) ? (object)DBNull.Value : model.NgayBatDau)),
                    new SqlParameter("@NgayKetThuc",((model.NgayKetThuc.Year == 1 || model.NgayKetThuc == null) ? (object)DBNull.Value : model.NgayKetThuc)),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_CauHinh_Insert", pars);
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
                log.Error("sp_ChinhSachLuong_CauHinh_Insert " + ex.Message);
                return false;
            }
        }

        public bool DeleteCSL_CH(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", ID)
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChinhSachLuong_CauHinh_Delete", pars);
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
                log.Error("sp_ChinhSachLuong_CauHinh_Delete" + ex.Message);
                return false;
            }
        }
    }
}