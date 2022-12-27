using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhMucCauHoiModel
    {
        public int ID { get; set; }
        public string TenDanhMucCauHoi { get; set; }
        public int ID_Cha { get; set; }
        public int TrangThai { get; set; }
    }
}