using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;
namespace HRM_TrangAn.Controllers
{
    public class CaLamViecNhanVienController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult GetDataTreeCaLamViec(DateTime from, DateTime to, int ID_PhongBan)
        {
            CaLamViec_NhanVienDAO dao = new CaLamViec_NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            DataTable dt = dao.GetDataTreeCaLamViec(from, to, ID_PhongBan);
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();
                childRow = new Dictionary<string, object>();
                int check = 0;
                foreach (DataColumn col in dt.Columns)
                {
                    check = 0;
                    int.TryParse(col.ColumnName, out check);
                    if (check != 0)
                    {
                        childRow.Add("data" + col.ColumnName, dt.Rows[i][col]);
                    }
                    else
                    {
                        childRow.Add(col.ColumnName, dt.Rows[i][col]);
                    }

                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
        }

        [SessionExpire]
        public ActionResult InsertOrUpdateMultiDate(CaLamViecNhanVienViewModel model)
        {
            CaLamViec_NhanVienDAO dao = new CaLamViec_NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.CreateBy = userinfor.ID;
            int row = dao.InsertOrUpdateMultiDate(model);
            if (row > 0)
            {
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin ca thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        public ActionResult Delete(int ID_NhanVien, int ID_PhongBan, DateTime from, DateTime to)
        {
            CaLamViec_NhanVienDAO dao = new CaLamViec_NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            bool rs = dao.Delete(ID_NhanVien, ID_PhongBan, from, to);
            if (rs)
            {
                return Json(new { success = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu thông tin ca thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}