using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class KeHoachModel
    {
        public int ID { get; set; }
        public int ID_CongViec { get; set; }
        public string MaPhieuPhanCong { get; set; }
        public string TenCongViec { get; set; }
        public float Cong { get; set; }
        public float PhuCap { get; set; }
        public int ID_CongViecThucTe { get; set; }
        public string TenCongViecThucTe { get; set; }
        public float CongThucTe { get; set; }
        public string DiaDiem { get; set; }
        public float ThoiGianDuKien { get; set; }
        public float ThoiGianThucTe { get; set; }
        public string GhiChu { get; set; }
        public int TrangThai { get; set; }
        public string To_SoNguoiDuKien { get; set; }
        public string To_SoNguoiDuKien_Text { get; set; }
        public string To_SoNguoiThucTe { get; set; }
        public DateTime NgayLamViec { get; set; }
        public DateTime NgayTao { get; set; }
        public List<ToNhom_KeHoachModel> lstToNhomKeHoach { get; set; } // Param để insert + update + delete
        public List<NhanVien_KeHoachModel> lstNhanVienKeHoach { get; set; } // Param để insert + update + delete
        public List<NhanVien_KeHoachModel> lstNhanVien { get; set; } // Param để view datagrid
        public List<KeHoach_FileModel> lstFile { get; set; }
        public int SoNguoiDuKien { get; set; }
        public int SoNguoiThucTe { get; set; }

        public int ID_NguoiGiamSat { get; set; }
        public string NguoiGiamSat { get; set; }
        public int ID_NguoiGiamSatThucTe { get; set; }
        public string NguoiGiamSatThucTe { get; set; }

        public DateTime ThoiGianBatDauDuKien { get; set; }

        public DateTime ThoiGianKetThucDuKien { get; set; }

        public DateTime ThoiGianBatDauThucTe { get; set; }

        public DateTime ThoiGianKetThucThucTe { get; set; }

    }
}