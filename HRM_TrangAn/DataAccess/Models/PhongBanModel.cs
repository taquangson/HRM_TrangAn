using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class PhongBanModel
    {
        public int ID { get; set; }
        public string TenPhongBan { get; set; }
        public int ID_PhongBanCha { get; set; }
        public int ID_ChiNhanh { get; set; }
        public DateTime NgayTao { get; set; }
    }
}