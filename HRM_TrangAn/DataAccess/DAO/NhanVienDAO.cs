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
    public class NhanVienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVienDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVienDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private NhanVienModel GetObjFromDataRow(DataRow dr)
        {
            NhanVienModel obj = new NhanVienModel();
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
        
        private SelectNhanVienForKeHoachModel GetSelectNhanVienForKeHoachModelFromDataRow(DataRow dr)
        {
            SelectNhanVienForKeHoachModel obj = new SelectNhanVienForKeHoachModel();
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


        public List<NhanVienModel> GetAll()
        {
            try
            {
                NhanVien_ChucDanhDAO cddao = new NhanVien_ChucDanhDAO();
                

                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetAll");
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                //File_NhanVienDAO fdao = new File_NhanVienDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    //model.lstChucDanh = cddao.GetAllByNhanVien(model.ID);
                    //model.TenChucDanh = GetTenChucDanh(model.ID);
                    //model.AnhDaiDien = fdao.GetAllByNhanVien(model.ID).Where(x => x.FileType == 1).FirstOrDefault();
                    //if(model.AnhDaiDien == null)
                    //{
                    //    model.AnhDaiDien = new File_NhanVienModel();
                    //    model.AnhDaiDien.FileType = 0;
                    //}
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetAll " + ex.Message);
                return null;
            }
        }

        public NhanVienModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetById", pars);
                DataTable dt = ds.Tables[0];
                File_NhanVienDAO fdao = new File_NhanVienDAO();
                if (dt.Rows.Count > 0)
                {
                    NhanVienModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành NhanVienModel
                    model.AnhDaiDien = fdao.GetAllByNhanVien(model.ID).Where(x => x.FileType == 1).FirstOrDefault();
                    if (model.AnhDaiDien == null)
                    {
                        model.AnhDaiDien = new File_NhanVienModel();
                        model.AnhDaiDien.FileType = 0;
                    }
                    return model;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetById " + ex.Message);
                return null;
            }
        }


        public string GetTenChucDanh(int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien )
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetChucDanh", pars);
                DataTable dt = ds.Tables[0];
                string result = "";
                foreach (DataRow dr in dt.Rows)
                {
                    string s = dr[0].ToString();
                    result += s + " ";
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetChucDanh " + ex.Message);
                return null;
            }
        }
        public NhanVienModel GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@MaNhanVien", Ma)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                File_NhanVienDAO fdao = new File_NhanVienDAO();
                if (dt.Rows.Count > 0)
                {
                    NhanVienModel model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành NhanVienModel
                    model.AnhDaiDien = fdao.GetAllByNhanVien(model.ID).Where(x => x.FileType == 1).FirstOrDefault();
                    return model;
                }
                return null;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetByMa " + ex.Message);
                return null;
            }
        }
        public List<NhanVienModel> GetAllNhanVienTrongToNhom(int ID_ToNhom)
        {
            try
            {
                File_NhanVienDAO fdao = new File_NhanVienDAO();
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhom", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    model.AnhDaiDien = fdao.GetAllByNhanVien(model.ID).Where(x => x.FileType == 1).FirstOrDefault();
                    if (model.AnhDaiDien == null)
                    {
                        model.AnhDaiDien = new File_NhanVienModel();
                        model.AnhDaiDien.FileType = 0;
                    }
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhom " + ex.Message);
                return null;
            }
        }
        
        public List<NhanVienModel> GetAllNhanVienTrongToNhomTheoCongViec(int ID_ToNhom, int ID_CongViec)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ToNhom", ID_ToNhom),
                new SqlParameter("@ID_CongViec", ID_CongViec)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhomTheoCongViec", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhomTheoCongViec " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> GetAllNhanVienTrongToNhomTheoCongViecNgay(int ID_ToNhom, int ID_CongViec, DateTime Ngay, int ID_DiemQuetThe)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ToNhom", ID_ToNhom),
                new SqlParameter("@ID_CongViec", ID_CongViec),
                new SqlParameter("@Ngay", Ngay),
                new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhomTheoCongViecNgay", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ToNhom_GetAllNhanVien_TrongToNhomTheoCongViecNgay " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> GetAllNhanVienTrongKeHoach(int ID_KeHoach)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_KeHoach", ID_KeHoach)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_KeHoach_GetAllNhanVien_TrongKeHoach", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_KeHoach_GetAllNhanVien_TrongKeHoach " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> GetAllNhanVienNgoaiToNhom()
        {
            try
            {
                File_NhanVienDAO fdao = new File_NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetAllNhanVien_NgoaiToNhom");
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel                    
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetAllNhanVien_NgoaiToNhom " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> CheckNhanVienCoTicke(string IDs, DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@IDs", IDs),
                new SqlParameter("@From", From),
                new SqlParameter("@To", To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetAllNhanVien_CoTicke", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetAllNhanVien_CoTicke " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> GetAllNhanVienTrongChuyenTo(int ID_ChuyenTo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChuyenTo", ID_ChuyenTo)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ChuyenTo_GetAllNhanVien_TrongChuyenTo", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_ChuyenTo_GetAllNhanVien_TrongChuyenTo " + ex.Message);
                return null;
            }
        }

        public List<NhanVienModel> GetAllNhanVienTrongXuPhat(int ID_XuPhat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_XuPhat", ID_XuPhat)
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_XuPhat_GetAllNhanVien_TrongXuPhat", pars);
                DataTable dt = ds.Tables[0];
                List<NhanVienModel> result = new List<NhanVienModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_XuPhat_GetAllNhanVien_TrongXuPhat " + ex.Message);
                return null;
            }
        }

        //public List<NhanVienModel> GetAllNhanVienNgoaiToNhom(int ID_ToNhom)
        //{
        //    try
        //    {
        //        SqlParameter[] pars = new SqlParameter[] {
        //        new SqlParameter("@ID_ToNhom", ID_ToNhom)
        //        };
        //        DataSet ds = helper.ExecuteDataSet("sp_NhanVien_ToNhom_GetAllNhanVienNgoaiToNhom",pars);
        //        DataTable dt = ds.Tables[0];
        //        List<NhanVienModel> result = new List<NhanVienModel>();
        //        foreach (DataRow dr in dt.Rows)
        //        {
        //            NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
        //            result.Add(model);
        //        }
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error("sp_NhanVien_ToNhom_GetAllNhanVienNgoaiToNhom " + ex.Message);
        //        return null;
        //    }
        //}

        public int InsertOrUpdate(NhanVienModel model)
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
                //Nếu năm sinh = 1 hoặ c ngày sinh là null thì truyền DBNUll vào store proceduce
                new SqlParameter("@NgayBatDauLamViec", ((model.NgayBatDauLamViec.Year == 1 || model.NgayBatDauLamViec == null) ? (object)DBNull.Value : model.NgayBatDauLamViec)),
                new SqlParameter("@NgayKetThucLamViec",((model.NgayKetThucLamViec.Year == 1 || model.NgayKetThucLamViec == null) ? (object)DBNull.Value : model.NgayKetThucLamViec)),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@ID_ChucVu", model.ID_ChucVu),
                new SqlParameter("@ID_LoaiLaiDo", model.ID_LoaiLaiDo),
                new SqlParameter("@ID_GioiTinh", model.ID_GioiTinh),
                new SqlParameter("@ID_TinhTrangHoSo", model.ID_TinhTrangHoSo),
                new SqlParameter("@MaTheBH", model.MaTheBH),
                new SqlParameter("@ID_Tinh", model.ID_Tinh),
                new SqlParameter("@Tinh", model.Tinh),
                new SqlParameter("@ID_Quan", model.ID_Quan),
                new SqlParameter("@Quan", model.Quan),
                new SqlParameter("@ID_Phuong", model.ID_Phuong),
                new SqlParameter("@Phuong", model.Phuong),
                new SqlParameter("@DuongPho", model.DuongPho),
                new SqlParameter("@NoiCapCCCD", model.NoiCapCCCD),
                new SqlParameter("@MaSoThue", model.MaSoThue),
                new SqlParameter("@CoQuanThueQuanLy", model.CoQuanThueQuanLy),
                new SqlParameter("@ID_TinhTrangCCNghiepVu", model.ID_TinhTrangCCNghiepVu),
                new SqlParameter("@ID_TinhTrangCCDuongThuy", model.ID_TinhTrangCCDuongThuy),
                new SqlParameter("@ID_TinhTrangCCPCCC", model.ID_TinhTrangCCPCCC),
                new SqlParameter("@ID_TinhTrangCCTiengAnh", model.ID_TinhTrangCCTiengAnh),
                new SqlParameter("@NguoiThan", model.NguoiThan),
                new SqlParameter("@DienThoaiNguoiThan", model.DienThoaiNguoiThan),
                new SqlParameter("@NamSinhCon1", model.NamSinhCon1),
                new SqlParameter("@NamSinhCon2", model.NamSinhCon2),
                new SqlParameter("@NamSinhCon3", model.NamSinhCon3),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@LyDoNghi", model.LyDoNghi),
                new SqlParameter("@NgayCapCCCD",((model.NgayCapCCCD.Year == 1 || model.NgayCapCCCD == null) ? (object)DBNull.Value : model.NgayCapCCCD)),
                new SqlParameter("@NgayCapMaSoThue",((model.NgayCapMaSoThue.Year == 1 || model.NgayCapMaSoThue == null) ? (object)DBNull.Value : model.NgayCapMaSoThue)),
                new SqlParameter("@NgayBatDauHopDong",((model.NgayBatDauHopDong.Year == 1 || model.NgayBatDauHopDong == null) ? (object)DBNull.Value : model.NgayBatDauHopDong)),
                new SqlParameter("@NgayKetThucHopDong",((model.NgayKetThucHopDong.Year == 1 || model.NgayKetThucHopDong == null) ? (object)DBNull.Value : model.NgayKetThucHopDong)),
                new SqlParameter("@NgayBatDauCCNghiepVu",((model.NgayBatDauCCNghiepVu.Year == 1 || model.NgayBatDauCCNghiepVu == null) ? (object)DBNull.Value : model.NgayBatDauCCNghiepVu)),
                new SqlParameter("@NgayKetThucCCNghiepVu",((model.NgayKetThucCCNghiepVu.Year == 1 || model.NgayKetThucCCNghiepVu == null) ? (object)DBNull.Value : model.NgayKetThucCCNghiepVu)),
                new SqlParameter("@NgayBatDauCCDuongThuy",((model.NgayBatDauCCDuongThuy.Year == 1 || model.NgayBatDauCCDuongThuy == null) ? (object)DBNull.Value : model.NgayBatDauCCDuongThuy)),
                new SqlParameter("@NgayKetThucCCDuongThuy",((model.NgayKetThucCCDuongThuy.Year == 1 || model.NgayKetThucCCDuongThuy == null) ? (object)DBNull.Value : model.NgayKetThucCCDuongThuy)),
                new SqlParameter("@NgayBatDauCCPCCC",((model.NgayBatDauCCPCCC.Year == 1 || model.NgayBatDauCCPCCC == null) ? (object)DBNull.Value : model.NgayBatDauCCPCCC)),
                new SqlParameter("@NgayKetThucCCPCCC",((model.NgayKetThucCCPCCC.Year == 1 || model.NgayKetThucCCPCCC == null) ? (object)DBNull.Value : model.NgayKetThucCCPCCC)),
                new SqlParameter("@NgayBatDauCCTiengAnh",((model.NgayBatDauCCTiengAnh.Year == 1 || model.NgayBatDauCCTiengAnh == null) ? (object)DBNull.Value : model.NgayBatDauCCTiengAnh)),
                new SqlParameter("@NgayKetThucCCTiengAnh",((model.NgayKetThucCCTiengAnh.Year == 1 || model.NgayKetThucCCTiengAnh == null) ? (object)DBNull.Value : model.NgayKetThucCCTiengAnh)),
                new SqlParameter("@ID_LoaiHopDong", model.ID_LoaiHopDong),
                new SqlParameter("@MaNganHang", model.MaNganHang),
                new SqlParameter("@TenNganHang", model.TenNganHang),
                new SqlParameter("@SoTaiKhoan", model.SoTaiKhoan),
                new SqlParameter("@ChuTaiKhoan", model.ChuTaiKhoan)
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_NhanVien_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<NhanVienModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (NhanVienModel model in list)
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
                        //Nếu năm sinh = 1 hoặ c ngày sinh là null thì truyền DBNUll vào store proceduce
                        new SqlParameter("@NgayBatDauLamViec", ((model.NgayBatDauLamViec.Year == 1 || model.NgayBatDauLamViec == null) ? (object)DBNull.Value : model.NgayBatDauLamViec)),
                        new SqlParameter("@NgayKetThucLamViec",((model.NgayKetThucLamViec.Year == 1 || model.NgayKetThucLamViec == null) ? (object)DBNull.Value : model.NgayKetThucLamViec)),
                        new SqlParameter("@TrangThai", model.TrangThai),
                        new SqlParameter("@ID_ChucVu", model.ID_ChucVu),
                        new SqlParameter("@ID_LoaiLaiDo", model.ID_LoaiLaiDo),
                        new SqlParameter("@ID_GioiTinh", model.ID_GioiTinh),
                        new SqlParameter("@ID_TinhTrangHoSo", model.ID_TinhTrangHoSo),
                        new SqlParameter("@MaTheBH", model.MaTheBH),
                        new SqlParameter("@ID_Tinh", model.ID_Tinh),
                        new SqlParameter("@Tinh", model.Tinh),
                        new SqlParameter("@ID_Quan", model.ID_Quan),
                        new SqlParameter("@Quan", model.Quan),
                        new SqlParameter("@ID_Phuong", model.ID_Phuong),
                        new SqlParameter("@Phuong", model.Phuong),
                        new SqlParameter("@DuongPho", model.DuongPho),
                        new SqlParameter("@NoiCapCCCD", model.NoiCapCCCD),
                        new SqlParameter("@MaSoThue", model.MaSoThue),
                        new SqlParameter("@CoQuanThueQuanLy", model.CoQuanThueQuanLy),
                        new SqlParameter("@ID_TinhTrangCCNghiepVu", model.ID_TinhTrangCCNghiepVu),
                        new SqlParameter("@ID_TinhTrangCCDuongThuy", model.ID_TinhTrangCCDuongThuy),
                        new SqlParameter("@ID_TinhTrangCCPCCC", model.ID_TinhTrangCCPCCC),
                        new SqlParameter("@ID_TinhTrangCCTiengAnh", model.ID_TinhTrangCCTiengAnh),
                        new SqlParameter("@NguoiThan", model.NguoiThan),
                        new SqlParameter("@DienThoaiNguoiThan", model.DienThoaiNguoiThan),
                        new SqlParameter("@NamSinhCon1", model.NamSinhCon1),
                        new SqlParameter("@NamSinhCon2", model.NamSinhCon2),
                        new SqlParameter("@NamSinhCon3", model.NamSinhCon3),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@LyDoNghi", model.LyDoNghi),
                        new SqlParameter("@NgayCapCCCD",((model.NgayCapCCCD.Year == 1 || model.NgayCapCCCD == null) ? (object)DBNull.Value : model.NgayCapCCCD)),
                        new SqlParameter("@NgayCapMaSoThue",((model.NgayCapMaSoThue.Year == 1 || model.NgayCapMaSoThue == null) ? (object)DBNull.Value : model.NgayCapMaSoThue)),
                        new SqlParameter("@NgayBatDauHopDong",((model.NgayBatDauHopDong.Year == 1 || model.NgayBatDauHopDong == null) ? (object)DBNull.Value : model.NgayBatDauHopDong)),
                        new SqlParameter("@NgayBatDauCCNghiepVu",((model.NgayBatDauCCNghiepVu.Year == 1 || model.NgayBatDauCCNghiepVu == null) ? (object)DBNull.Value : model.NgayBatDauCCNghiepVu)),
                        new SqlParameter("@NgayKetThucCCNghiepVu",((model.NgayKetThucCCNghiepVu.Year == 1 || model.NgayKetThucCCNghiepVu == null) ? (object)DBNull.Value : model.NgayKetThucCCNghiepVu)),
                        new SqlParameter("@NgayBatDauCCDuongThuy",((model.NgayBatDauCCDuongThuy.Year == 1 || model.NgayBatDauCCDuongThuy == null) ? (object)DBNull.Value : model.NgayBatDauCCDuongThuy)),
                        new SqlParameter("@NgayKetThucCCDuongThuy",((model.NgayKetThucCCDuongThuy.Year == 1 || model.NgayKetThucCCDuongThuy == null) ? (object)DBNull.Value : model.NgayKetThucCCDuongThuy)),
                        new SqlParameter("@NgayBatDauCCPCCC",((model.NgayBatDauCCPCCC.Year == 1 || model.NgayBatDauCCPCCC == null) ? (object)DBNull.Value : model.NgayBatDauCCPCCC)),
                        new SqlParameter("@NgayKetThucCCPCCC",((model.NgayKetThucCCPCCC.Year == 1 || model.NgayKetThucCCPCCC == null) ? (object)DBNull.Value : model.NgayKetThucCCPCCC)),
                        new SqlParameter("@NgayBatDauCCTiengAnh",((model.NgayBatDauCCTiengAnh.Year == 1 || model.NgayBatDauCCTiengAnh == null) ? (object)DBNull.Value : model.NgayBatDauCCTiengAnh)),
                        new SqlParameter("@NgayKetThucCCTiengAnh",((model.NgayKetThucCCTiengAnh.Year == 1 || model.NgayKetThucCCTiengAnh == null) ? (object)DBNull.Value : model.NgayKetThucCCTiengAnh)),
                        new SqlParameter("@NgayKetThucHopDong",((model.NgayKetThucHopDong.Year == 1 || model.NgayKetThucHopDong == null) ? (object)DBNull.Value : model.NgayKetThucHopDong)),
                        new SqlParameter("@ID_LoaiHopDong", model.ID_LoaiHopDong),
                        new SqlParameter("@ID_ToNhom", model.ID_ToNhom)
                        //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_NhanVien_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
                
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public List<NhanVienModel> InsertOrUpdateMulti2(List<NhanVienModel> list)
        {
            List<NhanVienModel> result = new List<NhanVienModel>();

            try
            {
                //List<TransactionModel> param = new List<TransactionModel>();
                foreach (NhanVienModel model in list)
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
                        //Nếu năm sinh = 1 hoặ c ngày sinh là null thì truyền DBNUll vào store proceduce
                        new SqlParameter("@NgayBatDauLamViec", ((model.NgayBatDauLamViec.Year == 1 || model.NgayBatDauLamViec == null) ? (object)DBNull.Value : model.NgayBatDauLamViec)),
                        new SqlParameter("@NgayKetThucLamViec",((model.NgayKetThucLamViec.Year == 1 || model.NgayKetThucLamViec == null) ? (object)DBNull.Value : model.NgayKetThucLamViec)),
                        new SqlParameter("@TrangThai", model.TrangThai),
                        new SqlParameter("@ID_ChucVu", model.ID_ChucVu),
                        new SqlParameter("@ID_LoaiLaiDo", model.ID_LoaiLaiDo),
                        new SqlParameter("@ID_GioiTinh", model.ID_GioiTinh),
                        new SqlParameter("@ID_TinhTrangHoSo", model.ID_TinhTrangHoSo),
                        new SqlParameter("@MaTheBH", model.MaTheBH),
                        new SqlParameter("@ID_Tinh", model.ID_Tinh),
                        new SqlParameter("@Tinh", model.Tinh),
                        new SqlParameter("@ID_Quan", model.ID_Quan),
                        new SqlParameter("@Quan", model.Quan),
                        new SqlParameter("@ID_Phuong", model.ID_Phuong),
                        new SqlParameter("@Phuong", model.Phuong),
                        new SqlParameter("@DuongPho", model.DuongPho),
                        new SqlParameter("@NoiCapCCCD", model.NoiCapCCCD),
                        new SqlParameter("@MaSoThue", model.MaSoThue),
                        new SqlParameter("@CoQuanThueQuanLy", model.CoQuanThueQuanLy),
                        new SqlParameter("@ID_TinhTrangCCNghiepVu", model.ID_TinhTrangCCNghiepVu),
                        new SqlParameter("@ID_TinhTrangCCDuongThuy", model.ID_TinhTrangCCDuongThuy),
                        new SqlParameter("@ID_TinhTrangCCPCCC", model.ID_TinhTrangCCPCCC),
                        new SqlParameter("@ID_TinhTrangCCTiengAnh", model.ID_TinhTrangCCTiengAnh),
                        new SqlParameter("@NguoiThan", model.NguoiThan),
                        new SqlParameter("@DienThoaiNguoiThan", model.DienThoaiNguoiThan),
                        new SqlParameter("@NamSinhCon1", model.NamSinhCon1),
                        new SqlParameter("@NamSinhCon2", model.NamSinhCon2),
                        new SqlParameter("@NamSinhCon3", model.NamSinhCon3),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@LyDoNghi", model.LyDoNghi),
                        new SqlParameter("@NgayCapCCCD",((model.NgayCapCCCD.Year == 1 || model.NgayCapCCCD == null) ? (object)DBNull.Value : model.NgayCapCCCD)),
                        new SqlParameter("@NgayCapMaSoThue",((model.NgayCapMaSoThue.Year == 1 || model.NgayCapMaSoThue == null) ? (object)DBNull.Value : model.NgayCapMaSoThue)),
                        new SqlParameter("@NgayBatDauHopDong",((model.NgayBatDauHopDong.Year == 1 || model.NgayBatDauHopDong == null) ? (object)DBNull.Value : model.NgayBatDauHopDong)),
                        new SqlParameter("@NgayBatDauCCNghiepVu",((model.NgayBatDauCCNghiepVu.Year == 1 || model.NgayBatDauCCNghiepVu == null) ? (object)DBNull.Value : model.NgayBatDauCCNghiepVu)),
                        new SqlParameter("@NgayKetThucCCNghiepVu",((model.NgayKetThucCCNghiepVu.Year == 1 || model.NgayKetThucCCNghiepVu == null) ? (object)DBNull.Value : model.NgayKetThucCCNghiepVu)),
                        new SqlParameter("@NgayBatDauCCDuongThuy",((model.NgayBatDauCCDuongThuy.Year == 1 || model.NgayBatDauCCDuongThuy == null) ? (object)DBNull.Value : model.NgayBatDauCCDuongThuy)),
                        new SqlParameter("@NgayKetThucCCDuongThuy",((model.NgayKetThucCCDuongThuy.Year == 1 || model.NgayKetThucCCDuongThuy == null) ? (object)DBNull.Value : model.NgayKetThucCCDuongThuy)),
                        new SqlParameter("@NgayBatDauCCPCCC",((model.NgayBatDauCCPCCC.Year == 1 || model.NgayBatDauCCPCCC == null) ? (object)DBNull.Value : model.NgayBatDauCCPCCC)),
                        new SqlParameter("@NgayKetThucCCPCCC",((model.NgayKetThucCCPCCC.Year == 1 || model.NgayKetThucCCPCCC == null) ? (object)DBNull.Value : model.NgayKetThucCCPCCC)),
                        new SqlParameter("@NgayBatDauCCTiengAnh",((model.NgayBatDauCCTiengAnh.Year == 1 || model.NgayBatDauCCTiengAnh == null) ? (object)DBNull.Value : model.NgayBatDauCCTiengAnh)),
                        new SqlParameter("@NgayKetThucCCTiengAnh",((model.NgayKetThucCCTiengAnh.Year == 1 || model.NgayKetThucCCTiengAnh == null) ? (object)DBNull.Value : model.NgayKetThucCCTiengAnh)),
                        new SqlParameter("@NgayKetThucHopDong",((model.NgayKetThucHopDong.Year == 1 || model.NgayKetThucHopDong == null) ? (object)DBNull.Value : model.NgayKetThucHopDong)),
                        new SqlParameter("@ID_LoaiHopDong", model.ID_LoaiHopDong),
                        new SqlParameter("@ID_ToNhom", model.ID_ToNhom)
                        //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                    };
                    //TransactionModel tranparam = new TransactionModel();
                    //tranparam.procName = "sp_NhanVien_InsertOrUpdate";
                    //tranparam.procParams = pars;
                    //param.Add(tranparam);
                    object ids = helper.ExecuteScalar("sp_NhanVien_InsertOrUpdate", pars);
                    int ID = int.Parse(ids.ToString());
                    model.ID = ID;
                    result.Add(model);
                }
                //bool success = helper.ExecuteTransaction(param);
                return result;

            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_InsertOrUpdate " + ex.Message);
            }

            return result;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_Delete", pars);
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
                log.Error("sp_NhanVien_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_DeleteMulti", pars);
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
                log.Error("sp_NhanVien_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool UpdateTrangThaiStop(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID ),
                    //new SqlParameter("@ID_TrangThai",ID_TrangThai ),

                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_StopWork", pars);
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
                log.Error("sp_NhanVien_StopWork " + ex.Message);
                return false;
            }
        }

        public bool UpdateTrangThaiStart(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID ),
                    //new SqlParameter("@ID_TrangThai",ID_TrangThai ),

                };
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_StartWork", pars);
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
                log.Error("sp_NhanVien_StartWork " + ex.Message);
                return false;
            }
        }



    }
}