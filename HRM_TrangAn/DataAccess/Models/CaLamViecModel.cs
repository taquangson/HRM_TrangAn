using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CaLamViecModel
    {
        public int ID { get; set; }
        public string TenCa { get; set; }
        public string MaCa { get; set; }
        public int IsCaDem { get; set; }
        public TimeSpan BatDau { get; set; }
        public TimeSpan KetThuc { get; set; }
        public TimeSpan BatDauTinhCa { get; set; }
        public TimeSpan KetThucTinhCa { get; set; }
        public float SoCong { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public float SoGioLamViec { get; set; }
        public float SoGioNghi { get; set; }

        public List<CaLamViec_PhanBoCongModel> PhanBo { get; set; }  

    }
}