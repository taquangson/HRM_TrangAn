using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NghiPhepModel
    {
        public int ID { get; set; }

        public int ID_NhanVien { get; set; }

        public string TenNhanVien { get; set; }

        public string MaToNhom { get; set; }

        public string MaThuyen { get; set; }

        public string GhiChu { get; set; }

        public int Loai { get; set; }

        public DateTime NgayNghi { get; set; }
    }
}