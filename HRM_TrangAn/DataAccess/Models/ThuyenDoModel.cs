using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ThuyenDoModel
    {
        public int ID { get; set; }

        public int ID_NhanVien { get; set; }

        public string MaThuyen { get; set; }

        public string MaNhanVien { get; set; }
        public string TenDayDu { get; set; }
        public int LoaiThuyen { get; set; }

        public int SoLanCap { get; set; }

        public string ChieuDai { get; set; }

        public string ChieuRong { get; set; }

        public string MauSon { get; set; }

        public DateTime NgayTao { get; set; }

        public int TrangThai { get; set; }

        public string RFID { get; set; }

        public int isEditNhanVien { get; set; }

    }
}