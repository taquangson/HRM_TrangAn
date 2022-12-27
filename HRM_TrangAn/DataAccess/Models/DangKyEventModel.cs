using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DangKyEventModel
    {
        public int ID
        { get; set; }
        public int ID_TaiKhoan
        {
            get; set;
        }
        public DateTime NgayTao
        { get; set; }
        public string TaiKhoan
        { get; set; }
    }
}