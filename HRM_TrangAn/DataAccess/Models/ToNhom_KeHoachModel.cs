using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ToNhom_KeHoachModel
    {
        public int ID { get; set; }
        public int ID_KeHoach { get; set; }
        public int ID_ToNhom { get; set; }
        public string TenToNhom { get; set; }
        public DateTime NgayTao { get; set; }
        public int TrangThai { get; set; }
        public int SoNguoi { get; set; }
        public int DaChon { get; set; }
    }
}