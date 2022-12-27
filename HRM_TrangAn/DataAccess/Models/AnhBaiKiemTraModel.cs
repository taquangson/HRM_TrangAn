using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class AnhBaiKiemTraModel
    {
        public long ID { get; set; }
        public string DuongDan { get; set; }
        public DateTime NgayTao { get; set; }
        public int ID_BaiKiemTra { get; set; }
    }
}