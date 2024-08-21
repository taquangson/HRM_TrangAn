using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ViewBangCongModel
    {
        public int ID_TaiKhoan { get; set; }
        public string TenDayDu { get; set; }
        public string Title { get; set; }
        public List<string> LichNghi { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public bool ShowbtnChotCong { get; set; }
    }
}