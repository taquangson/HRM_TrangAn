using Newtonsoft.Json.Linq;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.Controllers
{
    public class TracNghiemController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult KhoCauHoi()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult KhoDeThi()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult DanhSachDeThiTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + Path.GetFileName(file.FileName);
                string path = Path.Combine(Server.MapPath("~/Images/AnhCauHoi"), fileName);
                file.SaveAs(path);
                return Json(new { status = true, msg = fileName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnhDapAn(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = DateTime.Now.ToString("yyyyMMddhhmmss") + Path.GetFileName(file.FileName);
                string path = Path.Combine(Server.MapPath("~/Images/AnhDapAn"), fileName);
                file.SaveAs(path);
                return Json(new { status = true, msg = fileName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "" }, JsonRequestBehavior.AllowGet);
            }
        }


        [SessionExpire]
        [HttpGet]
        public ActionResult GetDeThiByMonHoc(int ID_MonHoc)
        {
            DeThiDAO dtdao = new DeThiDAO();
            return Json(dtdao.GetDeThi_GetByMonHoc(ID_MonHoc), JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        [HttpGet]
        public ActionResult GetDeThiByID(int ID)
        {
            DeThiDAO dtdao = new DeThiDAO();
            return Json(dtdao.GetDeThiById(ID), JsonRequestBehavior.AllowGet);
        }



        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllDeThi()
        {
            DeThiDAO dtdao = new DeThiDAO();
            return Json(dtdao.GetAllDeThi(), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetCauHoiByDanhMuc(int ID_DanhMuc)
        {
            CauHoiDAO chdao = new CauHoiDAO();
            return Json(chdao.GetCauHoi_GetByDanhMuc(ID_DanhMuc), JsonRequestBehavior.AllowGet);
        }

        [HttpPost, ValidateInput(false)]
        [SessionExpire]
        public ActionResult CauHoi_InsertOrUpdate(CauHoiModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            item.ID_TaiKhoan = userinfor.ID;
            item.SoDapAn = item.lstDapAn == null ? 0 : item.lstDapAn.Count;
            item.SoDapAnDung = item.lstDapAn == null ? 0 : item.lstDapAn.Count(x => x.IsDapAnDung == 1);
            CauHoiDAO dao = new CauHoiDAO();
            int ID_CauHoi = dao.InsertOrUpdate_CauHoi(item);
            if (ID_CauHoi > 0)
            {
                if (item.ID > 0)
                {
                    List<DapAnModel> dapan_old = dao.GetDapAn_ByCauHoi(ID_CauHoi);
                    if (dapan_old.Count > 0)
                    {
                        foreach (DapAnModel da in dapan_old)
                        {
                            if (item.lstDapAn == null)
                            {
                                dao.Delete_DapAn(da.ID);
                            }
                            else if (item.lstDapAn.FirstOrDefault(x => x.ID == da.ID) == null)
                            {
                                dao.Delete_DapAn(da.ID);
                            }
                        }
                    }
                }
                if (item.lstDapAn != null)
                {
                    foreach (DapAnModel d in item.lstDapAn)
                    {
                        d.ID_CauHoi = ID_CauHoi;
                        dao.InsertOrUpdate_DapAn(d);
                    }
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        [SessionExpire]
        public ActionResult DeThi_InsertOrUpdate(DeThiModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            item.ID_TaiKhoan = userinfor.ID;
            DeThiDAO dao = new DeThiDAO();
            int ID_DeThi = dao.InsertOrUpdate_DeThi(item);
            if (ID_DeThi > 0)
            {
                if (item.ID > 0)
                {
                    List<DeThi_CauHoiModel> cauhoi_old = dao.GetCauHoiDeThi_GetByDeThi(ID_DeThi);
                    if (cauhoi_old.Count > 0)
                    {
                        foreach (DeThi_CauHoiModel ch in cauhoi_old)
                        {
                            if (item.lstDeThiCauHoi != null)
                            {
                                if (item.lstDeThiCauHoi.FirstOrDefault(x => x.ID == ch.ID) == null)
                                {
                                    dao.Delete_DeThiCauHoi(ch.ID);
                                }
                            }
                            else
                            {
                                dao.Delete_DeThiCauHoi(ch.ID);
                            }
                        }
                    }

                    List<DeThi_ChiTietModel> chitiet_old = dao.GetChiTietDeThi_GetByDeThi(ID_DeThi);
                    if (cauhoi_old.Count > 0)
                    {
                        foreach (DeThi_ChiTietModel ct in chitiet_old)
                        {
                            if (item.lstChiTiet != null)
                            {
                                if (item.lstChiTiet.FirstOrDefault(x => x.ID == ct.ID) == null)
                                {
                                    dao.Delete_DeThiChiTiet(ct.ID);
                                }
                            }
                            else
                            {
                                dao.Delete_DeThiChiTiet(ct.ID);
                            }
                        }
                    }
                }
                float point = 0;
                if (item.lstChiTiet != null)
                {
                    foreach (DeThi_ChiTietModel t in item.lstChiTiet)
                    {
                        t.ID_DeThi = ID_DeThi;
                        point += item.Diem;
                        dao.InsertOrUpdate_DeThiChiTiet(t);
                    }
                }
                if (item.lstDeThiCauHoi != null)
                {
                    foreach (DeThi_CauHoiModel c in item.lstDeThiCauHoi)
                    {
                        c.ID_DeThi = ID_DeThi;
                        c.Diem = (item.Diem - point) / item.lstDeThiCauHoi.Count;
                        dao.InsertOrUpdate_DeThiCauHoi(c);
                    }
                }

                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        public class TreeDanhMucCauHoi
        {
            public int ID { get; set; }
            public int ID_Cha { get; set; }
            public string TenDanhMucCauHoi { get; set; }
            public List<TreeDanhMucCauHoi> lstDanhMuc { get; set; }

        }
        [SessionExpire]
        public ActionResult GetTreeDanhMucCauHoi()
        {
            DanhMucCauHoiDAO dmchdao = new DanhMucCauHoiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<DanhMucCauHoiModel> lcn = dmchdao.GetAll();
            List<TreeDanhMucCauHoi> list = new List<TreeDanhMucCauHoi>();

            foreach (DanhMucCauHoiModel obj in lcn)
            {
                IEnumerable<DanhMucCauHoiModel> findCha = lcn.Where(person => person.ID == obj.ID_Cha);

                bool flag = true;
                foreach (DanhMucCauHoiModel i in findCha)
                {
                    flag = false;
                    break;
                }

                if (flag)
                {
                    TreeDanhMucCauHoi resultObj = new TreeDanhMucCauHoi();

                    TaoNhom(obj, lcn, resultObj);

                    list.Add(resultObj);
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        protected void TaoNhom(DanhMucCauHoiModel obj, List<DanhMucCauHoiModel> lstDanhMuc, TreeDanhMucCauHoi resultObj)
        {
            resultObj.ID = obj.ID;
            resultObj.TenDanhMucCauHoi = obj.TenDanhMucCauHoi;
            resultObj.ID_Cha = obj.ID_Cha;
            var query1 = lstDanhMuc.Where(person => person.ID_Cha == obj.ID);

            List<TreeDanhMucCauHoi> li = new List<TreeDanhMucCauHoi>();
            foreach (DanhMucCauHoiModel obj1 in query1)
            {
                TreeDanhMucCauHoi objcon = new TreeDanhMucCauHoi();
                TaoNhom(obj1, lstDanhMuc, objcon);
                li.Add(objcon);
            }
            resultObj.lstDanhMuc = li;
        }

        [HttpPost]
        public ActionResult DanhMucCauHoi_InsertOrUpdate(DanhMucCauHoiModel item)
        {
            DanhMucCauHoiDAO pbdao = new DanhMucCauHoiDAO();
            if (pbdao.InsertOrUpdate_DanhMucCauHoi(item) > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DanhMucCauHoi_Delete(int ID_DanhMucCauHoi)
        {
            DanhMucCauHoiDAO pbdao = new DanhMucCauHoiDAO();
            if (pbdao.Delete_DanhMucCauHoi(ID_DanhMucCauHoi))
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [SessionExpire]
        public ActionResult DeThi_GiaoDeChoHocSinh(BaiLamTracNghiemModel item)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            item.NgayGiao = DateTime.Now;
            int ID_BaiLamTracNghiem = dao.InsertOrUpdate_BaiLamTracNghiem(item);
            if (ID_BaiLamTracNghiem > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [SessionExpire]
        public ActionResult DeThi_CapNhatGiaoDeChoHocSinh(BaiLamTracNghiemModel item)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            BaiLamTracNghiemModel model = dao.GetBaiLamByID(item.ID);
            model.HanNopBai = item.HanNopBai;
            model.HanNiemPhong = item.HanNiemPhong;
            model.GioiHanLanLam = item.GioiHanLanLam;
            model.TrangThai = item.TrangThai;
            int ID_BaiLamTracNghiem = dao.InsertOrUpdate_BaiLamTracNghiem(model);
            if (ID_BaiLamTracNghiem > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [SessionExpire]
        public ActionResult DeThi_XoaDeChoHocSinh(int ID_BailamTracNghiem)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            BaiLamTracNghiemModel item = dao.GetBaiLamByID(ID_BailamTracNghiem);
            bool success = false;
            if (item.lstChitiet.Count == 0 && item.lstLichsu.Count == 0)
            {
                success = dao.Delete_BaiLamTracNghiem(ID_BailamTracNghiem);
            }
            else
            {
                item.TrangThai = 0;
                if (dao.InsertOrUpdate_BaiLamTracNghiem(item) > 0)
                {
                    success = true;
                }
            }
            if (success)
            {
                return Json(new { status = true, msg = "Cập nhật dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Cập nhật dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [SessionExpire]
        public ActionResult BaiLamTracNghiem_BatDauLamBai(BaiLamTracNghiemModel item)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            LichSu_BaiLamTracNghiemModel his = new LichSu_BaiLamTracNghiemModel();
            BaiLamTracNghiemModel old = dao.GetBaiLamByID(item.ID);

            if (item.ID > 0)
            {
                old.ThoiGianBatDau = DateTime.Now;
                old.TrangThai = 2;
                List<BaiLamTracNghiem_ChiTietModel> lstchitiet_old = dao.GetBaiLamChiTiet(old.ID);
                string jsonchitiet = new JavaScriptSerializer().Serialize(lstchitiet_old);
                his.ChiTiet = jsonchitiet;
                his.Diem = old.Diem;
                his.ID_BaiLamTracNghiem = old.ID;
                his.ThoiGianBatDau = old.ThoiGianBatDau;
                his.ThoiGianKetThuc = old.ThoiGianKetThuc;

            }
            int ID_BaiLamTracNghiem = dao.InsertOrUpdate_BaiLamTracNghiem(old);
            if (ID_BaiLamTracNghiem > 0)
            {
                dao.InsertOrUpdate_LichSuBaiLamTracNghiem(his);
                dao.Delete_BaiLamTracNghiemChiTiet(ID_BaiLamTracNghiem);
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost, ValidateInput(false)]
        [SessionExpire]
        public ActionResult BaiLamTracNghiem_KetThucLamBai(BaiLamTracNghiemModel item)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            BaiLamTracNghiemModel old = dao.GetBaiLamByID(item.ID);
            float diem = 0;
            if (item.ID > 0)
            {
                if (item.lstChitiet != null)
                {
                    foreach (BaiLamTracNghiem_ChiTietModel c in item.lstChitiet)
                    {
                        if (c.TraLoiDung == 1)
                        {
                            diem += c.Diem;
                        }
                    }
                }
                old.Diem = diem;
                old.TrangThai = 3;
                old.ThoiGianKetThuc = DateTime.Now;
            }
            int ID_BaiLamTracNghiem = dao.InsertOrUpdate_BaiLamTracNghiem(old);
            if (ID_BaiLamTracNghiem > 0)
            {
                if (item.lstChitiet != null)
                {
                    foreach (BaiLamTracNghiem_ChiTietModel c in item.lstChitiet)
                    {
                        c.ID_BaiLamTracNghiem = ID_BaiLamTracNghiem;
                        dao.InsertOrUpdate_BaiLamTracNghiemChiTiet(c);
                    }
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [SessionExpire]
        public ActionResult ChamDiemTuLuan(BaiLamTracNghiem_ChiTietModel item)
        {
            BaiLamTracNghiemDAO dao = new BaiLamTracNghiemDAO();
            BaiLamTracNghiemModel old = dao.GetBaiLamByID(item.ID_BaiLamTracNghiem);
            float diem = 0;
            if(item.Diem > 0)
            {
                item.TraLoiDung = 1;
            }
            if (old.lstChitiet != null)
            {
                foreach (BaiLamTracNghiem_ChiTietModel c in old.lstChitiet)
                {
                    if (c.ID_CauHoi == item.ID_CauHoi)
                    {
                        c.Diem = item.Diem;
                        c.TraLoiDung = item.TraLoiDung;
                        if (!string.IsNullOrWhiteSpace(item.TraLoi))
                        {
                            c.TraLoi = item.TraLoi;
                        }
                        dao.InsertOrUpdate_BaiLamTracNghiemChiTiet(c);
                    }
                    diem += c.Diem;
                }
            }

            old.Diem = diem;
            int ID_BaiLamTracNghiem = dao.InsertOrUpdate_BaiLamTracNghiem(old);
            if (ID_BaiLamTracNghiem > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }



        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllBaiLamTracNghiem_ByHocSinh(int ID_HocSinh)
        {
            BaiLamTracNghiemDAO dtdao = new BaiLamTracNghiemDAO();
            return Json(dtdao.GetBaiLamByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllBaiLamTracNghiem_ByDeThi(int ID_DeThi)
        {
            BaiLamTracNghiemDAO dtdao = new BaiLamTracNghiemDAO();
            return Json(dtdao.GetBaiLamByDeThi(ID_DeThi), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetBaiLamTracNghiem_ByID(int ID_BaiLamTracNghiem)
        {
            BaiLamTracNghiemDAO dtdao = new BaiLamTracNghiemDAO();
            return Json(dtdao.GetBaiLamByID(ID_BaiLamTracNghiem), JsonRequestBehavior.AllowGet);
        }

    }
}