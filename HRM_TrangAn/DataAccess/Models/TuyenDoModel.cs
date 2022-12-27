using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class TuyenDoModel
    {
        public int ID { get; set; }

        public string TenTuyen { get; set; }

        public string MaTuyen { get; set; }

        public int ThoiGianToiThieu { get; set; }

        public int ThoiGianToiDa { get; set; }

        public string GhiChu { get; set; }

        public List<TuyenDo_DiemModel> lstDiemTuyen { get; set; } // Param để insert + update + delete

        public List<DiemQuetTheModel> lstDiem { get; set; } // Param để view datagrid
    }
}