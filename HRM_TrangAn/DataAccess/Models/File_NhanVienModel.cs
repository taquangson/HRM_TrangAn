using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class File_NhanVienModel
    {
        public int ID { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_HoSoNhanSu { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int FileType { get; set; }
        public int FileStatus { get; set; }
        public DateTime NgayTao { get; set; }
    }
}