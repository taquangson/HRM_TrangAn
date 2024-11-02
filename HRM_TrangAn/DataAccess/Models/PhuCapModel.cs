using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class PhuCapModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }
        public decimal Tien { get; set; }
        public string NoiDung { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get;set; }
        public DateTime NgayHuongPhuCap { get;set; }
        public int ID_NguoiTao { get; set; }
        public string TenNhanVien { get; set; }
        public string MaNhanVien { get; set; }
        public string TenNguoiTao { get; set; }
    }
}