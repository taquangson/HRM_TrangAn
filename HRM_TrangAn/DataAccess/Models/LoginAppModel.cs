using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM_TrangAn.DataAccess.Models
{
    public class UserAppModel
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }
        public string Current_Imei { get; set; }
        public string Current_Device { get; set; }
        public int EmployeeType { get; set; }
        public string NotifyID { get; set; }
        public int Status { get; set; }
        public DateTime ExpriedTime { get; set; }
        public DateTime Last_LoginTime { get; set; }
        public string DanhSachHocSinh { get; set; }
        public List<HocSinhModel> lstHocSinh { get; set; }
        public int ShowPopup { get; set; }
        public int ShowButton { get; set; }
        public string PopupImage { get; set; }
    }
}