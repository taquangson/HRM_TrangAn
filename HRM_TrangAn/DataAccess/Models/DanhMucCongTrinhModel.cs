using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhMucCongTrinhModel
    {
        public int ID { get; set; }
        public string TenCongTrinh { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }

    }
}