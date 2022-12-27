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
    public class TuyenDoController : Controller
    {
        // GET: TuyenDo
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllTuyenDo()
        {
            TuyenDoDAO dao = new TuyenDoDAO();
            List<TuyenDoModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_TuyenDo(TuyenDoModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TuyenDoDAO dao = new TuyenDoDAO();
            TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;

            if (item.ID == 0)
            {
                IDnew = dao.InsertOrUpdate(item);

                for (int i = 0; i < item.lstDiemTuyen.Count; i++)
                {
                    TuyenDo_DiemModel x = item.lstDiemTuyen[i];
                    tddao.Insert(x, IDnew);
                }
                
            }
            else
            {
                IDnew = dao.InsertOrUpdate(item);
                List<TuyenDo_DiemModel> cur_lst = tddao.GetAllByTuyen(item.ID);
                if (item.lstDiemTuyen == null)
                {
                    item.lstDiemTuyen = new List<TuyenDo_DiemModel>();
                }
                List<TuyenDo_DiemModel> delete_lst = cur_lst.Except<TuyenDo_DiemModel>(item.lstDiemTuyen).ToList(); // Danh sách nhân viên bị xóa
                List<TuyenDo_DiemModel> insert_lst = item.lstDiemTuyen.Except<TuyenDo_DiemModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
                if (delete_lst != null)
                {
                    foreach (TuyenDo_DiemModel del in delete_lst) // Xóa các item cũ
                    {
                        if (tddao.Delete(del.ID))
                        {

                        }
                        else
                        {
                            countXoaErr++;
                        }
                    }
                }
                if (insert_lst != null)
                {
                    foreach (TuyenDo_DiemModel ins in insert_lst) // Thêm các item mới
                    {
                        if (tddao.Insert(ins, IDnew) > 0)
                        {

                        }
                        else
                        {
                            countThemErr++;
                        }
                    }
                }
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
        public ActionResult Delete_TuyenDo(int ID)
        {
            TuyenDoDAO dm_dao = new TuyenDoDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
            if (tddao.DeleteByIDTuyenDo(ID))
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
        public ActionResult DeleteMulti_TuyenDo(string ID)
        {
            TuyenDoDAO dm_dao = new TuyenDoDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
            if (dm_dao.DeleteMulti(ID))
            {
                if (tddao.DeleteMultiByIDTuyenDo(ID))
                {
                }
                return Json(new { success = true, msg = "Xóa chuyến tổ thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa chuyến tổ thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }


        }
    }
}