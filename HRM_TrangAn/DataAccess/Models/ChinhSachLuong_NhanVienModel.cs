using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChinhSachLuong_NhanVienModel
    {
        public int ID { get; set; }
        public int ID_ChinhSachLuong { get; set; }
        public string TenChinhSach {  get; set; }
        public string Ma { get; set; }
        public int ID_LoaiHopDong { get; set; }
        public int KyHanThanhToan { get; set; }
        public decimal MucLuong { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public int ID_NguoiApDung { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        
        
        public decimal TienLuong { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public string SoDienThoai { get; set; }
        public string ID_GioiTinh { get; set; }
        public string DiaChi { get; set; }
    }
}