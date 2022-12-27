using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NhanVien_ChucDanhModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_ChucDanh { get; set; }
        public string TenChucDanh { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
    }
}