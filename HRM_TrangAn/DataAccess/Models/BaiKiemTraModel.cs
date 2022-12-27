using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BaiKiemTraModel
    {
        public int ID { get; set; }
        public string TenBaiKiemTra { get; set; }
        public DateTime NgayTao { get; set; }
        public int ID_HocSinh { get; set; }
        public List<AnhBaiKiemTraModel> lstAnh { get; set; }
    }
}