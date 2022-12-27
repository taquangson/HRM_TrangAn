using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class MayChamCong_DiemQuetTheModel
    {
        public int ID { get; set; }
        public int ID_DiemQuetThe { get; set; }
        public int ID_MayChamCong { get; set; }
        public string TenThietBi { get; set; }
        public string MaThietBi { get; set; }
        public string DiaChiIP { get; set; }
        public string Port { get; set; }

        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
    }
}