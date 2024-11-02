using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSuChuyenCongModel
    {
        public int ID { get; set; }
        public int ID_NguoiChuyenCong { set; get; }
        public int ID_NguoiNhanCong { set; get; }
        public int ID_NguoiTao { set; get; }
        public DateTime NgayTao { set; get; }
        public int TrangThai { set; get; }
        public float CongChuyen { set; get; }
        public string TenNguoiChuyen {  get; set; }
        public string TenNguoiNhan { set; get; }
        public string TenNguoiTao { set; get; }
        public DateTime NgayTinhCong { set; get; }

    }
}