using NPOI.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChinhSachLuongModel
    {
        public long ID { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
        public int KyHanThanhToan { get; set; }
        public int ID_LoaiHopDong { get; set; }
        public int Loai { get; set; }
        public string GhiChu { get; set; }
    }
}