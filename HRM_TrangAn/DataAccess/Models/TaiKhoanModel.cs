using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TaiKhoanModel
    {
        public int ID { get; set; }
        public string TenDayDu { get; set; }
        public string TaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string DienThoai { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public int TrangThai { get; set; }
        public int Role { get; set; }
        public string ChucVu { get; set; }
        public int ID_ChiNhanh { get; set; }
        public string TenChiNhanh { get; set; }
        public string DiaChiChiNhanh { get; set; }
        public string DienThoaiChiNhanh { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public List<HocSinhModel> lstHocSinh { get; set; }
    }
}