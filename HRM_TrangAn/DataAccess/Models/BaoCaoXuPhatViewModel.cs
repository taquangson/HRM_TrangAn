using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class BaoCaoXuPhatViewModel
    {
        public int ID_TaiKhoan { get; set;}
        public string TenNhanVien {  get; set; }
        public string TenLoiViPham { get; set; }
        public int SoLuotViPham { get; set; }
        public decimal TongTienXuPhat { get; set; }
        public float TongCongXuPhat { get; set; }
        public List<XuPhatNhanVienModel> List_XPNV { get; set; } = new List<XuPhatNhanVienModel>();
    }
}