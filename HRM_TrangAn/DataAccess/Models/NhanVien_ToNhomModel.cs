using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NhanVien_ToNhomModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_ToNhom { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public int IsToTruong { get; set; }
        public int IsToPho { get; set; }
    }
}