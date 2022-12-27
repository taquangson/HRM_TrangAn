using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSuKetNoiMCCModel
    {
        public int ID_MayChamCong { get; set; }
        public string TenThietBi { get; set; }
        public string DiaChiIP { get; set; }
        public int TrangThaiKetNoi { get; set; }
        public DateTime ThoiGianKetNoi { get; set; }
        public string GhiChu { get; set; }
    }
}