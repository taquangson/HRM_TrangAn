using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChuyenToModel
    {
        public int ID { get; set; }

        public int ID_NhanVien { get; set; }

        public string TenNhanVien { get; set; }

        public string TenToNhom { get; set; }

        public string MaToNhom { get; set; }

        public string MaThuyen { get; set; }

        public string GhiChu { get; set; }

        public float Cong { get; set; }

        public DateTime NgayTao { get; set; }

        public List<NhanVien_ChuyenToModel> lstNhanVienChuyenTo { get; set; } // Param để insert + update + delete
        public List<NhanVienModel> lstNhanVien { get; set; } // Param để view datagrid
    }
}