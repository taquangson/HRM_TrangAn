using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NoCongModel
    {
        public int ID { get; set; }
        public string TenDayDu { get; set; }
        public string TenDayDuView { get; set; }
        public string MaNhanVien { get; set; }
        public string MaThuyen { get; set;}
        public float NoCong { get; set; }
        public string FileAnhDaiDien { get; set; }
    }
}