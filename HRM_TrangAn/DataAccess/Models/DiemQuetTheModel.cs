using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DiemQuetTheModel
    {
        public int ID { get; set; }

        public string MaDiem { get; set; }

        public string TenDiem { get; set; }

        public string ThongTinThietBi { get; set; }

        public string DiaDiem { get; set; }

        public string DiaChiIP { get; set; }

        public string Port { get; set; }

        public DateTime NgayTao { get; set; }

        public int TrangThai { get; set; }

        public string GhiChu { get; set; }

        public List<MayChamCong_DiemQuetTheModel> lstMayChamCongDiemQuetThe { get; set; } // Param để insert + update + delete
        public List<MayChamCongModel> lstMayChamCong { get; set; } 

    }
}