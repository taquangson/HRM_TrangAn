using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ThongTinCongTyModel
    {
        public int ID { get; set; }

        public string MaCongTy { get; set; }

        public string TenCongTy { get; set; }

        public string PhoGiamDoc { get; set; }

        public string DiaChi { get; set; }

        public string BanQuanLy { get; set; }

        public string KeToan { get; set; }

        public string NguoiLap { get; set; }

        public DateTime NgayTao { get; set; }

        public int ID_NguoiLap { get; set; }

        public string GhiChu { get; set; }
        public int AutoGetData { get; set; }
        public int TimeLoopGetData { get; set; }
    }
}