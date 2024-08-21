using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DangKyLichNghiModel
    {
        public int ID { get; set; }        
        public int ID_TaiKhoan { get; set; }
        public string TenDayDu { get; set; }
        public int Loai { get; set; }
        public string TenLoai { get; set; }
        public string KyHieu { get; set; }
        public string KyHieuMau { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public DateTime BatDauNghi { get; set; }
        public DateTime KetThucNghi { get; set; }
        public string GhiChu { get; set; }
        public string[] Tag_NhanVien { get; set; }
        public string Tags_NhanVien { get; set; }
        public DateTime NgayPheDuyet { get; set; }

    }
}