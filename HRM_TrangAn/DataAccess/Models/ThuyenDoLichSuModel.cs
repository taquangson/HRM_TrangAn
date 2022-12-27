using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ThuyenDoLichSuModel
    {
        public int ID { get; set; }

        public int ID_Thuyen { get; set; }

        public int ID_NhanVien { get; set; }

        public DateTime NgayTao { get; set; }

        public int TrangThai { get; set; }

    }
}