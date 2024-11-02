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
    public class NhanVienController : Controller
    {
        // GET: LaoDong
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult QuanLyInThe()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyDanhGia()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QuanLyDanhGiaDiem()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult CauHinhThuongDanhGia()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ThuongDanhGia()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAllDataDanhGia(int ID_ToNhom, string MaNhanVien, DateTime From, DateTime To)
        {
            DanhGiaLaiDoDAO dao = new DanhGiaLaiDoDAO();
            List<DanhGiaLaiDoModel> data = dao.GetAll(ID_ToNhom, MaNhanVien, From, To);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllDataDanhGiaDiem(DateTime From, DateTime To)
        {
            DanhGiaDiemDAO dao = new DanhGiaDiemDAO();
            List<DanhGiaDiemModel> data = dao.GetAll("", From, To);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateTrangThaiDanhGia(int TrangThai, int STT)
        {
            DanhGiaLaiDoDAO dao = new DanhGiaLaiDoDAO();
            bool success = dao.UpdateTrangThai(STT, TrangThai);
            if (success)
            {
                return Json(new { success = true, msg = "Duyệt đánh giá thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Duyệt đánh giá thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTrangThaiDanhGiaMulti(string STT, int TrangThai)
        {
            DanhGiaLaiDoDAO dao = new DanhGiaLaiDoDAO();
            bool success = dao.UpdateTrangThaiMulti(STT, TrangThai);
            if (success)
            {
                return Json(new { success = true, msg = "Duyệt đánh giá thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Duyệt đánh giá thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetAllThuongLaiDo(int ID_ToNhom, int Nam, int Quy, int Thang, DateTime From, DateTime To)
        {
            ThuongDanhGiaDAO dao = new ThuongDanhGiaDAO();
            List<LichSuThuongDanhGiaModel> data = dao.LichSuThuong_GetAll(ID_ToNhom, Nam, Quy, Thang, From, To);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllThuongLaiDoTheoCauHinh(int ID_ToNhom, int Nam, int Quy, int Thang, DateTime From, DateTime To)
        {
            ThuongDanhGiaDAO dao = new ThuongDanhGiaDAO();
            List<LichSuThuongDanhGiaModel> data = dao.LichSuThuong_GetAllByConfig(ID_ToNhom, Nam, Quy, Thang, From, To);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetDataDanhGiaBySTT(int STT)
        {
            DanhGiaLaiDoDAO dao = new DanhGiaLaiDoDAO();
            List<DanhGiaLaiDoModel> data = dao.GetBySTT(STT);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetDataDanhGiaDiemBySTT(int STT)
        {
            DanhGiaDiemDAO dao = new DanhGiaDiemDAO();
            List<DanhGiaDiemModel> data = dao.GetBySTT(STT);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllNhanVien()
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.GetAll();
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetNhanVienById(int ID)
        {
            NhanVienDAO dao = new NhanVienDAO();
            NhanVienModel data = dao.GetByID(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetListChucDanhNhanVien(int ID_NhanVien)
        {
            NhanVien_ChucDanhDAO cddao = new NhanVien_ChucDanhDAO();
            List<NhanVien_ChucDanhModel> data = cddao.GetAllByNhanVien(ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetListFileNhanVien(int ID_NhanVien)
        {
            File_NhanVienDAO fdao = new File_NhanVienDAO();
            List<File_NhanVienModel> data = fdao.GetAllByNhanVien(ID_NhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByMaNhanVien(string MaNhanVien)
        {
            NhanVienDAO dao = new NhanVienDAO();
            NhanVienModel data = dao.GetByMa(MaNhanVien);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetAllNhanVienNgoaiToNhom()
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.GetAllNhanVienNgoaiToNhom();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllNhanVienTrongToNhom(int ID_ToNhom)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.GetAllNhanVienTrongToNhom(ID_ToNhom);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllNhanVienTrongMultiToNhom(string ID_ToNhom)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.GetAllNhanVienTrongMultiToNhom(ID_ToNhom);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllNhanVienTrongToNhomTheoCongViec(int ID_ToNhom, int ID_CongViec)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.GetAllNhanVienTrongToNhomTheoCongViec(ID_ToNhom, ID_CongViec);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAllNhanVienTrongToNhomTheoCongViecNgay(int ID_ToNhom, int ID_CongViec, DateTime Ngay)
        {
            NhanVienDAO dao = new NhanVienDAO();
            int ID_DiemQuetThe = int.Parse(System.Configuration.ConfigurationManager.AppSettings["KeyPointCheckRouter2"]);
            List<NhanVienModel> data = dao.GetAllNhanVienTrongToNhomTheoCongViecNgay(ID_ToNhom, ID_CongViec, Ngay, ID_DiemQuetThe);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CheckNhanVienDaCoTicke(string lst_id, DateTime from, DateTime to)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<NhanVienModel> data = dao.CheckNhanVienCoTicke(lst_id, from, to);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_NhanVien(NhanVienModel model)
        {
            NhanVienDAO dm_dao = new NhanVienDAO();
            ThuyenDoLichSuDAO tdls_dao = new ThuyenDoLichSuDAO();
            NhanVien_ChucDanhDAO nvcddao = new NhanVien_ChucDanhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            File_NhanVienDAO filedao = new File_NhanVienDAO();
            int ID_New = dm_dao.InsertOrUpdate(model);
            int countXoaErr = 0;
            int countThemErr = 0;
            int countXoaFileErr = 0;
            int countThemFileErr = 0;
            if (model.isEditThuyen == 1)
            {
                if (model.ID_Thuyen > 0)
                {
                    tdls_dao.Insert(model.ID, model.ID_Thuyen);
                }
                else
                {
                    tdls_dao.UpdateStatus(model.ID, model.ID_Thuyen);
                }
            }
            if (model.ID == 0)
            {
                foreach (NhanVien_ChucDanhModel x in model.lstChucDanh)
                {
                    nvcddao.Insert(ID_New, x.ID_ChucDanh);
                    if (model.lstFile == null)
                    {
                        model.lstFile = new List<File_NhanVienModel>();
                    }

                }
                foreach (File_NhanVienModel itemfile in model.lstFile)
                {
                    //if(itemfile.FileName == (StringHelper.RemoveVietNameseSign(model.TenDayDu.ToLower().Trim().Replace(" ","")) + model.MaNhanVien.ToString() + ".jpg")
                    //    || itemfile.FileName == (StringHelper.RemoveVietNameseSign(model.TenDayDu.ToLower().Trim().Replace(" ", "")) + model.MaNhanVien.ToString() + ".png")
                    //    || itemfile.FileName == "anhchup.png")
                    if (itemfile.FileName == model.MaNhanVien.ToString() + ".jpg"
                        || itemfile.FileName == model.MaNhanVien.ToString() + ".png"
                        || itemfile.FileName == "anhchup.png")
                    {
                        itemfile.FileType = 1;
                        itemfile.FileStatus = 1;
                    }
                    if (filedao.Insert(ID_New, itemfile) > 0)
                    {

                    }
                    else
                    {
                        countThemFileErr++;
                    }

                }
            }
            else
            {
                List<NhanVien_ChucDanhModel> cur_lst = nvcddao.GetAllByNhanVien(model.ID);
                if (model.lstChucDanh == null)
                {
                    model.lstChucDanh = new List<NhanVien_ChucDanhModel>();
                }
                List<int> cur_lstID = cur_lst.Select(c => c.ID_ChucDanh).ToList();
                List<int> update_lstID = model.lstChucDanh.Select(c => c.ID_ChucDanh).ToList();
                List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
                List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách nhân viên được thêm
                foreach (int idcd in delete_lstID)
                {
                    foreach (NhanVien_ChucDanhModel del in cur_lst) // Xóa các item cũ
                    {
                        if (del.ID_ChucDanh == idcd)
                        {
                            if (nvcddao.Delete(del.ID))
                            {
                            }
                            else
                            {
                                countXoaErr++;
                            }
                        }


                    }
                }
                foreach (int idcd in insert_lstID)
                {
                    if (nvcddao.Insert(ID_New, idcd) > 0)
                    {
                    }
                    else
                    {
                        countThemErr++;
                    }
                }


                List<File_NhanVienModel> cur_lstFile = filedao.GetAllByNhanVien(model.ID);
                if (model.lstFile == null)
                {
                    model.lstFile = new List<File_NhanVienModel>();
                }
                List<int> cur_lstFileID = cur_lstFile.Select(c => c.ID).ToList();
                List<int> update_lstFileID = model.lstFile.Select(c => c.ID).ToList();
                List<int> delete_lstFileID = cur_lstFileID.Except<int>(update_lstFileID).ToList(); // Danh sách ảnh nhân viên bị xóa
                List<int> insert_lstFileID = update_lstFileID.Except<int>(cur_lstFileID).ToList(); // Danh sách ảnh nhân viên được thêm
                foreach (int idf in delete_lstFileID)
                {
                    foreach (File_NhanVienModel del in cur_lstFile) // Xóa các ảnh cũ
                    {
                        if (del.ID == idf)
                        {
                            if (filedao.Delete(del.ID))
                            {
                            }
                            else
                            {
                                countXoaFileErr++;
                            }
                        }


                    }
                }
                foreach (File_NhanVienModel itemfile in model.lstFile)
                {
                    if (itemfile.ID == 0)
                    {
                        //if (itemfile.FileName == (StringHelper.RemoveVietNameseSign(model.TenDayDu.ToLower().Trim().Replace(" ", "")) + model.MaNhanVien.ToString() + ".jpg")
                        //|| itemfile.FileName == (StringHelper.RemoveVietNameseSign(model.TenDayDu.ToLower().Trim().Replace(" ", "")) + model.MaNhanVien.ToString() + ".png")
                        //|| itemfile.FileName == "anhchup.png")
                        if (itemfile.FileName == model.MaNhanVien.ToString() + ".jpg"
                       || itemfile.FileName == model.MaNhanVien.ToString() + ".png"
                       || itemfile.FileName == "anhchup.png")
                        {
                            itemfile.FileType = 1;
                            itemfile.FileStatus = 1;
                        }
                        if (filedao.Insert(ID_New, itemfile) > 0)
                        {
                        }
                        else
                        {
                            countThemFileErr++;
                        }
                    }

                }

            }
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
        public ActionResult InsertOrUpdate_ListNhanVien(List<NhanVienModel> list)
        {
            NhanVienDAO dm_dao = new NhanVienDAO();
            ThuyenDoLichSuDAO tdls_dao = new ThuyenDoLichSuDAO();
            NhanVien_ChucDanhDAO nvcddao = new NhanVien_ChucDanhDAO();

            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<NhanVienModel> lst = dm_dao.InsertOrUpdateMulti2(list);
            if (lst.Count > 0)
            {

                if (tdls_dao.InsertListThuyen(lst))
                {
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

        [HttpPost]
        public ActionResult Delete_NhanVien(int ID)
        {
            NhanVienDAO dm_dao = new NhanVienDAO();
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
        public ActionResult DeleteMulti_NhanVien(string ID)
        {
            NhanVien_ChucDanhDAO nvcddao = new NhanVien_ChucDanhDAO();
            NhanVienDAO dm_dao = new NhanVienDAO();
            File_NhanVienDAO filedao = new File_NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
            {
                nvcddao.DeleteMultiByIDNhanVien(ID);
                filedao.DeleteMultiByIDNhanVien(ID);
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTrangThaiStop_NhanVien(int ID)
        {
            NhanVienDAO dm_dao = new NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.UpdateTrangThaiStop(ID))
            {
                return Json(new { success = true, msg = "Cập nhật trạng thái làm việc thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Cập nhật trạng thái làm việc thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTrangThaiStart_NhanVien(int ID)
        {
            NhanVienDAO dm_dao = new NhanVienDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.UpdateTrangThaiStart(ID))
            {
                return Json(new { success = true, msg = "Cập nhật trạng thái làm việc thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Cập nhật trạng thái làm việc thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult UpdateTemplate()
        {
            try
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                ThuyenDoDAO list_dao = new ThuyenDoDAO();
                ChucDanhDAO cd_dao = new ChucDanhDAO();
                ToNhomDAO todao = new ToNhomDAO();
                List<ThuyenDoModel> list = list_dao.GetAll();
                List<ChucDanhModel> listcd = cd_dao.GetAll();
                List<ToNhomModel> listto = todao.GetAll();

                string filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("//Content/ExcelTemplate/Temp_NguoiLaoDong.xlsx"));
                FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite);
                XSSFWorkbook inputWorkbook = new XSSFWorkbook(stream);
                stream.Close();
                ISheet sheet = inputWorkbook.GetSheetAt(1);
                ISheet sheet2 = inputWorkbook.GetSheetAt(2);
                ISheet sheet3 = inputWorkbook.GetSheetAt(3);

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
                        if (list[i].MaThuyen == null)
                        {
                            list[i].MaThuyen = "";
                        }
                        row.Cells[0].SetCellValue(list[i].MaThuyen.ToString());
                        //}
                        //else
                        //{
                        //    row.Cells[0].SetCellValue("");
                        //}
                        if (list[i].LoaiThuyen != 0)
                        {
                            row.Cells[2].SetCellValue("Sắt");
                        }
                        else
                        {
                            row.Cells[2].SetCellValue("Inox");

                        }
                        //row.Cells[2].SetCellValue(list[i].LoaiThuyen.ToString());

                    }
                }
                if (listcd.Count > 0)
                {
                    for (int i = 0; i < listcd.Count; i++)
                    {
                        sheet2.CreateRow(sheet2.LastRowNum + 1);
                        //IRow row = sheet.GetRow(sheet.LastRowNum);
                        IRow row = sheet2.GetRow(i + 1);

                        row.CreateCell(0);
                        row.CreateCell(1);
                        row.Cells[1].SetCellValue(listcd[i].ID.ToString());

                        row.Cells[0].SetCellValue(listcd[i].TenChucDanh.ToString());


                    }
                }

                if (listto.Count > 0)
                {
                    for (int i = 0; i < listto.Count; i++)
                    {
                        sheet3.CreateRow(sheet3.LastRowNum + 1);
                        //IRow row = sheet.GetRow(sheet.LastRowNum);
                        IRow row = sheet3.GetRow(i + 1);

                        row.CreateCell(0);
                        row.CreateCell(1);
                        row.Cells[1].SetCellValue(listto[i].ID.ToString());

                        row.Cells[0].SetCellValue(listto[i].MaToNhom.ToString());


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
                log.Error("UpdateTemplate_NhanVien " + ex.Message);

                return Json(new { success = false, msg = "File lỗi" }, JsonRequestBehavior.AllowGet);
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

                //if (!System.IO.Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(p)))
                //{
                //    System.IO.Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(p));
                //}
                path = Path.Combine(Server.MapPath(p), Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + Path_hhmmss + "-" + StringHelper.RemoveVietNameseSign(fileName.ToLower()).Replace(" ", ""));
                file.SaveAs(path);
                //File_NhanVienModel item = new File_NhanVienModel();
                //item.FilePath = p + "/" + Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + ID_NhanVien + fileName;
                //item.ID_NhanVien = ID_NhanVien;
                //item.FileName = Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + ID_NhanVien + fileName;
                string fileTempName = Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + Path_hhmmss + "-" + StringHelper.RemoveVietNameseSign(fileName.ToLower()).Replace(" ", "");
                return Json(new { status = true, msg = "Cập nhật ảnh thành công", path = p + fileTempName, name = fileName }, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return Json(new { status = false, msg = "File lỗi", path = "", name = "" }, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpPost]
        public ActionResult DeleteFile(int ID)
        {
            File_NhanVienDAO filedao = new File_NhanVienDAO();
            if (filedao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa ảnh điểm danh thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xóa ảnh điểm danh thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetAll_CauHinhThuongDanhGia()
        {
            ThuongDanhGiaDAO dao = new ThuongDanhGiaDAO();
            List<CauHinhThuongDanhGiaModel> lst = dao.CauHinhThuong_GetAll();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_CauHinhThuong(CauHinhThuongDanhGiaModel model)
        {
            ThuongDanhGiaDAO dao = new ThuongDanhGiaDAO();
            if (dao.CauHinhThuong_InsertOrUpdate(model))
            {
                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult Delete_CauHinhThuong(int ID)
        {
            File_NhanVienDAO filedao = new File_NhanVienDAO();
            if (filedao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetByID_ChinhSachLuong(int ID_ChinhSachLuong)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<ChinhSachLuong_NhanVienModel> data = dao.GetByID_ChinhSachLuong(ID_ChinhSachLuong);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetByNotID_ChinhSachLuong(int ID_ChinhSachLuong)
        {
            NhanVienDAO dao = new NhanVienDAO();
            List<ChinhSachLuong_NhanVienModel> data = dao.GetByNotID_ChinhSachLuong(ID_ChinhSachLuong);
            return Content(JsonConvert.SerializeObject(data));
        }

        [HttpPost]
        public ActionResult XuatHoSoNhanSu(string StringID_NhanVien)
        {
            NhanVienDAO dao = new NhanVienDAO();
            if (dao.XuatHoSoNhanSu(StringID_NhanVien))
            {
                return Json(new { status = true, msg = "Xuất hồ sơ thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xuất hồ sơ thất bại, vui lòng kiểm tra hồ sơ đã tồn tại hoặc thử lại sau ít phút!" }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}