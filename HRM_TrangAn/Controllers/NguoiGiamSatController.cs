using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class NguoiGiamSatController : Controller
    {
        // GET: NguoiGiamSat
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllNguoiGiamSat()
        {
            NguoiGiamSatDAO dao = new NguoiGiamSatDAO();
            List<NguoiGiamSatModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_NguoiGiamSat(NguoiGiamSatModel model)
        {
            NguoiGiamSatDAO dm_dao = new NguoiGiamSatDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            if (dm_dao.InsertOrUpdate(model) > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ListNguoiGiamSat(List<NguoiGiamSatModel> list)
        {
            NguoiGiamSatDAO dm_dao = new NguoiGiamSatDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            if (dm_dao.InsertOrUpdateMulti(list))
            {
                return Json(new { success = true, msg = "Lưu file thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu file thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_NguoiGiamSat(int ID)
        {
            NguoiGiamSatDAO dm_dao = new NguoiGiamSatDAO();
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
        public ActionResult DeleteMutli_NguoiGiamSat(string ID)
        {
            NguoiGiamSatDAO dm_dao = new NguoiGiamSatDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult UpdateTemplate_NhanVien()
        {
            try 
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                TaiKhoanDAO list_dao = new TaiKhoanDAO();
                List<TaiKhoanModel> list = list_dao.GetAll();
                string filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("//Content/ExcelTemplate/Temp_DanhMucNguoiGiamSat_NhanVien.xlsx"));
                FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite);
                XSSFWorkbook inputWorkbook = new XSSFWorkbook(stream);
                stream.Close();
                ISheet sheet = inputWorkbook.GetSheetAt(1);
                
                if (list.Count > 0)
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        sheet.CreateRow(sheet.LastRowNum + 1);
                        IRow row = sheet.GetRow(i + 1);
                        row.CreateCell(0);
                        row.CreateCell(1);
                        row.CreateCell(2);
                        row.Cells[1].SetCellValue(list[i].ID.ToString());
                        row.Cells[0].SetCellValue(list[i].TenDayDu.ToString());
                        if (list[i].DienThoai != null)
                        {
                            row.Cells[2].SetCellValue(list[i].DienThoai.ToString());
                        }
                        else
                        {
                            row.Cells[2].SetCellValue("");
                        }

                    }
                }

                FileStream fsw = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite);
                inputWorkbook.Write(fsw, true);
                fsw.Close();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                log4net.ILog log = log4net.LogManager.GetLogger(typeof(NguoiGiamSatDAO));
                log.Error("UpdateTemplate_NguoiGiamSat_NhanVien " + ex.Message);

                return Json(new { success = false, msg = "File lỗi" }, JsonRequestBehavior.AllowGet);
            }


        }

        [HttpGet]
        public ActionResult UpdateTemplate_LaoDong()
        {
            try
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                NhanVienDAO list_dao = new NhanVienDAO();
                List<NhanVienModel> list = list_dao.GetAll();
                string filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("//Content/ExcelTemplate/Temp_DanhMucNguoiGiamSat_LaoDong.xlsx"));
                FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite);
                XSSFWorkbook inputWorkbook = new XSSFWorkbook(stream);
                stream.Close();
                ISheet sheet = inputWorkbook.GetSheetAt(1);

                if (list.Count > 0)
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        sheet.CreateRow(sheet.LastRowNum + 1);
                        IRow row = sheet.GetRow(i + 1);
                        row.CreateCell(0);
                        row.CreateCell(1);
                        row.CreateCell(2);
                        row.Cells[1].SetCellValue(list[i].ID.ToString());
                        row.Cells[0].SetCellValue(list[i].TenDayDu.ToString());
                        row.Cells[2].SetCellValue(list[i].SoDienThoai.ToString());

                    }
                }

                FileStream fsw = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite);
                inputWorkbook.Write(fsw, true);
                fsw.Close();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                log4net.ILog log = log4net.LogManager.GetLogger(typeof(NguoiGiamSatDAO));
                log.Error("UpdateTemplate_NguoiGiamSat_LaoDong " + ex.Message);

                return Json(new { success = false, msg = "File lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}