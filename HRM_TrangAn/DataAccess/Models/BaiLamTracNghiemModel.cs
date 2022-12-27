using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BaiLamTracNghiemModel
    {
        public long ID { get; set; }
        public int ID_HocSinh { get; set; }
        public string TenHocSinh { get; set; }
        public DateTime NgaySinh { get; set; }
        public string DienThoaiMacDinh { get; set; }
        public int ID_DeThi { get; set; }
        public DateTime NgayGiao { get; set; }
        public DateTime? HanNopBai { get; set; }
        public DateTime? ThoiGianBatDau { get; set; }
        public DateTime? ThoiGianKetThuc { get; set; }
        public DateTime? HanNiemPhong { get; set; }
        public int GioiHanLanLam { get; set; }
        public int TrangThai { get; set; }
        public float Diem { get; set; }
        public List<LichSu_BaiLamTracNghiemModel> lstLichsu { get; set; }
        public List<BaiLamTracNghiem_ChiTietModel> lstChitiet { get; set; }
        public DeThiModel dethi { get; set; }
    }
}