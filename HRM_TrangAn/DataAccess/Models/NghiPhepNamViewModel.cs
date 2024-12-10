using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class NghiPhepNamViewModel
    {
        public int ID_HoSoNhanSu { get; set; }
        public string TenDayDu { get; set; }
        public string MaNhanVien { get; set; }
        public int SoNgayNghiPhepHienTai { get; set; }
        public int SoNgayNghiPhepQuyDinh { get; set; } = 12;
        public List<NgayNghiPhepModel> ListNgayNghiPhep { get; set; } = new List<NgayNghiPhepModel>();
    }
}