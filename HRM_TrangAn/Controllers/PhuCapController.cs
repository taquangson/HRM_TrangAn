using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using NPOI.POIFS.Crypt.Dsig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class PhuCapController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            PhuCapDAO dao = new PhuCapDAO();
            List<PhuCapModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByID(int ID)
        {
            PhuCapDAO dao = new PhuCapDAO();
            PhuCapModel data = dao.GetByID(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByID_NhanVien(int ID_NhanVien)
        {
            PhuCapDAO dao = new PhuCapDAO();
            List<PhuCapModel> data = dao.GetByID_NhanVien(ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPhuCapByDateRange(string TuNgay, string DenNgay)
        {
            DateTime TuNgayDate = DateTime.ParseExact(TuNgay, "yyyy/MM/dd HH:mm:ss",
            System.Globalization.CultureInfo.InvariantCulture);
            DateTime DenNgayDate = DateTime.ParseExact(DenNgay, "yyyy/MM/dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture);

            // Gọi DAO để lấy dữ liệu từ cơ sở dữ liệu
            PhuCapDAO dao = new PhuCapDAO();

            List<PhuCapModel> data = dao.GetByDateRange(TuNgayDate, DenNgayDate);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public ActionResult InsertOrUpdate(PhuCapModel model)
        {
            PhuCapDAO dao = new PhuCapDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_NguoiTao = userinfor.ID;
            if (dao.InsertOrUpdate(model))
            {
                return Json(new { success = true, msg = "Thêm hoặc sửa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Thêm hoặc sửa dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertMulti(List<PhuCapModel> data)
        {
            PhuCapDAO dao = new PhuCapDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            foreach (PhuCapModel model in data)
            {
                model.ID_NguoiTao = userinfor.ID;
                dao.InsertOrUpdate(model);
            }
            return Json(new { success = true, msg = "Thêm hoặc sửa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ImportFromExcel(List<PhuCapModel> data)
        {
            PhuCapDAO dao = new PhuCapDAO();
            HoSoNhanSuDAO hsdao = new HoSoNhanSuDAO();
            NoiDungPhuCapDAO ndpcdao = new NoiDungPhuCapDAO();
            List<NoiDungPhuCapModel> dspc = ndpcdao.GetAll();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            foreach (PhuCapModel model in data)
            {
                model.ID_NguoiTao = userinfor.ID;
                model.ID_HoSoNhanSu = hsdao.GetByMa(model.MaNhanVien).ID;
                model.ID_NoiDungPhuCap = dspc.Where(x => x.Ma == model.MaPhuCap).FirstOrDefault().ID;
                model.NgayHuongPhuCap = model.NgayHuongPhuCap;
                dao.InsertOrUpdate(model);
            }
            return Json(new { success = true, msg = "Import dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteMulti(string ID)
        {
            PhuCapDAO dao = new PhuCapDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}