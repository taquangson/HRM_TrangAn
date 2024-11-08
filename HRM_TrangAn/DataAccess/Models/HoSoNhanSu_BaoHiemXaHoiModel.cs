using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class HoSoNhanSu_BaoHiemXaHoiModel
    {
        public int ID { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public int ID_BaoHiemXaHoi { get; set; }
        public DateTime NgayTao {  get; set; }
        public int ID_NguoiTao { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien {  get; set; }
        public string SoDienThoai { get; set; }
        public string DiaChi { get; set; }
        public DateTime BatDauApDung { get; set; }
        public DateTime KetThucApDung { get; set; }
        public int TrangThai {  get; set; }

        public HoSoNhanSuModel hoSoNhanSu { get; set;}
    }
}