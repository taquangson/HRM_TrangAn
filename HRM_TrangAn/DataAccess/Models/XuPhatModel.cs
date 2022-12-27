using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class XuPhatModel
    {
        public int ID { get; set; }
        public float SoTien { get; set; }
        public string LyDo { get; set; }
        public string GhiChu { get; set; }
        public DateTime NgayPhat { get; set; }
        public int ID_NhanVien { get; set; }
        public string MaThuyen { get; set; }
        public string TenToNhom { get; set; }
        public string MaToNhom { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public List<NhanVien_XuPhatModel> lstNhanVienXuPhat { get; set; } // Param để insert + update + delete
        public List<NhanVienModel> lstNhanVien { get; set; } // Param để view datagrid
    }
}