using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichSuThaoTacBangCongModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public int Thang { get; set; }
        public int Nam { get; set; }
        public DateTime ThoiGianGuiMail { get; set; }
        public DateTime ThoiGianXemBangCong { get; set; }
        public DateTime ThoiGianChotBangCong { get; set; }
        public string KeyEvent { get; set; }
        public string Link { get; set; }
    }
}