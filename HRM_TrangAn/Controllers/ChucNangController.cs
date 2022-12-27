using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class ChucNangController : Controller
    {
        // GET: ChucNang
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllChucNangNgoaiPhongBan(int ID_PhongBan)
        {
            ChucNangDAO cndao = new ChucNangDAO();
            List<ChucNangModel> lstcn = cndao.GetChucNangNgoaiPhongBan(ID_PhongBan);
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllChucNangTrongPhongBan(int ID_PhongBan)
        {
            ChucNangDAO cndao = new ChucNangDAO();
            List<ChucNangModel> lstcn = cndao.GetChucNangTrongPhongBan(ID_PhongBan);
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        public class TreeChucNang
        {
            public int ID_NhomChucNang { get; set; }
            public string TenNhomChucNang { get; set; }
            public string Icon { get; set; }
            public List<ChucNangModel> lstChucNang { get; set; }

        }

        public ActionResult GetChucNangByTaiKhoan()
        {

            ChucNangDAO cndao = new ChucNangDAO();
            List<TreeChucNang> lstcn = new List<TreeChucNang>();
            try
            {
                TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                List<ChucNangModel> lcn = cndao.GetChucNangByTaiKhoan(userinfor.ID);
                if (userinfor.Role == -1)
                {
                    return Json(lstcn, JsonRequestBehavior.AllowGet);
                }
                if (userinfor.ID_ChiNhanh == 0)
                {
                    lcn = cndao.GetAll();
                }
                foreach (ChucNangModel cn in lcn)
                {
                    if (lstcn.Where(x => x.ID_NhomChucNang == cn.ID_NhomChucNang).FirstOrDefault() == null)
                    {
                        lstcn.Add(new TreeChucNang()
                        {
                            ID_NhomChucNang = cn.ID_NhomChucNang,
                            TenNhomChucNang = cn.TenNhomChucNang,
                            lstChucNang = new List<ChucNangModel>(),
                            Icon = cn.Icon
                        });
                    }
                }
                foreach (TreeChucNang tcn in lstcn)
                {
                    //tcn.lstChucNang.AddRange(lcn.);
                    foreach (ChucNangModel cn in lcn.Where(x => x.ID_NhomChucNang == tcn.ID_NhomChucNang))
                    {
                        if (tcn.lstChucNang.Where(x => x.ID_ChucNang == cn.ID_ChucNang).FirstOrDefault() == null)
                        {
                            tcn.lstChucNang.Add(cn);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ThemChucNangVaoPhongBan(int ID_ChucNang, int ID_PhongBan)
        {
            ChucNangDAO cndao = new ChucNangDAO();
            if (cndao.ThemChucNangPhongBan(ID_ChucNang, ID_PhongBan))
            {
                return Json(new { status = true, msg = "Lưu thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu thông tin thất bại, vui lòng liên hệ Admin" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult XoaChucNangVaoPhongBan(int ID_ChucNang, int ID_PhongBan)
        {
            ChucNangDAO cndao = new ChucNangDAO();
            if (cndao.XoaChucNangPhongBan(ID_ChucNang, ID_PhongBan))
            {
                return Json(new { status = true, msg = "Xóa thông tin thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xóa thông tin thất bại, vui lòng liên hệ Admin" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}