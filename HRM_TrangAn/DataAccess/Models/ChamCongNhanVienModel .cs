using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChamCongNhanVienModel
    {
        public int ID { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime ThoiGian { get; set; }
        public int ID_DiemQuetThe { get; set; }
        public string MaDiem { get; set; }
        public string TenDiem { get; set; }
        public string DiaDiem { get; set; }
        public string ThongTinThietBi { get; set; }
        public string DiaChiIP { get; set; }
        public int ID_TaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }


        public string EnrollNumber { get; set; }
        public int VerifyMode { get; set; }
        public int InOutMode { get; set; }
        public DateTime WorkDate { get; set; }
        public int Workcode { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}