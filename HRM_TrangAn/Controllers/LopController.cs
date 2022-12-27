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
    public class LopController : Controller
    {
        // GET: Lop
        [SessionExpire]
        [SessionModeratorRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult DanhSachLopTheoGiaoVien()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            LopHocDAO hsdao = new LopHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (userinfor.Role == 3)
            {
                return Json(hsdao.GetByGiaoVien(userinfor.ID), JsonRequestBehavior.AllowGet);
            }
            else if (userinfor.Role == 2)
            {
                return Json(hsdao.GetAll_LopHoc(userinfor.ID_ChiNhanh), JsonRequestBehavior.AllowGet);
            }
            else if (userinfor.Role == 1)
            {
                return Json(hsdao.GetAll_LopHoc(0), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllKhoi()
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetAll_Khoi(), JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult GetAllByChiNhanh(int ID_ChiNhanh)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetAll_LopHoc(ID_ChiNhanh), JsonRequestBehavior.AllowGet);

        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetById(int ID)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetById_LopHoc(ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult DuyetLop(int ID_Lop)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.PheDuyet(ID_Lop), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByGiaoVien()
        {
            LopHocDAO hsdao = new LopHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(hsdao.GetByGiaoVien(userinfor.ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllLop_ByGiaoVien(int ID_GiaoVien)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetByGiaoVien(ID_GiaoVien), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByHocSinh(int ID_HocSinh)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetAll_ByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(LopHocModel model)
        {
            LopHocDAO hsdao = new LopHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            //string fileName = "";
            ////if (file != null && file.ContentLength > 0)
            ////{
            ////    fileName = Path.GetFileName(file.FileName);
            ////    var path = Path.Combine(Server.MapPath("~/Images/SoDoLop"), fileName);
            ////    file.SaveAs(path);
            ////}
            //JObject json = JObject.Parse(model);
            //LopHocModel lhmodel = new LopHocModel();

            //lhmodel.ID = int.Parse(json["ID"].ToString());
            //if(lhmodel.ID > 0)
            //{
            //    lhmodel = hsdao.GetById_LopHoc(lhmodel.ID);
            //}
            //lhmodel.GiaoVien = int.Parse(json["GiaoVien"].ToString());
            //lhmodel.TenLop = json["TenLop"].ToString();
            //lhmodel.LichHoc = json["LichHoc"].ToString();
            //if (!string.IsNullOrWhiteSpace(fileName))
            //{
            //    lhmodel.SoDoLop = fileName;
            //}
            int newid = hsdao.InsertOrUpdate(model);
            if (newid > 0)
            {
                LichHocDAO lhdao = new LichHocDAO();
                try
                {
                    if (model.lstLichHoc != null)
                    {
                        //Xóa lịch không trong danh sách
                        List<LichHocModel> lstLichHocCu = lhdao.GetByLop(newid);
                        List<LichHocModel> lstLichHocMoi = model.lstLichHoc;
                        foreach (LichHocModel l in lstLichHocCu.Except(lstLichHocMoi.ToList(), new LichHocComparer()))
                        {
                            lhdao.Delete(l.ID);
                        }

                        //Thêm, sửa lịch trong danh sách
                        foreach (LichHocModel l in model.lstLichHoc)
                        {
                            if (l.Ca > 0 && l.Thu > 0)
                            {
                                l.ID_Lop = newid;
                                lhdao.InsertOrUpdate(l);
                            }
                        }
                    }
                    else
                    {
                        List<LichHocModel> lstLichHocCu = lhdao.GetByLop(newid);
                        foreach (LichHocModel l in lstLichHocCu)
                        {
                            lhdao.Delete(l.ID);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { status = true, msg = "Lưu dữ liệu thành công, chưa lưu được lịch học!" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdateByGiaoVien(LopHocModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            LopHocDAO hsdao = new LopHocDAO();
            model.GiaoVien = userinfor.ID;
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            int newid = hsdao.InsertOrUpdateByGiaoVien(model);
            if (newid > 0)
            {
                LichHocDAO lhdao = new LichHocDAO();
                try
                {
                    if (model.lstLichHoc != null)
                    {
                        //Xóa lịch không trong danh sách
                        List<LichHocModel> lstLichHocCu = lhdao.GetByLop(newid);
                        List<LichHocModel> lstLichHocMoi = model.lstLichHoc;
                        foreach (LichHocModel l in lstLichHocCu.Except(lstLichHocMoi.ToList(), new LichHocComparer()))
                        {
                            lhdao.Delete(l.ID);
                        }

                        //Thêm, sửa lịch trong danh sách
                        foreach (LichHocModel l in model.lstLichHoc)
                        {
                            if (l.Ca > 0 && l.Thu > 0)
                            {
                                l.ID_Lop = newid;
                                lhdao.InsertOrUpdate(l);
                            }
                        }
                    }
                    else
                    {
                        List<LichHocModel> lstLichHocCu = lhdao.GetByLop(newid);
                        foreach (LichHocModel l in lstLichHocCu)
                        {
                            lhdao.Delete(l.ID);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { status = true, msg = "Lưu dữ liệu thành công, chưa lưu được lịch học!" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công, chờ bộ phận văn phòng duyệt lịch học" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        internal class LichHocComparer : IEqualityComparer<LichHocModel>
        {
            public bool Equals(LichHocModel x, LichHocModel y)
            {
                if (x.ID == y.ID)
                {
                    return true;
                }
                return false;
            }

            public int GetHashCode(LichHocModel obj)
            {
                return obj.ID.GetHashCode();
            }
        }

        public class ThemHocSinhVaoLopModel
        {
            public int ID_Lop { get; set; }
            public List<HocSinhModel> lstHocSinh { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThemHocSinhVaoLop(ThemHocSinhVaoLopModel model)
        {
            Lop_HocSinhDAO lhsdao = new Lop_HocSinhDAO();
            List<HocSinhModel> lsthocsinhcu = new HocSinhDAO().GetByLop_HocSinh(model.ID_Lop);
            if (model.lstHocSinh == null)
            {
                model.lstHocSinh = new List<HocSinhModel>();
            }

            foreach (HocSinhModel hs in model.lstHocSinh)
            {
                if (lsthocsinhcu.Find(x => x.ID == hs.ID) == null)
                {
                    Lop_HocSinhModel item = new Lop_HocSinhModel();
                    item.ID_Lop = model.ID_Lop;
                    item.ID_HocSinh = hs.ID;
                    lhsdao.InsertOrUpdate(item);
                }
            }

            foreach (HocSinhModel h in lsthocsinhcu)
            {
                if (model.lstHocSinh.Find(x => x.ID == h.ID) == null)
                {
                    lhsdao.DeleteByLop_HocSinh(model.ID_Lop, h.ID);
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            LopHocDAO hsdao = new LopHocDAO();
            if (hsdao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Golive(int ID_Lop, string Token, int TrangThai)
        {
            LopHocDAO lhdao = new LopHocDAO();
            int ID = lhdao.UpdateLive(ID_Lop, TrangThai, Token);
            if(ID > 0 && TrangThai > 0)
            {
                lhdao.Insert_LichSuLive(ID_Lop, Token);
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }
    }
}