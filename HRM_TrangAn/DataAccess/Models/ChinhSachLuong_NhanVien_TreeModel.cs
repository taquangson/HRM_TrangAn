using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class ChinhSachLuong_NhanVien_TreeModel
    {
        public int ID_HoSoNhanSu { get; set; }
        public string MaNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public int ID_Parent {  get; set; }
        public List<ChinhSachLuong_NhanVienModel> chinhsachluong { get; set; }
    }
}