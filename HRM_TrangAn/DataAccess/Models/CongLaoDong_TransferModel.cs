using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CongLaoDong_TransferModel
    {
        public int ID { get; set; }
        public int ID_NhanVien_From { get; set; }
        public int ID_NhanVien_To { get; set; }
        public int ID_Taikhoan { get; set; }
        public int ID_ChuyenDo { get; set; }
        public int ID_KeHoach { get; set; }
        public int ID_ChuyenTo { get; set; }
        public string TenTaiKhoan { get; set; }
        public string NhanVienChuyen { get; set; }
        public string NhanVienNhan { get; set; }
        public DateTime NgayTao { get; set; }
    }
}