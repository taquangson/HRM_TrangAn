using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSu_BaiLamTracNghiemModel
    {
        public long ID_BaiLamTracNghiem { get; set; }
        public DateTime? ThoiGianBatDau { get; set; }
        public DateTime? ThoiGianKetThuc { get; set; }
        public float Diem { get; set; }
        public string ChiTiet { get; set; }
    }
}