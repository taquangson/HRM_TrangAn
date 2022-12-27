using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CauHoiModel
    {
        public long ID { get; set; }
        public string NoiDungCauHoi { get; set; }
        public float Diem { get; set; }
        public int SoDapAn { get; set; }
        public int SoDapAnDung { get; set; }
        public string AnhCauHoi { get; set; }
        public int TrangThai { get; set; }
        public int ID_DanhMucCauHoi { get; set; }
        public string TenDanhMucCauHoi { get; set; }
        public int ID_TaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }
        public List<DapAnModel> lstDapAn { get; set; }
    }    
}