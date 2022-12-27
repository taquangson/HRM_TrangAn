using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class RatingLaiDoModel
    {
        public int ID { get; set; }
        public DateTime NgayTao { get; set; }
        public string MaNhanVien { get; set; }
        public int ID_NhanVien { get; set; }
        public int Rate { get; set; }
        public string KhachHang { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
    }
}