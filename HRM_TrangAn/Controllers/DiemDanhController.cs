using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Hubs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class DiemDanhController : Controller
    {
        [SessionExpire]
        // GET: DiemDanh
        public ActionResult Index()
        {
            return View();
        }

        public class DiemDanhFromNotiModel
        {
            public int ID_Lop { get; set; }
            public int Ca { get; set; }
        }

        [SessionExpire]
        // GET: DiemDanh
        public ActionResult DiemDanhFromNoti(int ID_Lop, int Ca)
        {
            DiemDanhFromNotiModel model = new DiemDanhFromNotiModel();
            model.ID_Lop = ID_Lop;
            model.Ca = Ca;
            return View("Index", model);
        }

        [SessionExpire]
        [SessionAdminRole]
        // GET: DiemDanh
        public ActionResult QuanLyDuLieuDiemDanh()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetDSHocSinh_DiemDanh(int ID_Lop, int Ca)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<HocSinhModel> lhs = new List<HocSinhModel>();
            lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
            DiemDanhDAO ddao = new DiemDanhDAO();
            PhieuHocDAO phdao = new PhieuHocDAO();
            CaHocModel ca = new CaHocDAO().GetByID(Ca);
            DateTime quagiodiemdanh = DateTime.Now;
            int quagio = 1;
            if(ca.GioBatDau.TotalHours >= 17)
            {
                ca.GioBatDau = ca.GioBatDau.Add(TimeSpan.FromHours(1));
            }
            quagiodiemdanh = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(0, 45, 0);            
            if (DateTime.Compare(DateTime.Now, quagiodiemdanh) < 0 || userinfor.Role == 1 || userinfor.Role == 2)
            {
                quagio = 0;
            }
            foreach (HocSinhModel hs in lhs)
            {
                try
                {
                    DiemDanhModel dd = ddao.GetByHocSinh_Ngay(ID_Lop, hs.ID, DateTime.Now, Ca);
                    List<PhieuHocModel> lph = phdao.GetByHocSinh_Thang(hs.ID, DateTime.Now.Month);
                    if(lph.Find(x => x.ID_Lop == ID_Lop) != null)
                    {
                        hs.DaMuaPhieu = true;
                    }
                    else
                    {
                        hs.DaMuaPhieu = false;
                    }
                    hs.ID_DiemDanh = dd.ID;
                    hs.GhiChu = dd.GhiChu;
                    hs.Diem = dd.Diem;
                    hs.CoPhep = dd.CoPhep;
                    hs.QuaGioDiemDanh = quagio;
                }
                catch (Exception ex)
                {

                }

            }
            return Json(lhs, JsonRequestBehavior.AllowGet);
        }

        [SessionAdminRole]
        [HttpGet]
        public ActionResult GetDSHocSinh_DiemDanh_ByAdmin(int ID_Lop, int Ca, DateTime Ngay)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<HocSinhModel> lhs = new List<HocSinhModel>();
            lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
            DiemDanhDAO ddao = new DiemDanhDAO();
            //DateTime batdau = Ngay;
            //DateTime ketthuc = Ngay;
            //switch (Ca)
            //{
            //    case 1:
            //        batdau = Ngay.Date + new TimeSpan(7, 0, 0);
            //        ketthuc = Ngay.Date + new TimeSpan(9, 0, 0);
            //        break;
            //    case 2:
            //        batdau = Ngay.Date + new TimeSpan(9, 0, 0);
            //        ketthuc = Ngay.Date + new TimeSpan(11, 0, 0);
            //        break;
            //    case 3:
            //        batdau = Ngay.Date + new TimeSpan(14, 0, 0);
            //        ketthuc = Ngay.Date + new TimeSpan(16, 0, 0);
            //        break;
            //    case 4:
            //        batdau = Ngay.Date + new TimeSpan(16, 0, 0);
            //        ketthuc = Ngay.Date + new TimeSpan(19, 0, 0);
            //        break;
            //    case 5:
            //        batdau = Ngay.Date + new TimeSpan(19, 0, 0);
            //        ketthuc = Ngay.Date + new TimeSpan(21, 0, 0);
            //        break;
            //}
            foreach (HocSinhModel hs in lhs)
            {
                try
                {
                    //DiemDanhModel dd = ddao.GetByHocSinh_NgayGio(ID_Lop, hs.ID, batdau, ketthuc);
                    DiemDanhModel dd = ddao.GetByHocSinh_Ngay(ID_Lop, hs.ID, Ngay, Ca);
                    hs.ID_DiemDanh = dd.ID;
                    hs.CoPhep = dd.CoPhep;
                    hs.QuaGioDiemDanh = 0;
                    hs.GhiChu = dd.GhiChu;
                    hs.Diem = dd.Diem;
                }
                catch (Exception ex)
                {

                }

            }
            return Json(lhs, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult DiemDanhHocSinh(DiemDanhModel d)
        {
            DiemDanhDAO ddao = new DiemDanhDAO();
            DateTime batdau = DateTime.Now;
            CaHocDAO chdao = new CaHocDAO();
            CaHocModel ca = chdao.GetByID(d.Ca);
            d.ThoiGianVaoLop = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(0, 30, 0);
            long iddiemdanh = 0;
            //DateTime ketthuc = DateTime.Now;
            //switch (d.Ca)
            //{
            //    case 1:
            //        batdau = DateTime.Now.Date + new TimeSpan(7, 0, 0);
            //        ketthuc = DateTime.Now.Date + new TimeSpan(9, 0, 0);
            //        d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(8, 0, 0);
            //        break;
            //    case 2:
            //        batdau = DateTime.Now.Date + new TimeSpan(9, 0, 0);
            //        ketthuc = DateTime.Now.Date + new TimeSpan(11, 0, 0);
            //        d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(10, 0, 0);
            //        break;
            //    case 3:
            //        batdau = DateTime.Now.Date + new TimeSpan(14, 0, 0);
            //        ketthuc = DateTime.Now.Date + new TimeSpan(16, 0, 0);
            //        d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(15, 0, 0);
            //        break;
            //    case 4:
            //        batdau = DateTime.Now.Date + new TimeSpan(16, 0, 0);
            //        ketthuc = DateTime.Now.Date + new TimeSpan(19, 0, 0);
            //        d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(18, 0, 0);
            //        break;
            //    case 5:
            //        batdau = DateTime.Now.Date + new TimeSpan(19, 0, 0);
            //        ketthuc = DateTime.Now.Date + new TimeSpan(21, 0, 0);
            //        d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(20, 0, 0);
            //        break;
            //}
            if (DateTime.Compare(d.ThoiGianVaoLop, DateTime.Now) > 0)
            {
                d.ThoiGianVaoLop = DateTime.Now;
            }
            PhieuHocDAO phd = new PhieuHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            d.ID_NhanVien = userinfor.ID;
            DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(d.ID_Lop, d.ID_HocSinh, batdau, d.Ca);
            d.ID = diemdanhcu.ID;
            PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, DateTime.Now.Month, DateTime.Now.Year, d.HocDuoi);
            if (diemdanhcu.ID == 0)
            {
                iddiemdanh = ddao.InsertOrUpdate(d);
                if (iddiemdanh > 0)
                {
                    DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                    if (d.CoPhep != 1)
                    {
                        if (phmodel.ID > 0)
                        {
                            phmodel.SoBuoiDaHoc++;
                            phd.InsertOrUpdate(phmodel);
                        }
                    }
                }
            }
            else
            {
                if (diemdanhcu.CoPhep == d.CoPhep)
                {
                    if (ddao.Delete(diemdanhcu.ID))
                    {
                        DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                        if (diemdanhcu.CoPhep != 1)
                        {
                            if (phmodel.ID > 0)
                            {
                                phmodel.SoBuoiDaHoc--;
                                phd.InsertOrUpdate(phmodel);
                            }
                        }
                    }
                }
                else
                {
                    iddiemdanh = ddao.InsertOrUpdate(d);
                    if (iddiemdanh > 0)
                    {
                        DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                        if (d.CoPhep == 1)
                        {
                            if (diemdanhcu.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc--;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                        else if (d.CoPhep != 1)
                        {
                            if (diemdanhcu.CoPhep == 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công", id = iddiemdanh }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult UpdateGhiChuDiemDanh(DiemDanhModel d)
        {
            DiemDanhDAO ddao = new DiemDanhDAO();
            DiemDanhModel diemdanhcu = ddao.GetById(d.ID);
            diemdanhcu.GhiChu = d.GhiChu;
            diemdanhcu.Diem = d.Diem;
            ddao.InsertOrUpdate(diemdanhcu);
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult DiemDanhHocSinhByAdmin(DiemDanhModel d)
        {
            DiemDanhDAO ddao = new DiemDanhDAO();
            CaHocDAO chdao = new CaHocDAO();
            CaHocModel ca = chdao.GetByID(d.Ca);
            long iddiemdanh = 0;
            d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + ca.GioBatDau + new TimeSpan(0, 30, 0);
            //DateTime batdau = d.ThoiGianVaoLop;
            //DateTime ketthuc = d.ThoiGianVaoLop;
            //switch (d.Ca)
            //{
            //    case 1:
            //        batdau = d.ThoiGianVaoLop.Date + new TimeSpan(7, 0, 0);
            //        ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(9, 0, 0);
            //        d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(8, 0, 0);
            //        break;
            //    case 2:
            //        batdau = d.ThoiGianVaoLop.Date + new TimeSpan(9, 0, 0);
            //        ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(11, 0, 0);
            //        d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(10, 0, 0);
            //        break;
            //    case 3:
            //        batdau = d.ThoiGianVaoLop.Date + new TimeSpan(14, 0, 0);
            //        ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(16, 0, 0);
            //        d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(15, 0, 0);
            //        break;
            //    case 4:
            //        batdau = d.ThoiGianVaoLop.Date + new TimeSpan(16, 0, 0);
            //        ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(19, 0, 0);
            //        d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(18, 0, 0);
            //        break;
            //    case 5:
            //        batdau = d.ThoiGianVaoLop.Date + new TimeSpan(19, 0, 0);
            //        ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(21, 0, 0);
            //        d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(20, 0, 0);
            //        break;
            //}
            PhieuHocDAO phd = new PhieuHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            d.ID_NhanVien = userinfor.ID;
            DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(d.ID_Lop, d.ID_HocSinh, d.ThoiGianVaoLop, d.Ca);
            d.ID = diemdanhcu.ID;
            PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, d.ThoiGianVaoLop.Month, d.ThoiGianVaoLop.Year, d.HocDuoi);
            if (diemdanhcu.ID == 0)
            {
                iddiemdanh = ddao.InsertOrUpdate(d);
                if (iddiemdanh > 0)
                {
                    DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                    if (d.CoPhep != 1)
                    {
                        if (phmodel.ID > 0)
                        {
                            phmodel.SoBuoiDaHoc++;
                            phd.InsertOrUpdate(phmodel);
                        }
                    }
                }
            }
            else
            {
                if (diemdanhcu.CoPhep == d.CoPhep)
                {
                    if (ddao.Delete(diemdanhcu.ID))
                    {
                        DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                        if (diemdanhcu.CoPhep != 1)
                        {
                            if (phmodel.ID > 0)
                            {
                                phmodel.SoBuoiDaHoc--;
                                phd.InsertOrUpdate(phmodel);
                            }
                        }
                    }
                }
                else
                {
                    iddiemdanh = ddao.InsertOrUpdate(d);
                    if (iddiemdanh > 0)
                    {
                        DiemDanhHub.updateDiemDanh(d.ID_Lop, userinfor.TenDayDu, d.Ca);
                        if (d.CoPhep == 1)
                        {
                            if (diemdanhcu.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc--;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                        else if (d.CoPhep != 1)
                        {
                            if (diemdanhcu.CoPhep == 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);

        }

        [SessionModeratorRole]
        [HttpGet]
        public ActionResult GetAnhDiemDanh(int ID_LopHoc, int ID_CaHoc, DateTime Ngay)
        {
            AnhDiemDanhDAO add = new AnhDiemDanhDAO();
            List<AnhDiemDanhModel> lstAnhDiemDanh = add.GetByDiemDanh(ID_LopHoc, ID_CaHoc, Ngay);
            return Json(lstAnhDiemDanh, JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        [HttpPost]
        public ActionResult UpAnhDiemDanh(HttpPostedFileBase file, int ID_LopHoc, int ID_CaHoc, DateTime Ngay)
        {
            string path = "";
            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                string Path_Year = DateTime.Now.Year.ToString();
                string Path_Month = DateTime.Now.Month.ToString();
                string Path_Day = DateTime.Now.Day.ToString();
                string p = "/Images/" + "AnhDiemDanh_Tam/";

                //if (!System.IO.Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(p)))
                //{
                //    System.IO.Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(p));
                //}
                path = Path.Combine(Server.MapPath(p), Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + ID_LopHoc + fileName);
                file.SaveAs(path);
                AnhDiemDanhModel item = new AnhDiemDanhModel();
                item.DuongDan = p + "/" + Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + ID_LopHoc + fileName;
                item.ID_LopHoc = ID_LopHoc;
                item.ID_CaHoc = ID_CaHoc;
                item.NgayTao = Ngay;
                AnhDiemDanhDAO dao = new AnhDiemDanhDAO();
                dao.InsertOrUpdate(item);
            }
            return Json(new { status = true, msg = "Cập nhật ảnh điểm danh thành công", path = path }, JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        [HttpPost]
        public ActionResult DeleteAnhDiemDanh(int ID)
        {
            AnhDiemDanhDAO add = new AnhDiemDanhDAO();
            if (add.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa ảnh điểm danh thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xóa ảnh điểm danh thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}