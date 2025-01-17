using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TrucDemModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public DateTime Ngay { get; set; }
        public int TrangThai { get; set; }
        public decimal PhuCap { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public List<ChamCongNhanVienModel> lstChamCong { get; set;}
    }

    public class CountTrucDemModel
    {
        public int SoNhanVien_PhanCong { get; set; }
        public DateTime Ngay { get; set; }
    }
}