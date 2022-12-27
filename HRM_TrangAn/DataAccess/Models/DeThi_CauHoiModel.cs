using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DeThi_CauHoiModel
    {
        public int ID { get; set; }
        public int ID_DeThi { get; set; }
        public long ID_CauHoi { get; set; }
        public int STT { get; set; }
        public float Diem { get; set; }
    }
}