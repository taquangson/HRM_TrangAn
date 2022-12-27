using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class HocSinhModel
    {
        public int ID { get; set; }
        public int GioiTinh { get; set; }
        public string TenHocSinh { get; set; }
        public int ID_Truong { get; set; }
        public string TenTruong { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai1 { get; set; }
        public string DienThoai2 { get; set; }
        public string DienThoai3 { get; set; }
        public string DienThoaiMacDinh { get; set; }
        public DateTime NgaySinh { get; set; }
        public string PhuHuynh { get; set; }
        public int TrangThai { get; set; }
        public bool IsHocDuoi { get; set; }
        public long ID_DiemDanh { get; set; }
        public int CoPhep { get; set; }
        public int QuaGioDiemDanh { get; set; }
        public int ID_ChiNhanh { get; set; }

        public bool DaMuaPhieu { get; set; }
        public string GhiChu { get; set; }
        public double? Diem { get; set; }
        public int YeuCauTraoDoi { get; set; }
        public string AnhDaiDien { get; set; }
        public string NotifyID { get; set; }
        public string LopHoc { get; set; }
    }
}