using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Schedule;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class DiemQuetTheController : Controller
    {
        // GET: DiemQuetThe
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllDiemQuetThe()
        {
            DiemQuetTheDAO dao = new DiemQuetTheDAO();
            List<DiemQuetTheModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetByMaDiemQuetThe(string MaDiem)
        {
            DiemQuetTheDAO dao = new DiemQuetTheDAO();
            List<DiemQuetTheModel> data = dao.GetByMa(MaDiem);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_DiemQuetThe(DiemQuetTheModel item)
        {
            DiemQuetTheDAO dm_dao = new DiemQuetTheDAO();
            MayChamCong_DiemQuetTheDAO mccdao = new MayChamCong_DiemQuetTheDAO();

            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;
            IDnew = dm_dao.InsertOrUpdate(item);

            if (item.ID == 0)
            {
                if (item.lstMayChamCongDiemQuetThe == null)
                {
                    item.lstMayChamCongDiemQuetThe = new List<MayChamCong_DiemQuetTheModel>();
                }
                foreach (MayChamCong_DiemQuetTheModel x in item.lstMayChamCongDiemQuetThe)
                {
                    mccdao.Insert(IDnew, x.ID_MayChamCong);
                }
            }
            else
            {
                List<MayChamCong_DiemQuetTheModel> cur_lst = mccdao.GetAllByDiemQuetThe(item.ID);
                if (item.lstMayChamCongDiemQuetThe == null)
                {
                    item.lstMayChamCongDiemQuetThe = new List<MayChamCong_DiemQuetTheModel>();
                }
                List<int> cur_lstID = cur_lst.Select(c => c.ID_MayChamCong).ToList();
                List<int> update_lstID = item.lstMayChamCongDiemQuetThe.Select(c => c.ID_MayChamCong).ToList();
                List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
                List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách nhân viên được thêm
                if (item.TrangThai == 1)
                {
                    foreach (int idmcc in delete_lstID)
                    {
                        foreach (MayChamCong_DiemQuetTheModel del in cur_lst) // Xóa các item cũ
                        {
                            if (del.ID_MayChamCong == idmcc)
                            {
                                if (mccdao.Delete(del.ID))
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

                foreach (int idmcc in insert_lstID)
                {
                    if (mccdao.Insert(IDnew, idmcc) > 0)
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
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ListDiemQuetThe(List<DiemQuetTheModel> list)
        {
            DiemQuetTheDAO dm_dao = new DiemQuetTheDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.InsertOrUpdateMulti(list))
            {
                return Json(new { success = true, msg = "Lưu file thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu file thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Delete_DiemQuetThe(string ID)
        {
            DiemQuetTheDAO dm_dao = new DiemQuetTheDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.DeleteMulti(ID))
            {
                return Json(new { success = true, msg = "Xóa danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Xóa danh mục thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteMulti_DiemQuetThe(int ID)
        {
            DiemQuetTheDAO dm_dao = new DiemQuetTheDAO();
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
        public ActionResult UpdateTrangThai_DiemQuetThe(int ID, int TrangThai)
        {
            DiemQuetTheDAO dm_dao = new DiemQuetTheDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.UpdateTrangThai(ID, TrangThai))
            {
                return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Cập nhật trạng thái thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult PauseJob()
        {
            JobScheduler.Pause();
            return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ResumeJob()
        {
            JobScheduler.Resume();
            return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ChangeTrigger(int minute)
        {
            ITrigger trigger = TriggerBuilder.Create()
               .WithIdentity("trigger1", "group1")

               .StartNow()
               .WithCronSchedule("0 0/" + minute + " * * * ?")

               .Build();
            JobScheduler.ReScheduleJob(trigger);
            return Json(new { success = true, msg = "Cập nhật trạng thái thành công" }, JsonRequestBehavior.AllowGet);
        }
    }
}