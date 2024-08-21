using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TaiLieuHoSoModel
    {
        public int ID { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public string TenTaiLieu { get; set; }
        public string FilePath { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }

    }
}