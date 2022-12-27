using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NhanVien_KeHoachModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_KeHoach { get; set; }
        public float Cong { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }

        public string TenDayDu { get; set; }
        public string MaToNhom { get; set; }
        public string MaThuyen { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
        public string MaNhanVien { get; set; }
    }
}