using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DeThiModel
    {
        public int ID { get; set; }
        public string TenDeThi { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public int ID_MonHoc { get; set; }
        public string TenMonHoc { get; set; }
        public int ID_TaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }
        public int ID_Khoi { get; set; }
        public string TenKhoi { get; set; }
        public float ThoiGian { get; set; }
        public float Diem { get; set; }
        public List<DeThi_ChiTietModel> lstChiTiet { get; set; }
        public List<CauHoiModel> lstCauHoi { get; set; }
        public List<DeThi_CauHoiModel> lstDeThiCauHoi { get; set; }
    }
}