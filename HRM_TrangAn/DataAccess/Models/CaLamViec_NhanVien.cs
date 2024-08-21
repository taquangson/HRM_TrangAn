using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CaLamViec_NhanVienModel
    {
        public int ID { get; set; }
        public int ID_CaLamViec { get; set; }
        public int ID_TaiKhoan { get; set; }
        public int ID_PhongBan { get; set; }
        public DateTime NgayLamViec { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public int CreateBy { get; set; }
    }
}