using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace HRM_TrangAn.DataAccess.Models
{
    public class PhongBan_CongChuanModel
    {
        public int ID_PhongBan { get; set; }
        public string TenPhongBan { get; set; }
        public decimal CongChuan { get; set; }
        public int CongChuanTheoThang { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
    }
}