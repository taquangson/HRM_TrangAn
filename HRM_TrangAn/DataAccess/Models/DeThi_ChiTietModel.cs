using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DeThi_ChiTietModel
    {
        public int ID { get; set; }
        public int ID_DeThi { get; set; }  
        public int ID_DanhMucCauHoi { get; set; }
        public string TenDanhMucCauHoi { get; set; }
        public int SoLuongCauHoi { get; set; }
        public float Diem { get; set; }
    }
}