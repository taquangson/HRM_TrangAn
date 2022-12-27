using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class DapAnModel
    {
        public long ID { get; set; }
        public int ID_CauHoi { get; set; }
        public string DapAn { get; set; }
        public string AnhDapAn { get; set; }
        public int IsDapAnDung { get; set; }
    }
}