using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class LichHocModel
    {
        public int ID { get; set; }
        public int ID_Lop { get; set; }
        public DateTime NgayTao { get; set; }
        public int Thu { get; set; }
        public int Ca { get; set; }
        public string GhiChu { get; set; }
        public string TenCa { get; set; }
        public string TenBuoi { get; set; }
        public string TenLop { get; set; }
        public string TenGiaoVien { get; set; }
        public int ID_ChiNhanh { get; set; }
        public DateTime NgayHocDuKien { get; set; }
        public GiaoAnModel GiaoAn { get; set; }
    }
}