using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChamCongMonitorModel
    {
        public int ID { get; set; }
        public string MaThuyen { get; set; }
        public DateTime ThoiGian { get; set; }
        public string TenDiem { get; set; }
        public string DiaDiem { get; set; }
        public string TenNhanVien { get; set; }
        public string MaNhanVien { get; set; }
    }
}