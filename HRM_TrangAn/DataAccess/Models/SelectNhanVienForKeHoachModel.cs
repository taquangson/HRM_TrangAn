using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class SelectNhanVienForKeHoachModel
    {
        public int IsToTruong { get; set; }

        public int IsToPho { get; set; }
        public int ID_ToNhom { get; set; }
        public int ID { get; set; }
        public string TenDayDu { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
        public string MaNhanVien { get; set; }
        public string TenToNhom { get; set; }
        public string MaToNhom { get; set; }
        public string MaThuyen { get; set; }
        public int CoLichSuLamViec { get; set; }
        public DateTime ThoiGianLamViec { get; set; }
    }
}