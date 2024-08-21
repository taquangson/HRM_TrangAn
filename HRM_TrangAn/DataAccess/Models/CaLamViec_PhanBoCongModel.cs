using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HRM_TrangAn.DataAccess.Models
{
    public class CaLamViec_PhanBoCongModel
    {
        public int ID_CaLamViec { get; set; }
        public TimeSpan BatDau { get; set; }
        public TimeSpan KetThuc { get; set; }
        public float SoCong { get; set; }
        public int TangCa { get; set; }

    }
}