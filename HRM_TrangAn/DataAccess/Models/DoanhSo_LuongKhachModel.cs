using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DoanhSo_LuongKhachModel
    {
        public int ID { get; set; }
        public float DoanhSo {get; set; }
        public int LuongKhach { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
    }
}