using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NguoiGiamSatModel
    {
        public int ID { get; set; }

        public int ID_TaiKhoan { get; set; }

        public string TenDayDu { get; set; }

        public string DienThoai { get; set; }

        public string DiaDiemLamViec { get; set; }

        public string GhiChu { get; set; }

        public int Loai { get; set; }
    }
}