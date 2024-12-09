using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class PhieuLuongModel
    {
        public int ID { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public string TenNhanVien { get; set; }
        public string MaNhanVien { get; set; }
        public string SoTaiKhoan { get; set; }
        public string MaNganHang { get; set; }
        public string TenNganHang { get; set; }
        public float SoNgayCongTrongThang { get; set; }
        public float SoNgayCongLeTet { get; set; }
        public int SoLuongSuatAn { get; set; }
        public decimal TongLuongNhan { get; set; }
        public decimal TongGiamTru { get; set; }
        public int Thang { get; set; }
        public int Nam { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public List<ChiTietPhieuLuongModel> listCTPLNhan { get; set; } 
        public List<ChiTietPhieuLuongModel> listCTPLGiam { get; set; }
    }
}