using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CaLamViecNhanVienViewModel
    {
        public int ID_CaLamViec { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_NhomNhanVien { get; set; }
        public DateTime BatDau { get; set; }
        public DateTime KetThuc { get; set; }
        public int CreateBy { get; set; }
    }
}