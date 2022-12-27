using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BaiLamTracNghiem_ChiTietModel
    {
        public long ID_BaiLamTracNghiem { get; set; }
        public long ID_CauHoi { get; set; }        
        public float Diem { get; set; }
        public int TraLoiDung { get; set; }
        public string TraLoi { get; set; }
        public CauHoiModel cauhoi { get; set; }
    }
}