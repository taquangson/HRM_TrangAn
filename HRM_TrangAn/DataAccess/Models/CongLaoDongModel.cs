using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CongLaoDongModel
    {
        public int ID_NhanVien { get; set; }

        public int ID_ChuyenTo { get; set; }

        public int ID_KeHoach { get; set; }

        public int ID_ChuyenDo { get; set; }

        public int Loai { get; set; }

        public float SoCong { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime NgayTinhCong { get; set; }

    }
}