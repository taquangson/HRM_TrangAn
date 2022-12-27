using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChiNhanhModels
    {
        public int ID { get; set; }
        public string TenChiNhanh { get; set; }
        public DateTime NgayTao { get; set; }
    }
}