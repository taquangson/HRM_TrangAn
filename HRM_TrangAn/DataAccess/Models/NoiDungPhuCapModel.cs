using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NoiDungPhuCapModel
    {
        public int ID { get; set; }
        public string Ten { get; set; }
        public string Ma { get; set; }
        public int Loai { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public int NguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
    }
}