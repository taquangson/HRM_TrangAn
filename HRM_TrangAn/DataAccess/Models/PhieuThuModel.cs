using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
namespace HRM_TrangAn.DataAccess.Models
{
    public class PhieuThuModel
    {
        public int ID { get; set; }
        public string MaPhieu { get; set; }
        public int ID_HocSinh { get; set; }
        public int ID_NhanVien { get; set; }
        public int Last_Update_User { get; set; }
        public int Last_Print_User { get; set; }
        public int ID_ChiNhanh { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime Last_Update_Time { get; set; }
        public DateTime Last_Print_Time { get; set; }
        public float TongThu { get; set; }
        public string NguoiLap { get; set; }
        public string NguoiSuaCuoi { get; set; }
        public string NguoiInCuoi { get; set; }
        public string TenHocSinh { get; set; }
        public int HinhThucThanhToan { get; set; }
        public List<PhieuHocModel> lstPhieuHoc { get; set; }
        public List<PhuThuGiamTruModel> lstPhuThu { get; set; }
        public List<PhuThuGiamTruModel> lstGiamTru { get; set; }
    }
}