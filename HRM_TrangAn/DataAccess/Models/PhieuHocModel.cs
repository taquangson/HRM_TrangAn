using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class PhieuHocModel
    {
        public int ID { get; set; }
        public int ID_HocSinh { get; set; }
        public string TenHocSinh { get; set; }
        public int ID_NhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public int SoBuoi { get; set; }
        public DateTime NgayTao { get; set; }
        public float SoTien { get; set; }
        public string GhiChu { get; set; }
        public int ID_Lop { get; set; }
        public string TenLop { get; set; }
        public int HocDuoi { get; set; }
        public int Thang { get; set; }
        public int NamHoc { get; set; }
        public int SoBuoiDaHoc { get; set; }
        public int ID_ChiNhanh { get; set; }
        public int ID_PhieuThu { get; set; }
    }
}