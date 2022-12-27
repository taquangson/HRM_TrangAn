using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;

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
                        clddao.InsertOrUpdate(up.ID_NhanVien, 2, up.Cong == 0 ? item.Cong : up.Cong, IDnew, item.NgayLamViec);
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
    }
}