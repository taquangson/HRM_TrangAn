using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DonSuaChuaThuyenModel
    {
        public int ID { get; set; }

        public int ID_ThuyenDo { get; set; }

        public string SoDo { get; set; }

        public string LyDo { get; set; }

        public string SoTienSua { get; set; }

        public DateTime NgayHoanThanh { get; set; }

        public DateTime NgayLapPhieu { get; set; }

        public DateTime NgayTao { get; set; }

        public int TrangThai { get; set; }

        public string GhiChu1 { get; set; }

        public string GhiChu2 { get; set; }

        public string GhiChu3 { get; set; }
        public string GhiChu4 { get; set; }

    }
}