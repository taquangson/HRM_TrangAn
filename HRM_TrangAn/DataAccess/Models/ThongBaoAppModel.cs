using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ThongBaoAppModel
    {
        public int ID { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string NoiDungRieng { get; set; }
        public string AnhDaiDien { get; set; }
        public string NoiDungHtml { get; set; }
        public int Loai { get; set; }
        public DateTime NgayTao { get; set; }
        public string Data { get; set; }
        public int TrangThai { get; set; }
    }
}