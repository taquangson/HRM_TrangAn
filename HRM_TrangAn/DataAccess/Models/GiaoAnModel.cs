using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class GiaoAnModel
    {
        public int ID { get; set; }
        public int ID_Lop { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_Ca { get; set; }
        public DateTime NgayHoc { get; set; }
        public string TenBai { get; set; }
        public string BaiTap { get; set; }
    }
}