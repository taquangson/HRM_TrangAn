using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class SoDuBuoiHocModel
    {
        public int ID { get; set; }
        public int ID_HocSinh { get; set; }
        public string TenHocSinh { get; set; }
        public int ID_Lop { get; set; }
        public string TenLop { get; set; }
        public int HocChinh_DaMua { get; set; }
        public int HocDuoi_DaMua { get; set; }
        public int HocChinh_ConLai { get; set; }
        public int HocDuoi_ConLai { get; set; }
    }
}