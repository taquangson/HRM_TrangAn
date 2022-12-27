using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace HRM_TrangAn.DataAccess.Models
{
    public class CauHinhThuongDanhGiaModel
    {
        public int ID { get; set; } 
        public int TuSo { get; set; } 
        public int DenSo { get; set; } 
        public float ThuongCong { get; set; } 
        public float ThuongTien { get; set; } 
        public DateTime NgayTao { get; set; }
    }
}
