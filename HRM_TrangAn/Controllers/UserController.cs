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
    public class UserController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(UserController));

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ChangePass()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult TaiKhoanApp()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ChucDanh()
        {
            return View();
        }

        public class ChangePassModel
        {
            public string TenDayDu { get; set; }
            public string NewPass { get; set; }
            public string OldPass { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThayDoiMatKhau(ChangePassModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (tk_dao.CheckLogin(userinfor.TaiKhoan, model.OldPass))
            {
                TaiKhoanModel tk = tk_dao.GetByTenTaiKhoanOrEmail(userinfor.TaiKhoan);
                tk.MatKhau = model.NewPass;
                tk.TenDayDu = model.TenDayDu;
                tk_dao.InsertOrUpdate(tk);
                return Json(new { status = true, msg = "Thay đổi thông tin cá nhân thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Thay đổi thông tin cá nhân thất bại" }, JsonRequestBehavior.AllowGet);
            }

        }
        // GET: User
        public ActionResult Login()
        {
            log.Info("Login");
            if (TempData["Error"] != null)
            {
                ViewBag.Error = TempData["Error"].ToString();
            }
            else
            {
                ViewBag.Error = "";
            }
            return View();
        }

        public ActionResult LogOff()
        {
            Session["UserInfor"] = null;
            return RedirectToAction("Login", "User");
        }

        public ActionResult UserLogin(LoginModel model)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (tk_dao.CheckLogin(model.UserName, model.Password))
            {
                Session["UserInfor"] = tk_dao.GetByTenTaiKhoanOrEmail(model.UserName);
                return RedirectToAction("Index", "Home");
            }
            else if (tk_dao.CheckLogin_AppForChangePass(model.UserName, model.Password))
            {
                UserAppModel u = tk_dao.GetAppUserInfoByName(model.UserName);
                TaiKhoanModel t = new TaiKhoanModel();
                t.TenDayDu = u.UserName;
                t.ID = u.ID;
                t.lstHocSinh = u.lstHocSinh;
                t.Role = -1;// Role=-1 tài khoản app của phụ huynh
                Session["UserInfor"] = t;
                return RedirectToAction("IndexHS", "Home");
            }
            else
            {
                TempData["Error"] = "Tài khoản hoặc mật khẩu không đúng";
                return RedirectToAction("Login", "User");
            }

        }

        [SessionExpire]
        public ActionResult GetAllUser_TrongPhongBan(int ID_PhongBan)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<TaiKhoanModel> result = tk_dao.GetAllByPhongBan(ID_PhongBan);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetAllUser_NgoaiPhongBan(int ID_PhongBan)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<TaiKhoanModel> result = tk_dao.GetAllNgoaiPhongBan(ID_PhongBan);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetAllUser()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (userinfor.Role == 1)
            {
                List<TaiKhoanModel> result = tk_dao.GetAll();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                List<TaiKhoanModel> result = tk_dao.GetAllByChiNhanh(userinfor.ID_ChiNhanh);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        public ActionResult GetAllUser_DangKyLichNghi()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (userinfor.Role == 1)
            {
                List<TaiKhoanModel> result = tk_dao.GetAll();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                List<TaiKhoanModel> result = new List<TaiKhoanModel>();
                result.Add(userinfor);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        public ActionResult GetAllAppUser()
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<UserAppModel> result = tk_dao.GetAllUserApp();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetUserOnline_TinNhanMoi()
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<UserAppModel> result = tk_dao.GetUserOnline_TinNhanMoi();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllChiNhanh()
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<ChiNhanhModels> result = tk_dao.GetDsChiNhanh();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetUserById(int ID)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            TaiKhoanModel result = tk_dao.GetById(ID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(TaiKhoanModel model)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (model.ID > 0)
            {
                TaiKhoanModel item = tk_dao.GetById(model.ID);
                item.TenDayDu = model.TenDayDu;
                item.Email = model.Email;
                item.DiaChi = model.DiaChi;
                item.DienThoai = model.DienThoai;
                item.ID_ChiNhanh = model.ID_ChiNhanh;
                item.ID_HoSoNhanSu = model.ID_HoSoNhanSu;
                if (tk_dao.GetByTenTaiKhoanOrEmail(item.Email).ID != item.ID && tk_dao.GetByTenTaiKhoanOrEmail(item.Email).ID != 0)
                {
                    return Json(new { status = false, msg = "Email đã được sử dụng cho tài khoản khác" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.InsertOrUpdate(item) > 0)
                {
                    return Json(new { status = true, msg = "Câp nhật thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Câp nhật thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                if (tk_dao.GetByTenTaiKhoanOrEmail(model.TaiKhoan) != null)
                {
                    return Json(new { status = false, msg = "Tên tài khoản đã được sử dụng" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.GetByTenTaiKhoanOrEmail(model.Email) != null)
                {
                    return Json(new { status = false, msg = "Email đã được sử dụng" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.InsertOrUpdate(model) > 0)
                {
                    return Json(new { status = true, msg = "Thêm thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Thêm thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate_AppUser(UserAppModel model)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (model.ID > 0)
            {
                UserAppModel item = tk_dao.GetAppUserInfoByName(model.UserName);
                item.ExpriedTime = model.ExpriedTime;
                item.Status = model.Status;
                item.EmployeeType = model.EmployeeType;
                item.UserName = item.UserName.Trim();
                if (tk_dao.InsertOrUpdate_AppUser(item) > 0)
                {
                    return Json(new { status = true, msg = "Câp nhật thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Câp nhật thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                if (tk_dao.InsertOrUpdate_AppUser(model) > 0)
                {
                    return Json(new { status = true, msg = "Thêm thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Thêm thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThemQuyen(int ID_TaiKhoan, int ID_Quyen)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            bool result = tk_dao.ThemQuyen(ID_Quyen, ID_TaiKhoan);
            if (result)
            {
                return Json(new { status = result, msg = "Phân quyền thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Phân quyền thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetQuyen(int ID_TaiKhoan)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            int result = tk_dao.GetQuyen(ID_TaiKhoan);
            return Json(new { ID_Quyen = result }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult XoaQuyen(int ID_TaiKhoan, int ID_Quyen)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            bool result = tk_dao.XoaQuyen(ID_Quyen, ID_TaiKhoan);
            if (result)
            {
                return Json(new { status = result, msg = "Xóa quyền thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Xóa quyền thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (tk_dao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }
        
        [HttpPost]
        public ActionResult UpdateToken(string token)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (tk_dao.UpdateToken(userinfor.ID, token))
            {
                return Json(new { status = true, msg = "Cập nhật token thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Cập nhật token thất bại" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}