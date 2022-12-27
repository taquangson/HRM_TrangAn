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
    public class ThuyenDoController : Controller
    {
        // GET: ThuyenDo
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllThuyenDo()
        {
            ThuyenDoDAO dao = new ThuyenDoDAO();
            List<ThuyenDoModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetByMaThuyenDo(string MaThuyen)
        {
            ThuyenDoDAO dao = new ThuyenDoDAO();
            List<ThuyenDoModel> data = dao.GetByMa(MaThuyen);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ThuyenDo(ThuyenDoModel model)
        {
            ThuyenDoDAO dm_dao = new ThuyenDoDAO();
            ThuyenDoLichSuDAO tdls_dao = new ThuyenDoLichSuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int ID_New = dm_dao.InsertOrUpdate(model);
            if (model.isEditNhanVien == 1)
            {
                if (model.ID_NhanVien > 0)
                {
                    tdls_dao.Insert(model.ID_NhanVien, model.ID);
                }
                else
                {
                    tdls_dao.UpdateStatus(model.ID_NhanVien, model.ID);
                }
            }
            //if (model.ID == 0)
            //{
            //    if (model.ID_NhanVien > 0)
            //    {
            //        tdls_dao.Insert(model.ID_NhanVien, model.ID);
            //    }
            //}
            //else
            //{
            //    if (ID_New > 0)
            //    {
            //        if (model.ID_NhanVien > 0)
            //        {
            //            tdls_dao.Insert(model.ID_NhanVien, ID_New);
            //        }
            //    }

            //}
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
        public ActionResult InsertOrUpdate_ListThuyenDo(List<ThuyenDoModel> list)
        {
            ThuyenDoDAO dm_dao = new ThuyenDoDAO();
            ThuyenDoLichSuDAO tdls_dao = new ThuyenDoLichSuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            
            if (dm_dao.InsertOrUpdateMulti(list))
            {
                if (tdls_dao.InsertList(list)){
                    return Json(new { success = true, msg = "Lưu file thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = true, msg = "Lưu file thành công" }, JsonRequestBehavior.AllowGet);

                }
            }
            else
            {
                return Json(new { success = false, msg = "Lưu file thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult UpdateTemplate()
        {
            try
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                NhanVienDAO list_dao = new NhanVienDAO();
                List<NhanVienModel> list = list_dao.GetAll();
                string filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("//Content/ExcelTemplate/Temp_DanhMucThuyen.xlsx"));
                FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite);
                XSSFWorkbook inputWorkbook = new XSSFWorkbook(stream);
                stream.Close();
                ISheet sheet = inputWorkbook.GetSheetAt(1);

                if (list.Count > 0)
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        sheet.CreateRow(sheet.LastRowNum + 1);
                        //IRow row = sheet.GetRow(sheet.LastRowNum);
                        IRow row = sheet.GetRow(i + 1);

                        row.CreateCell(0);
                        row.CreateCell(1);
                        row.CreateCell(2);
                        row.Cells[1].SetCellValue(list[i].ID.ToString());
                        //if (list[i].MaNhanVien.ToString() != null)
                        //{
                        row.Cells[0].SetCellValue(list[i].MaNhanVien.ToString());
                        //}
                        //else
                        //{
                        //    row.Cells[0].SetCellValue("");
                        //}

                        row.Cells[2].SetCellValue(list[i].TenDayDu.ToString());

                    }
                }

                FileStream fsw = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite);
                inputWorkbook.Write(fsw, true);
                fsw.Close();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                log4net.ILog log = log4net.LogManager.GetLogger(typeof(ThuyenDoDAO));
                log.Error("UpdateTemplate_Thuyen " + ex.Message);

                return Json(new { success = false, msg = "File lỗi" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_ThuyenDo(int ID)
        {
            ThuyenDoDAO dm_dao = new ThuyenDoDAO();
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
        public ActionResult DeleteMulti_ThuyenDo(string ID)
        {
            ThuyenDoDAO dm_dao = new ThuyenDoDAO();
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

        [HttpPost]
        public ActionResult UpdateTrangThai_ThuyenDo(int ID, int TrangThai)
        {
            ThuyenDoDAO dm_dao = new ThuyenDoDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.UpdateTrangThai(ID, TrangThai))
            {
                return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Cập nhật trạng thái thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}