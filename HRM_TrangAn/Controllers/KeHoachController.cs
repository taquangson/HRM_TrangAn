using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class KeHoachController : Controller
    {
        // GET: KeHoach
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetAllKeHoach()
        {
            KeHoachDAO dao = new KeHoachDAO();
            List<KeHoachModel> data = dao.GetAll();
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetAllKeHoachByNgay(DateTime Ngay)
        {
            KeHoachDAO dao = new KeHoachDAO();
            List<KeHoachModel> data = dao.GetAllByNgay(Ngay);
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetBaoCaoKeHoach(DateTime from, DateTime to)
        {
            KeHoachDAO dao = new KeHoachDAO();
            List<KeHoachModel> data = dao.GetBaoCaoKeHoach(from, to);
            return Content(JsonConvert.SerializeObject(data));
        }

        public ActionResult GetListFileKeHoach(int ID_KeHoach)
        {
            KeHoach_FileDAO fdao = new KeHoach_FileDAO();
            List<KeHoach_FileModel> data = fdao.GetAllByKeHoach(ID_KeHoach);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetByChamCongNhanVien(int ID_NhanVien, DateTime Ngay)
        {
            KeHoachDAO dao = new KeHoachDAO();
            List<KeHoachModel> data = dao.GetByChamCongNhanVien(ID_NhanVien, Ngay);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult InsertOrUpdate_KeHoach(KeHoachModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            KeHoachDAO dao = new KeHoachDAO();
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            DanhMucCongViecDAO cvdao = new DanhMucCongViecDAO();
            DanhMucCongViecModel cv = cvdao.GetByID(item.ID_CongViec);
            string MaPhieu = item.NgayLamViec.ToString("yyyyMMdd") + "-" + cv.MaCongViec + "-" + StringHelper.RemoveVietNameseSign(item.DiaDiem).ToUpper().Trim().Replace(" ", "");
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;
            item.MaPhieuPhanCong = MaPhieu;
            if (item.ID == 0)
            {
                IDnew = dao.InsertOrUpdate(item);
                if (item.lstNhanVienKeHoach == null)
                {
                    item.lstNhanVienKeHoach = new List<NhanVien_KeHoachModel>();
                }
                foreach (NhanVien_KeHoachModel x in item.lstNhanVienKeHoach)
                {
                    nvdao.Insert(x.ID_NhanVien, IDnew, x.Cong == 0 ? item.Cong : x.Cong, 0);
                    //clddao.InsertOrUpdate(x.ID_NhanVien, 2, x.Cong, IDnew, item.NgayLamViec);
                }
            }
            else
            {
                IDnew = dao.InsertOrUpdate(item);
                List<NhanVien_KeHoachModel> cur_lst = nvdao.GetAllByKeHoach(item.ID);
                if (item.lstNhanVienKeHoach == null)
                {
                    item.lstNhanVienKeHoach = new List<NhanVien_KeHoachModel>();
                }
                List<int> cur_lstID = cur_lst.Select(c => c.ID_NhanVien).ToList();
                List<int> update_lstID = item.lstNhanVienKeHoach.Select(c => c.ID_NhanVien).ToList();
                List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
                List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách nhân viên được thêm
                if (item.TrangThai == 1)
                {
                    foreach (int idnv in delete_lstID)
                    {
                        foreach (NhanVien_KeHoachModel del in cur_lst) // Xóa các item cũ
                        {
                            if (del.ID_NhanVien == idnv)
                            {
                                if (nvdao.Delete(del.ID))
                                {
                                    clddao.Delete(idnv, 2, IDnew);
                                }
                                else
                                {
                                    countXoaErr++;
                                }
                            }
                        }
                    }
                }

                foreach (NhanVien_KeHoachModel up in item.lstNhanVienKeHoach)
                {
                    if (nvdao.InsertOrUpdate(up.ID_NhanVien, IDnew, up.Cong == 0 ? item.Cong : up.Cong, item.TrangThai == 1 ? 0 : 1) > 0)
                    {
                        if (item.TrangThai == 2)
                        {
                            clddao.InsertOrUpdate(up.ID_NhanVien, 2, up.Cong == 0 ? item.Cong : up.Cong, IDnew, item.NgayLamViec);
                        }
                    }
                    else
                    {
                        countThemErr++;
                    }
                }


                //foreach (NhanVien_KeHoachModel x in item.lstNhanVienKeHoach)
                //{
                //    clddao.InsertOrUpdate(x.ID_NhanVien, 6, item.Cong, IDnew, item.NgayLamViec);
                //}
                //if (item.lstNhanVienKeHoach.Count > 0)
                //{
                //    List<NhanVien_KeHoachModel> lstUpdate = item.lstNhanVienKeHoach.Where(x => x.TrangThai == 0).ToList();
                //    List<NhanVien_KeHoachModel> delete_lst = cur_lst.Except<NhanVien_KeHoachModel>(lstUpdate).ToList(); // Danh sách nhân viên bị xóa
                //    List<NhanVien_KeHoachModel> insert_lst = item.lstNhanVienKeHoach.Except<NhanVien_KeHoachModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
                //    if (delete_lst != null && item.TrangThai == 1)
                //    {
                //        foreach (NhanVien_KeHoachModel del in delete_lst) // Xóa các item cũ
                //        {
                //            if (nvdao.Delete(del.ID))
                //            {

                //            }
                //            else
                //            {
                //                countXoaErr++;
                //            }

                //        }
                //    }
                //    if (insert_lst != null)
                //    {
                //        foreach (NhanVien_KeHoachModel ins in insert_lst) // Thêm các item mới
                //        {
                //            if (nvdao.Insert(ins, IDnew) > 0)
                //            {

                //            }
                //            else
                //            {
                //                countThemErr++;
                //            }
                //        }
                //    }
                //}
                //else
                //{
                //    if (item.TrangThai == 1)
                //    {
                //        foreach (NhanVien_KeHoachModel del in cur_lst) // Xóa các item cũ
                //        {
                //            if (nvdao.Delete(del.ID))
                //            {

                //            }
                //            else
                //            {
                //                countXoaErr++;
                //            }

                //        }
                //    }
                //}

            }


            if (IDnew > 0)
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_KeHoachV3(KeHoachModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            KeHoachDAO dao = new KeHoachDAO();
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            ToNhom_KeHoachDAO tndao = new ToNhom_KeHoachDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            DanhMucCongViecDAO cvdao = new DanhMucCongViecDAO();
            DanhMucCongViecModel cv = cvdao.GetByID(item.ID_CongViec);
            string MaPhieu = item.NgayLamViec.ToString("yyyyMMdd") + "-" + cv.MaCongViec + "-" + StringHelper.RemoveVietNameseSign(item.DiaDiem).ToUpper().Trim().Replace(" ", "");
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;
            item.MaPhieuPhanCong = MaPhieu;
            if (item.ID == 0)
            {
                IDnew = dao.InsertOrUpdate(item);
                if (item.lstToNhomKeHoach == null)
                {
                    item.lstToNhomKeHoach = new List<ToNhom_KeHoachModel>();
                }
                foreach (ToNhom_KeHoachModel x in item.lstToNhomKeHoach)
                {
                    x.ID_KeHoach = IDnew;
                    tndao.InsertOrUpdate(x);
                }
            }
            else
            {
                IDnew = dao.InsertOrUpdate(item);
                List<ToNhom_KeHoachModel> cur_lst = tndao.GetAllByKeHoach(item.ID);
                if (item.lstToNhomKeHoach == null)
                {
                    item.lstToNhomKeHoach = new List<ToNhom_KeHoachModel>();
                }
                List<int> cur_lstID = cur_lst.Select(c => c.ID_ToNhom).ToList();
                List<int> update_lstID = item.lstToNhomKeHoach.Select(c => c.ID_ToNhom).ToList();
                List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách tổ nhóm bị xóa
                List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách tổ nhóm được thêm
                if (item.TrangThai == 1)
                {
                    foreach (int idtn in delete_lstID)
                    {
                        foreach (ToNhom_KeHoachModel del in cur_lst) // Xóa các item cũ
                        {
                            if (del.ID_ToNhom == idtn)
                            {
                                if (tndao.Delete(del.ID_KeHoach, del.ID_ToNhom))
                                {

                                }
                                else
                                {
                                    countXoaErr++;
                                }
                            }
                        }
                    }
                }

                foreach (ToNhom_KeHoachModel up in item.lstToNhomKeHoach)
                {
                    up.ID_KeHoach = IDnew;
                    if (tndao.InsertOrUpdate(up))
                    {

                    }
                    else
                    {
                        countThemErr++;
                    }
                }
            }


            if (IDnew > 0)
            {
                return Json(new { success = true, msg = "Lưu phân công công việc thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu phân công công việc thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateDanhSachNhanVien(string lst_id, int ID_KeHoach)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            KeHoachDAO dao = new KeHoachDAO();
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            KeHoachModel item = dao.GetById(ID_KeHoach);
            List<NhanVien_KeHoachModel> cur_lst = nvdao.GetAllByKeHoach(ID_KeHoach);
            List<string> cur_lstID = cur_lst.Select(c => c.ID_NhanVien.ToString()).ToList();
            List<string> update_lstID = lst_id.Split(',').ToList();
            List<string> delete_lstID = cur_lstID.Except<string>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
            List<string> insert_lstID = update_lstID.Except<string>(cur_lstID).ToList(); // Danh sách nhân viên được thêm

            foreach (string idnv in delete_lstID)
            {
                foreach (NhanVien_KeHoachModel del in cur_lst) // Xóa các item cũ
                {
                    if (del.ID_NhanVien == int.Parse(idnv))
                    {
                        clddao.Delete(int.Parse(idnv), 2, ID_KeHoach);
                    }
                }
            }

            int count = 0;
            foreach (string s in update_lstID)
            {
                if (nvdao.InsertOrUpdate(int.Parse(s), ID_KeHoach, item.Cong, item.TrangThai == 1 ? 0 : 1) > 0)
                {
                    count++;
                }
            }

            if (count > 0)
            {
                return Json(new { success = true, msg = "Lưu danh sách phân công thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh sách thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateAnh(List<KeHoach_FileModel> lstFile, int ID_KeHoach)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            KeHoachDAO dao = new KeHoachDAO();
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            KeHoachModel item = dao.GetById(ID_KeHoach);
            KeHoach_FileDAO fdao = new KeHoach_FileDAO();
            List<KeHoach_FileModel> cur_lstFile = fdao.GetAllByKeHoach(ID_KeHoach);
            if ( lstFile == null)
            {
                lstFile = new List<KeHoach_FileModel>();
            }
            List<int> cur_lstFileID = cur_lstFile.Select(c => c.ID).ToList();
            List<int> update_lstFileID = lstFile.Select(c => c.ID).ToList();
            List<int> delete_lstFileID = cur_lstFileID.Except<int>(update_lstFileID).ToList(); // Danh sách ảnh nhân viên bị xóa
            List<int> insert_lstFileID = update_lstFileID.Except<int>(cur_lstFileID).ToList(); // Danh sách ảnh nhân viên được thêm
            int countXoaFileErr = 0;
            int countThemFileErr = 0;
            foreach (int idf in delete_lstFileID)
            {
                foreach (KeHoach_FileModel del in cur_lstFile) // Xóa các ảnh cũ
                {
                    if (del.ID == idf)
                    {
                        if (fdao.Delete(del.ID))
                        {
                        }
                        else
                        {
                            countXoaFileErr++;
                        }
                    }


                }
            }
            foreach (KeHoach_FileModel itemfile in lstFile)
            {
                if (itemfile.ID == 0)
                {
                    if (fdao.Insert(ID_KeHoach, itemfile) > 0)
                    {
                    }
                    else
                    {
                        countThemFileErr++;
                    }
                }
            }
            if (countThemFileErr == 0 && countXoaFileErr == 0)
            {
                return Json(new { success = true, msg = "Lưu ảnh thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu ảnh thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }



        [HttpPost]
        public ActionResult Delete_KeHoach(int ID)
        {
            KeHoachDAO dm_dao = new KeHoachDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            if (nvdao.DeleteByIDKeHoach(ID))
            {
                if (dm_dao.Delete(ID))
                {
                    return Json(new { success = true, msg = "Xóa tổ nhóm thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, msg = "Xóa tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { success = false, msg = "Xóa nhân viên trong tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);

            }

        }

        [HttpPost]
        [SessionExpire]
        public ActionResult DeleteMulti_KeHoach(string ID)
        {
            KeHoachDAO dm_dao = new KeHoachDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
            if (dm_dao.DeleteMulti(ID))
            {
                if (nvdao.DeleteMultiByIDKeHoach(ID))
                {
                    clddao.DeleteMultiByIDKeHoach(ID);
                }
                return Json(new { success = true, msg = "Xóa kế hoạch thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa kế hoạch thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
            //if (nvdao.DeleteMultiByIDKeHoach(ID))
            //{
            //    if (dm_dao.DeleteMulti(ID))
            //    {
            //        return Json(new { success = true, msg = "Xóa kế hoạch thành công" }, JsonRequestBehavior.AllowGet);
            //    }
            //    else
            //    {
            //        return Json(new { success = false, msg = "Xóa kế hoạch thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            //    }
            //}
            //else
            //{
            //    return Json(new { success = false, msg = "Xóa kế hoạch trong tổ nhóm thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);

            //}

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
                string p = "/Images/" + "AnhCongViec_Temp/";

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
    }
}