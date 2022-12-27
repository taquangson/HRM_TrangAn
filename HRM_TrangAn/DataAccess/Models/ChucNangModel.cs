using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChucNangModel
    {
        public int ID_ChucNang { get; set; }
        public int ID_NhomChucNang { get; set; }
        public  string TenChucNang { get; set; }
        public string TenNhomChucNang { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
    }
}