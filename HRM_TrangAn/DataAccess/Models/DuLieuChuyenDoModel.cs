using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DuLieuChuyenDoModel
    {
        public int ID_TaiKhoan { get; set; }
        public int DiemDau { get; set; }
        public int DiemGiua { get; set; }
        public int DiemCuoi { get; set; }
        public DateTime Dau { get; set; }
        public DateTime Giua { get; set; }
        public DateTime Cuoi { get; set; }
    }
}