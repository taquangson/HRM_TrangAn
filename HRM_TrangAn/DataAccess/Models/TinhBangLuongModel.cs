using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TinhBangLuongModel
    {
        public int ID_HoSoNhanSu { get; set; }
        public float SoCong { get; set; }
        public List<ChinhSachLuong_NhanVienModel> listChinhSachLuong { get; set; }
        public decimal TongTien { get; set; }
    }
}