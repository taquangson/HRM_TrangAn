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
    public class PhongBanController : Controller
    {
        // GET: PhongBan
        [SessionAdminRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult CauHinhCongChuan()
        {
            return View();
        }

        public ActionResult GetAllPhongBanCongChuan()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhongBan_CongChuanDAO dao = new PhongBan_CongChuanDAO();
            List<PhongBan_CongChuanModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult InsertPhongBanCongChuan(PhongBan_CongChuanModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhongBan_CongChuanDAO dao = new PhongBan_CongChuanDAO();
            int ID = dao.InsertOrUpdate(model);
            if (ID > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionAdminRole]
        public ActionResult CreateOrUpdate(PhongBanModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhongBanDAO pbdao = new PhongBanDAO();
            if (userinfor.ID_ChiNhanh == 0)
            {
                PhongBanModel cha = pbdao.GetByID(item.ID_PhongBanCha);
                item.ID_ChiNhanh = cha.ID_ChiNhanh;
            }
            else
            {
                item.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            }
            int ID = pbdao.InsertOrUpdate(item);
            if (ID > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAllPhongBan()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhongBanDAO pbdao = new PhongBanDAO();
            List<PhongBanModel> lstPhongBan = pbdao.GetAll();

            return Json(lstPhongBan, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTreePhongBan()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhongBanDAO pbdao = new PhongBanDAO();
            List<PhongBanModel> lstPhongBan = pbdao.GetAll();
            List<TreePhongBanModel> list = new List<TreePhongBanModel>();

            foreach (PhongBanModel obj in lstPhongBan)
            {
                IEnumerable<PhongBanModel> findCha = lstPhongBan.Where(person => person.ID == obj.ID_PhongBanCha);

                bool flag = true;
                foreach (PhongBanModel i in findCha)
                {
                    flag = false;
                    break;
                }

                if (flag)
                {
                    TreePhongBanModel resultObj = new TreePhongBanModel();

                    TaoNhom(obj, lstPhongBan, resultObj);

                    list.Add(resultObj);
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        protected class TreePhongBanModel
        {
            public int ID { get; set; }
            public int ID_PhongBanCha { get; set; }
            public string TenPhongBan { get; set; }
            public List<TreePhongBanModel> lstChild { get; set; }
        }

        [SessionAdminRole]
        protected void TaoNhom(PhongBanModel obj, List<PhongBanModel> lstDanhMuc, TreePhongBanModel resultObj)
        {
            resultObj.ID = obj.ID;
            resultObj.TenPhongBan = obj.TenPhongBan;
            resultObj.ID_PhongBanCha = obj.ID_PhongBanCha;
            var query1 = lstDanhMuc.Where(person => person.ID_PhongBanCha == obj.ID);

            List<TreePhongBanModel> li = new List<TreePhongBanModel>();
            foreach (PhongBanModel obj1 in query1)
            {
                TreePhongBanModel objcon = new TreePhongBanModel();
                TaoNhom(obj1, lstDanhMuc, objcon);
                li.Add(objcon);
            }
            resultObj.lstChild = li;
        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult ThemTaiKhoanVaoPhongBan(int ID_PhongBan, int ID_TaiKhoan)
        {
            PhongBanDAO pbdao = new PhongBanDAO();
            if (pbdao.ThemTaiKhoanVaoPhongBan(ID_TaiKhoan, ID_PhongBan))
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult XoaTaiKhoanKhoiPhongBan(int ID_PhongBan, int ID_TaiKhoan)
        {
            PhongBanDAO pbdao = new PhongBanDAO();
            if (pbdao.XoaTaiKhoanKhoiPhongBan(ID_TaiKhoan, ID_PhongBan))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}