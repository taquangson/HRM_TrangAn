using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class ChuyenCongController : Controller
    {
        // GET: ChuyenCong
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetNoCong(int ID_ToNhom, string from, string to)
        {
            DateTime TuNgayDate = DateTime.ParseExact(from, "yyyy/MM/dd HH:mm:ss",
            System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(to, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            // Gọi DAO để lấy dữ liệu từ cơ sở dữ liệu
            NoCongDAO dao = new NoCongDAO();

            List<NoCongModel> data = dao.GetDataNoCong(TuNgayDate, DenNgayDate, ID_ToNhom);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpGet]
        public ActionResult GetLichSuChuyenCongByThangAndNguoiTao(int ID_NguoiTao,string TuNgay, string DenNgay)
        {
            DateTime TuNgayDate = DateTime.ParseExact(TuNgay, "yyyy/MM/dd HH:mm:ss",
            System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(DenNgay, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            // Gọi DAO để lấy dữ liệu từ cơ sở dữ liệu
            ChuyenCongDAO dao = new ChuyenCongDAO();

            List<LichSuChuyenCongModel> data = dao.GetByThangAndNguoiTao(ID_NguoiTao,TuNgayDate, DenNgayDate);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public ActionResult DeleteMulti_ChuyenCong(string string_ID_ChuyenCong)
        {
            ChuyenCongDAO cc_dao = new ChuyenCongDAO();
            if (cc_dao.DeleteMulti(string_ID_ChuyenCong))
            {
                return Json(new { success = true, msg = "Xóa chuyến công thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa chuyến công thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ChuyenCong(LichSuChuyenCongModel model)
        {
            ChuyenCongDAO cc_dao = new ChuyenCongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_NguoiTao = userinfor.ID;
            bool isSuccess = cc_dao.InsertOrUpdate(model);

            if (isSuccess)
            {
                return Json(new { success = true, msg = "Lưu chuyến công thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu chuyến công thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}