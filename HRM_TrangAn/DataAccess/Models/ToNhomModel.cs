using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ToNhomModel
    {
        public int ID { get; set; }
        public string TenToNhom { get; set; }
        public string MaToNhom { get; set; }
        public string GhiChu { get; set; }
        public int SoLaoDong_Tong { get; set; }
        public int SoLaoDong_HoatDong { get; set; }
        public int SoLaoDong_DaTraDo { get; set; }
        public int SoLaoDong_TamNghi { get; set; }
        public int SoLaoDong_Nghi { get; set; }
        public List<NhanVien_ToNhomModel> lstNhanVienToNhom { get; set; } // Param để insert + update + delete
        public List<NhanVienModel> lstNhanVien { get; set; } // Param để view datagrid
    }
}