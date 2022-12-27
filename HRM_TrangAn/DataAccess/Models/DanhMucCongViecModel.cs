using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhMucCongViecModel
    {
        public int ID { get; set; }

        public string MaCongViec { get; set; }

        public string TenCongViec { get; set; }

        public DateTime NgayTao { get; set; }

        public int TrangThai { get; set; }

        public float Cong { get; set; }

        public string GhiChu { get; set; }

        public float ThoiGian { get; set; }

    }
}