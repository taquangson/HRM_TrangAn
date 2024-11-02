using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LaoDongThueKhoanModel
    {
        public int ID { get; set; }
        public float ThanhTien { get; set; }
        public int ID_CongViec { get; set; }
        public string TenCongViec { get; set; }
        public string GhiChu { get; set; }
        public DateTime NgayApDung { get; set; }
        public int ID_NhanVien { get; set; }
        public string MaThuyen { get; set; }
        public string TenToNhom { get; set; }
        public string MaToNhom { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public List<int> lstNhanVienPhatSinh { get; set; } // Param để insert + update + delete
    }
}