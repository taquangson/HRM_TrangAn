using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChucDanhModel
    {
        public int ID { get; set; }

        public string MaChucDanh { get; set; }

        public string TenChucDanh { get; set; }

        public DateTime NgayTao { get; set; }
    }
}