using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Helper;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.Controllers
{
    [SessionExpire]
    public class HoSoNhanSuController : Controller
    {
        // GET: LaoDong
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetAll()
        {
            HoSoNhanSuDAO dao = new HoSoNhanSuDAO();
            List<HoSoNhanSuModel> data = dao.GetAll();
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetById(int ID)
        {
            HoSoNhanSuDAO dao = new HoSoNhanSuDAO();
            HoSoNhanSuModel data = dao.GetByID(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetListFileNhanVien(int ID_HoSoNhanSu)
        {
            File_NhanVienDAO fdao = new File_NhanVienDAO();
            List<File_NhanVienModel> data = fdao.GetAllByHoSoNhanSu(ID_HoSoNhanSu);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByMaNhanVien(string MaNhanVien)
        {
            HoSoNhanSuDAO dao = new HoSoNhanSuDAO();
            HoSoNhanSuModel data = dao.GetByMa(MaNhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate(HoSoNhanSuModel model)
        {
            HoSoNhanSuDAO dm_dao = new HoSoNhanSuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int ID_New = dm_dao.InsertOrUpdate(model);
            if (ID_New > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete(int ID)
        {
            HoSoNhanSuDAO dm_dao = new HoSoNhanSuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.Delete(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UploadFile(HttpPostedFileBase file)
        {
            string path = "";
            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                string Path_Year = DateTime.Now.Year.ToString();
                string Path_Month = DateTime.Now.Month.ToString();
                string Path_Day = DateTime.Now.Day.ToString();
                string Path_hhmmss = DateTime.Now.ToString("hhMMss");
                string p = "/Images/" + "AnhNhanVien_Temp/";
                path = Path.Combine(Server.MapPath(p), Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + Path_hhmmss + "-" + StringHelper.RemoveVietNameseSign(fileName.ToLower()).Replace(" ", ""));
                file.SaveAs(path);
                string fileTempName = Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + Path_hhmmss + "-" + StringHelper.RemoveVietNameseSign(fileName.ToLower()).Replace(" ", "");
                return Json(new { status = true, msg = "Tải tệp thành công", path = p + fileTempName, name = fileName }, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return Json(new { status = false, msg = "File lỗi", path = "", name = "" }, JsonRequestBehavior.AllowGet);

            }
        }
    }
}