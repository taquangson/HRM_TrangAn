using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSuThuongDanhGiaModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }        
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public float DiemDanhGia { get; set; }        
        public int LuotDanhGia { get; set; }        
        public int STT { get; set; }        
        public int TuSo { get; set; }        
        public int DenSo { get; set; }        
        public int ThuongCong { get; set; }        
        public int ThuongTien { get; set; }        
        public int ID_CauHinhThuong { get; set; }        
        public int Thang { get; set; }        
        public int Quy { get; set; }        
        public int Nam { get; set; }        
        public DateTime NgayTao { get; set; }        
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
    }
}
