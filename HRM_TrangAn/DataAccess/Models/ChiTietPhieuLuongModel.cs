using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChiTietPhieuLuongModel
    {
        public int ID { get; set; }
        public int ID_PhieuLuong{ get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
        public decimal SoTien { get; set; }
        public int Loai { get; set; }
    }
}