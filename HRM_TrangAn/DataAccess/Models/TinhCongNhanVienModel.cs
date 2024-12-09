using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TinhCongNhanVienModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public TaiKhoanModel TaiKhoan { get; set; }
        public DateTime Ngay { get; set; }
        public int ID_CaLamViec { get; set; }
        public float SoCong { get; set; }
        public float SoCongTangCa { get; set; }
        public float XuatAn { get; set; }
        public CaLamViecModel CaLam { get; set; }
        public DateTime BatDauCa { get; set; }
        public DateTime KetThucCa { get; set; }
        public int DaXuLy { get; set; }
        public int DaTinhCong { get; set; }
        public List<ChamCongNhanVienModel> lstChamCong { get; set; }
    }
}