using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NgayNghiPhepModel
    {
        public int ID { get; set; }
        public DateTime NgayNghi { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public int ID_NguoiTao { get; set; }
        public int ID_NguoiSua { get; set; }
    }
}