using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DanhMucLoiModel
    {
        public int ID { get; set; }
        public string TenLoi { get; set; }
        public string MoTa { get; set; }
        public float PhatTien { get; set; }
        public float PhatCong { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }

    }
}