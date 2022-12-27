using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class PhieuThuController : Controller
    {
        // GET: PhieuThu
        [SessionModeratorRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionModeratorRole]
        [HttpPost]
        public ActionResult CreateOrUpdate(PhieuThuModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuHocDAO phdao = new PhieuHocDAO();
            int ID_PhieuThu = model.ID;
            if (model.lstPhuThu == null)
            {
                model.lstPhuThu = new List<PhuThuGiamTruModel>();
            }
            if (model.lstGiamTru == null)
            {
                model.lstGiamTru = new List<PhuThuGiamTruModel>();
            }
            if (model.lstPhieuHoc == null)
            {
                model.lstPhieuHoc = new List<PhieuHocModel>();
            }
            if (model.ID == 0)
            {
                model.ID_NhanVien = userinfor.ID;
                model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                model.MaPhieu = "PTDH-" + DateTime.Now.ToString("yyyyMMddhhmmss");
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                ID_PhieuThu = idnew;
                foreach (PhieuHocModel ph in model.lstPhieuHoc)
                {
                    ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                    ph.ID_NhanVien = userinfor.ID;
                    ph.ID_PhieuThu = idnew;
                    ph.NamHoc = ph.NamHoc;
                    int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                    ph.SoBuoiDaHoc = count;
                    phdao.InsertOrUpdate(ph);
                }
                foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)
                {
                    int ID_PhieuHoc = 0;
                    if (phuthu.ID_PhieuHoc == 0 && phuthu.ID_Lop > 0)
                    {

                        PhieuHocModel p = new PhieuHocModel();
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 0);
                        if (p.ID != 0)
                        {

                        }
                        else
                        {
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 1);
                        }
                        if (p.ID != 0)
                        {
                            p.SoBuoi += phuthu.SoBuoi;
                            phdao.InsertOrUpdate(p);
                        }
                        else
                        {
                            p.ID_HocSinh = model.ID_HocSinh;
                            p.HocDuoi = 0;
                            p.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                            p.ID_Lop = phuthu.ID_Lop;
                            p.ID_PhieuThu = idnew;
                            p.SoBuoi = phuthu.SoBuoi;
                            p.SoTien = phuthu.DonGia;
                            p.Thang = phuthu.Thang;
                            p.NamHoc = phuthu.Nam;
                            p.SoBuoiDaHoc = p.SoBuoi;
                            p.ID_NhanVien = userinfor.ID;
                            ID_PhieuHoc = phdao.InsertOrUpdate(p);
                        }
                    }

                    phuthu.Type = 0;
                    phuthu.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);


                }
                foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)
                {
                    if (giamtru.ID_PhieuHoc == 0)
                    {
                        PhieuHocModel p = new PhieuHocModel();
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                        if (p.ID != 0)
                        {

                        }
                        else
                        {
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                        }
                        giamtru.ID_PhieuHoc = p.ID;
                    }
                    giamtru.Type = 1;
                    giamtru.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                }
            }
            else
            {
                model.Last_Update_User = userinfor.ID;
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                List<PhieuHocModel> lstPhieuHocCu = phdao.GetByPhieuThu(idnew);// ds phiêu học cũ
                List<PhuThuGiamTruModel> lstPhuThuGiamTruCu = ptdao.GetAllPhuThuGiamTru_ByPhieuThu(idnew);// ds phụ thu giảm trừ cũ
                foreach (PhieuHocModel ph in lstPhieuHocCu) // Xóa phiếu học cũ ko có trong model mới
                {
                    if (model.lstPhieuHoc.Find(x => x.ID == ph.ID) == null)
                    {
                        phdao.DeletePhieuHoc(ph.ID);
                    }
                }
                foreach (PhieuHocModel ph in model.lstPhieuHoc)// Thêm lại ds phiếu học
                {
                    ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                    ph.ID_NhanVien = userinfor.ID;
                    ph.ID_PhieuThu = idnew;
                    int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                    ph.SoBuoiDaHoc = count;
                    phdao.InsertOrUpdate(ph);
                }
                foreach (PhuThuGiamTruModel ptgt in lstPhuThuGiamTruCu.Where(x => x.Type == 0).ToList()) // Xóa phụ thu giảm trừ ko có trong danh sách model mới
                {
                    if (model.lstPhuThu.Find(x => x.ID == ptgt.ID) == null)
                    {
                        ptdao.DeletePhuThuGiamTru(ptgt.ID);
                    }
                }

                foreach (PhuThuGiamTruModel ptgt in lstPhuThuGiamTruCu.Where(x => x.Type == 1).ToList()) // Xóa phụ thu giảm trừ ko có trong danh sách model mới
                {
                    if (model.lstGiamTru.Find(x => x.ID == ptgt.ID) == null)
                    {
                        ptdao.DeletePhuThuGiamTru(ptgt.ID);
                    }
                }

                foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)// Thêm lại ds phụ thu
                {
                    if (phuthu.ID_PhieuHoc == 0 && phuthu.ID_Lop > 0)
                    {

                        PhieuHocModel p = new PhieuHocModel();
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 0);
                        if (p.ID != 0)
                        {

                        }
                        else
                        {
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 1);
                        }
                        if (p.ID != 0)
                        {
                            p.SoBuoi += phuthu.SoBuoi;
                            phdao.InsertOrUpdate(p);
                        }
                        else
                        {
                            p.ID_HocSinh = model.ID_HocSinh;
                            p.HocDuoi = 0;
                            p.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                            p.ID_Lop = phuthu.ID_Lop;
                            p.ID_PhieuThu = idnew;
                            p.SoBuoi = phuthu.SoBuoi;
                            p.SoTien = phuthu.DonGia;
                            p.Thang = phuthu.Thang;
                            p.NamHoc = phuthu.Nam;
                            p.SoBuoiDaHoc = p.SoBuoi;
                            p.ID_NhanVien = userinfor.ID;
                            phdao.InsertOrUpdate(p);
                        }
                    }
                    phuthu.Type = 0;
                    phuthu.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);

                }

                foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)// Thêm lại ds giảm trừ
                {
                    if (giamtru.ID_PhieuHoc == 0)
                    {
                        PhieuHocModel p = new PhieuHocModel();
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                        if (p.ID != 0)
                        {

                        }
                        else
                        {
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                        }
                        giamtru.ID_PhieuHoc = p.ID;
                    }
                    giamtru.Type = 1;
                    giamtru.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        [HttpPost]
        public ActionResult CreateOrUpdate_Temp(PhieuThuModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuHocDAO phdao = new PhieuHocDAO();
            int ID_PhieuThu = model.ID;
            if (model.lstPhuThu == null)
            {
                model.lstPhuThu = new List<PhuThuGiamTruModel>();
            }
            if (model.lstGiamTru == null)
            {
                model.lstGiamTru = new List<PhuThuGiamTruModel>();
            }
            if (model.lstPhieuHoc == null)
            {
                model.lstPhieuHoc = new List<PhieuHocModel>();
            }



            model.ID_NhanVien = userinfor.ID;
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            model.MaPhieu = "PTDHTT-" + DateTime.Now.ToString("yyyyMMddhhmmss");
            int idnew = ptdao.InsertOrUpdatePhieuThuTemp(model);
            ID_PhieuThu = idnew;
            foreach (PhieuHocModel ph in model.lstPhieuHoc)
            {
                ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                ph.ID_NhanVien = userinfor.ID;
                ph.ID_PhieuThu = idnew;
                ph.NamHoc = ph.NamHoc;
                int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                ph.SoBuoiDaHoc = count;
                phdao.InsertOrUpdateTemp(ph);
            }
            foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)
            {
                phuthu.Type = 0;
                phuthu.ID_PhieuThu = idnew;
                ptdao.InsertOrUpdatePhuThuGiamTruTemp(phuthu);
            }
            foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)
            {
                if (giamtru.ID_PhieuHoc == 0)
                {
                    PhieuHocModel p = new PhieuHocModel();
                    p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                    if (p.ID != 0)
                    {

                    }
                    else
                    {
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                    }
                    giamtru.ID_PhieuHoc = p.ID;
                }
                giamtru.Type = 1;
                giamtru.ID_PhieuThu = idnew;
                ptdao.InsertOrUpdatePhuThuGiamTruTemp(giamtru);
            }



            return Json(new { status = true, msg = "Lưu dữ liệu tạm tính thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        public ActionResult GetbyHocSinh(int ID_HocSinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetAllByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetTempbyHocSinh(int ID_HocSinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetAllTempByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetTempbyID(int ID)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetTempById(ID), JsonRequestBehavior.AllowGet);
        }

        public class InPhieuModel
        {
            public PhieuThuModel PhieuThu { get; set; }
            public TaiKhoanModel TaiKhoan { get; set; }
        }

        [SessionModeratorRole]
        public ActionResult InPhieu(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ptdao.UpdatePrintPhieuThu(ID_PhieuThu, DateTime.Now, userinfor.ID);
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = userinfor;
            return View(model);
        }

        [SessionModeratorRole]
        public ActionResult InPhieuTamTinh(int ID_PhieuTamTinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhieuThuModel pt = ptdao.GetTempById(ID_PhieuTamTinh);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = userinfor;
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ThongBaoHocPhi(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuThuModel pt = ptdao.GetTempById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = new TaiKhoanDAO().GetById(pt.ID_NhanVien);
            return View(model);
        }


    }
}