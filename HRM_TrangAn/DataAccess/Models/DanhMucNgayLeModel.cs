using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhMucNgayLeModel
    {
        public int ID { get; set; }
        public string TenNgayNghi { get; set; }
        public float SoNgayNghi { get; set; }
        public DateTime NgayBatDauNghi { get; set; }
        public DateTime NgayKetThucNghi { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public float TinhLuong { get; set; }

    }
}