using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DiemDanhModel
    {
        public long ID { get; set; }
        public int ID_Lop { get; set; }
        public int ID_HocSinh { get; set; }
        public DateTime ThoiGianVaoLop { get; set; }
        public int ID_NhanVien { get; set; }
        public int CoPhep { get; set; } // -1: Nghỉ ko phép; 0: Có mặt; 1: Nghỉ có phép
        public int YeuCauTraoDoi { get; set; }
        public string GhiChu { get; set; }
        public double Diem { get; set; }
        public int HocDuoi { get; set; }
        public int Ca { get; set; }
    }
}