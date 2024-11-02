using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChinhSachLuong_CauHinhModel
    {
        public int ID { get; set; }
        public int ID_ChinhSachLuong { get; set; }
        public float CongChuan { get; set; }
        public float DoanhSoToiThieu { get; set; }
        public int LuyKe_DoanhSoToiThieu { get; set; }
        public float LuongKhachToiThieu { get; set; }
        public int LuyKe_LuongKhachToiThieu { get; set; }
        public float NgayCongToiThieu { get; set; }
        public int LuyKe_NgayCongToiThieu { get; set; }
        public int ID_NguoiApDung { get; set; }
        public int TrangThai { get; set; }
        public string GhiChu {  get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
    }
}