using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BangLuongModel
    {
        public int ID_ChinhSachLuong_NhanSu { get; set; }
        public int Ngay { get; set; }
        public int Tuan { get; set; }
        public int Thang { get; set; }
        public int Quy { get; set; }
        public int Nam { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public decimal TienLuong { get; set; }
        public int ID_ChinhSachLuong { get; set; }
        public int ID_NhanSu { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }

        public string MaChinhSachLuong { get; set; }
        public string TenChinhSachLuong { get; set; }

    }
}