using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class PhuThuGiamTruModel
    {
        public int ID { get; set; }
        public int ID_PhieuThu { get; set; }
        public string LyDo { get; set; }
        public int Type { get; set; } // 0 = Phụ thu; 1 = Giảm trừ
        public float DonGia { get; set; }
        public int Nam { get; set; }
        public int Thang { get; set; }
        public int SoBuoi { get; set; }
        public int ID_Lop { get; set; }
        public string TenLop { get; set; }
        public int ID_PhieuHoc { get; set; }
    }
}