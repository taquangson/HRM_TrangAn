using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSuThongBaoModel
    {
        public int ID_ThongBao { get; set; }
        public int ID_Lop { get; set; }
        public string UserName { get; set; }
        public string NoiDungRieng { get; set; }
    }
}