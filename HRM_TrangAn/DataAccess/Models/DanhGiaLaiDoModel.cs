using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhGiaLaiDoModel
    {
        public string STT { get; set; }
        public string CauHoi { get; set; }
        public string TraLoi { get; set; }
        public string MaCauHoi { get; set; }
        public DateTime NgayTao { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public float DiemDanhGia { get; set; }
        public int TrangThai { get; set; }
    }
}