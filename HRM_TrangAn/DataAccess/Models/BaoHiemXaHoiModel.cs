using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BaoHiemXaHoiModel
    {
        public int ID { get; set; }
        public decimal MucLuongDongBaoHiem { get; set; }
        public decimal SDLD_BHXH { get; set; }
        public decimal SDLD_BHYT { get; set; }
        public decimal SDLD_BHTN { get; set; }
        public decimal SDLD_Tong { get; set; }
        public decimal SDLD_ThucTe { get; set; }
        public decimal NLD_BHXH { get; set; }
        public decimal NLD_BHYT { get; set; }
        public decimal NLD_BHTN { get; set; }
        public decimal NLD_Tong { get; set; }
        public decimal NLD_ThucTe { get; set; }
        public decimal Tong { get; set; }
        public string GhiChu { get; set; }
        public string MoTa { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
    }
}