using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class XuPhatNhanVienModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public int FromDMVS { get; set; }
        public string TenDayDu { get; set; }
        public int ID_DanhMucLoi { get; set; }
        public string GhiChu { get; set; }
        public DateTime NgayPhat { get; set; }
        DanhMucLoiModel DanhMucLoi { get; set; }
        public string TenLoi { get; set; }
        public decimal PhatTien { get; set; }
        public decimal PhatCong { get; set; }
        public List<NhanVien_XuPhatModel> lstNhanVienXuPhat { get; set; } // Param để insert + update + delete
        public List<TaiKhoanModel> lstNhanVien { get; set; } // Param để view datagrid
    }
}