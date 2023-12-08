using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NhanVienModel
    {
        public int ID { get; set; }
        public string MaNhanVien { get; set; }

        public string TenDayDu { get; set; }

        public string SoDienThoai { get; set; }

        public string Email { get; set; }

        public string DiaChi { get; set; }

        public DateTime NgaySinh { get; set; }
        public DateTime NgayBatDauLamViec { get; set; }
        public DateTime NgayKetThucLamViec { get; set; }

        public string CCCD { get; set; }

        public int TrangThai { get; set; }
        public string TinhTrangLamViec { get; set; }

        public int ID_ChiNhanh { get; set; }

        public int ID_Thuyen { get; set; }

        public string MaThuyen { get; set; }

        public int ID_LoaiThuyen { get; set; }

        public int ID_ChucVu { get; set; }

        public int ID_LoaiLaiDo { get; set; }

        public int ID_GioiTinh { get; set; }

        public int ID_TinhTrangHoSo { get; set; }

        public string MaTheBH { get; set; }

        public int ID_Tinh { get; set; }

        public string Tinh { get; set; }

        public int ID_Quan { get; set; }

        public string Quan { get; set; }

        public int ID_Phuong { get; set; }

        public string Phuong { get; set; }

        public string DuongPho { get; set; }

        public DateTime NgayCapCCCD { get; set; }

        public string NoiCapCCCD { get; set; }

        public string MaSoThue { get; set; }

        public DateTime NgayCapMaSoThue { get; set; }

        public string CoQuanThueQuanLy { get; set; }

        public int ID_TinhTrangCCNghiepVu { get; set; }

        public int ID_TinhTrangCCDuongThuy { get; set; }

        public int ID_TinhTrangCCPCCC { get; set; }

        public int ID_TinhTrangCCTiengAnh { get; set; }

        public string NguoiThan { get; set; }

        public string DienThoaiNguoiThan { get; set; }

        public string NamSinhCon1 { get; set; }

        public string NamSinhCon2 { get; set; }

        public string NamSinhCon3 { get; set; }

        public string GhiChu { get; set; }

        public int isEditThuyen { get; set; }

        public int ID_LoaiHopDong { get; set; }

        public DateTime NgayBatDauHopDong { get; set; }

        public DateTime NgayKetThucHopDong { get; set; }

        public int ID_ToNhom { get; set; }

        public string MaToNhom { get; set; }

        public string TenToNhom { get; set; }

        public string MaNganHang { get; set; }
        public string TenNganHang { get; set; }
        public string SoTaiKhoan { get; set; }
        public string ChuTaiKhoan { get; set; }

        public DateTime NgayBatDauCCNghiepVu { get; set; }
        public DateTime NgayKetThucCCNghiepVu { get; set; }
        public DateTime NgayBatDauCCDuongThuy { get; set; }
        public DateTime NgayKetThucCCDuongThuy { get; set; }
        public DateTime NgayBatDauCCPCCC { get; set; }
        public DateTime NgayKetThucCCPCCC { get; set; }
        public DateTime NgayBatDauCCTiengAnh { get; set; }
        public DateTime NgayKetThucCCTiengAnh { get; set; }

        public List<NhanVien_ChucDanhModel> lstChucDanh { get; set; }
        public string TenChucDanh { get; set; }

        public string LyDoNghi { get; set; }

        public int IsToTruong { get; set; }

        public int IsToPho { get; set; }

        public List<File_NhanVienModel> lstFile { get; set; }
        public List<RatingLaiDoModel> rating { get; set; }
        public int CoLichSuLamViec { get; set; }
        public int CoTicke { get; set; }
        public File_NhanVienModel AnhDaiDien { get; set; }
        public string FileAnhDaiDien { get; set; }
        public int SoLanInThe { get; set; }
        public DateTime ThoiGianLamViec { get; set; }
        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }
    }
}