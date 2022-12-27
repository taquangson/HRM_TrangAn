using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChuyenDoModel
    {
        public int ID_ChuyenDo { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayDi { get; set; }
        public int ID_NhanVien { get; set; }
        public string MaNhanVien { get; set; }
        public string MaThuyen { get; set; }
        public int ID_Thuyen { get; set; }
        public string TenNhanVien { get; set; }
        public string TenTuyen { get; set; }
        public int ID_TuyenDo { get; set; }
        public int TrangThai { get; set; }
        public string GhiChu { get; set; }
        public string TenToNhom { get; set; }
        public string MaToNhom { get; set; }
        public List<ChamCongModel> lstChamCong { get; set; }
        public List<TuyenDo_DiemModel> lstDiemTuyen { get; set; }
        public int IsManager { get; set; }
        public int ChuyenDoHRM { get; set; }
        public int ChuyenDoThem { get; set; }
        public int SoLuotChamCong { get; set; }
    }
}