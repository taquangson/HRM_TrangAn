using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class MauTinNhanModel
    {
        public long ID { get; set; }
        public int SoLuongThamSo { get; set; }
        public string TenMauTinNhan { get; set; }
        public int TrangThai { get; set; }
        public string NoiDungMau { get; set; }
        public string MaGuiTin { get; set; }
        public DateTime NgayTao { get; set; }

    }
}