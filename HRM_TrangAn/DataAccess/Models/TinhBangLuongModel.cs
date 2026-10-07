using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TinhBangLuongModel
    {
        public int ID_HoSoNhanSu { get; set; }
        public int ID_TaiKhoan { get; set; }
        public int ID_PhongBan { get; set; }
        public float SoCong { get; set; }
        public float XuatAn { get; set; }
        public int CongChuanTheoThang { get; set; }
        public float CongChuan { get; set; }
        public float SoCongLeTet_CT { get; set; }
        public float SoCongLeTet_TV { get; set; }
        public float TrucDem { get; set; }
        public float TrucDemDenTran { get; set; }
        public DateTime NgayBatDauHoppDong { get; set; }
        public List<ChinhSachLuong_NhanVienModel> listChinhSachLuong { get; set; }
        public decimal TongTien { get; set; }
    }
}