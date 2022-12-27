using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TinNhanPhanHoiModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public string ID_User { get; set; }
        public string NoiDung { get; set; }
        public DateTime NgayGui { get; set; }
        public string TenHocSinh { get; set; }
        public string PhuHuynh { get; set; }
        public int DaXem { get; set; }
        public int ChiNhanh { get; set; }
        public int Loai { get; set; }
        public int DaTraLoi { get; set; }
    }
}