using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DangKyHocModel
    {
        public int ID { get; set; }
        public int ID_Lop { get; set; }
        public string TenLop { get; set; }
        public int ID_HocSinh { get; set; }
        public string TenHocSinh { get; set; }
        public string User_DangKy { get; set; }
        public DateTime NgayDangKy { get; set; }
        public int TrangThai { get; set; }
    }
}