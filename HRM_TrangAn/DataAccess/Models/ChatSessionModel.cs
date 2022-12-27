using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChatSessionModel
    {
        public int ID { get; set; }
        public string Session { get; set; }
        public int ID_TaiKhoan { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayCapNhatCuoi { get; set; }
        public string TenTaiKhoan { get; set; }
    }
}