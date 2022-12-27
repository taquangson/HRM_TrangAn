using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TuyenDo_DiemModel
    {
        public int ID { get; set; }

        public int ID_TuyenDo { get; set; }

        public int ID_DiemQuetThe { get; set; }

        public int STT { get; set; }

        public string TenDiem { get; set; }

        public string MaDiem { get; set; }

        public string Diadiem { get; set; }

    }
}