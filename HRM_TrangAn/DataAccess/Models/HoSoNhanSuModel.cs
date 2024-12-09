using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class HoSoNhanSuModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public string MaNhanVien { get; set; }
        public string TenDayDu { get; set; }
        public string SoDienThoai { get; set; }
        public string CCCD { get; set; }
        public DateTime NgayCapCCCD { get; set; }
        public string NoiCapCCCD { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public DateTime NgaySinh { get; set; }
        public DateTime NgayBatDauLamViec { get; set; }
        public DateTime NgayKetThucLamViec { get; set; }
        public int TrangThai { get; set; }
        public int ID_ChucVu { get; set; }
        public string TenPhongBan { get; set; }
        public int ID_GioiTinh { get; set; }
        public int ID_LoaiHopDong { get; set; }
        public DateTime NgayBatDauHopDong { get; set; }
        public DateTime NgayKetThucHopDong { get; set; }
        public DateTime NgayCapMaSoThue { get; set; }
        public string CoQuanThueQuanLy { get; set; }
        public string MaSoThue { get; set; }
        public string MaTheBH { get; set; }
        public string Tinh { get; set; }
        public string Quan { get; set; }
        public string Phuong { get; set; }
        public string DuongPho { get; set; }
        public string SoTaiKhoan { get; set; }
        public string ChuTaiKhoan { get; set; }
        public string TenNganHang { get; set; }
        public string MaNganHang { get; set; }
        public string GhiChu { get; set; }
        public string AnhDaiDien { get; set; }
        public List<File_NhanVienModel> files { get; set; }

    }
}