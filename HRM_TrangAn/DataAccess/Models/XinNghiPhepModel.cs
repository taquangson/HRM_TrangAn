using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class XinNghiPhepModel
    {
        public int ID { get; set; }
        public int ID_HocSinh { get; set; }
        public DateTime NgayNghi { get; set; }
        public string LyDoNghi { get; set; }
        public DateTime NgayXinPhep { get; set; }
        public string TenHocSinh { get; set; }
        public string PhuHuynh { get; set; }
        public string DienThoai { get; set; }
        public int TrangThai { get; set; }
    }

    public class XinNghiPhepAppModel
    {
        public int ID_HocSinh { get; set; }
        public List<DateTime> lstNgayNghi { get; set; }
        public string LyDo { get; set; }
    }
}