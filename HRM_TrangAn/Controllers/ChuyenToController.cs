using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.Controllers
{
    public class ChuyenToController : Controller
    {
        // GET: ChuyenTo
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllChuyenTo()
        {
            ChuyenToDAO dao = new ChuyenToDAO();
            List<ChuyenToModel> data = dao.GetAll();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_ChuyenToLaoDong(int ID_LaoDong, DateTime Ngay, float SoCong)
        {
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            ;
            if (clddao.InsertOrUpdate(ID_LaoDong, 3, SoCong, 0, Ngay) > 0)
            {

                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult InsertOrUpdate_GiamTru(int ID_LaoDong, DateTime Ngay, float SoCong)
        {
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            ;
            if (clddao.InsertOrUpdate(ID_LaoDong, 4, SoCong, 0, Ngay) > 0)
            {

                return Json(new { success = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị viên" }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult InsertOrUpdate_ChuyenTo(ChuyenToModel item)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ChuyenToDAO dao = new ChuyenToDAO();
            NhanVien_ChuyenToDAO nvdao = new NhanVien_ChuyenToDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            int IDnew = 0;
            int countXoaErr = 0;
            int countThemErr = 0;

            if (item.ID == 0)
            {
                IDnew = dao.InsertOrUpdate(item);
                item.NgayTao = DateTime.Now;
                foreach (NhanVien_ChuyenToModel x in item.lstNhanVienChuyenTo)
                {
                    nvdao.Insert(x.ID_NhanVien, IDnew);
                    clddao.InsertOrUpdate(x.ID_NhanVien, 3, item.Cong, IDnew, item.NgayTao);
                }
            }
            else
            {
                IDnew = dao.InsertOrUpdate(item);
                List<NhanVien_ChuyenToModel> cur_lst = nvdao.GetAllByChuyenTo(item.ID);
                if (item.lstNhanVienChuyenTo == null)
                {
                    item.lstNhanVienChuyenTo = new List<NhanVien_ChuyenToModel>();
                }
                List<int> cur_lstID = cur_lst.Select(c => c.ID_NhanVien).ToList();
                List<int> update_lstID = item.lstNhanVienChuyenTo.Select(c => c.ID_NhanVien).ToList();
                List<int> delete_lstID = cur_lstID.Except<int>(update_lstID).ToList(); // Danh sách nhân viên bị xóa
                List<int> insert_lstID = update_lstID.Except<int>(cur_lstID).ToList(); // Danh sách nhân viên được thêm
                foreach(int idnv in delete_lstID)
                {
                    foreach (NhanVien_ChuyenToModel del in cur_lst) // Xóa các item cũ
                    {
                        if (del.ID_NhanVien == idnv)
                        {
                            if (nvdao.Delete(del.ID))
                            {
                                clddao.Delete(idnv, 3, IDnew);
                            }
                            else
                            {
                                countXoaErr++;
                            }
                        }
                        

                    }
                }
                foreach (int idnv in insert_lstID)
                {
                    if (nvdao.Insert(idnv, IDnew) > 0)
                    {
                        clddao.InsertOrUpdate(idnv, 3, item.Cong, IDnew, item.NgayTao);
                    }
                    else
                    {
                        countThemErr++;
                    }
                }
                foreach (NhanVien_ChuyenToModel x in item.lstNhanVienChuyenTo)
                {
                    clddao.InsertOrUpdate(x.ID_NhanVien, 7, item.Cong, IDnew, item.NgayTao);
                }
                //List<NhanVien_ChuyenToModel> lstUpdate = item.lstNhanVienChuyenTo.Where(x => x.TrangThai == 0).ToList();
                //List<NhanVien_ChuyenToModel> delete_lst = cur_lst.Except<NhanVien_ChuyenToModel>(item.lstNhanVienChuyenTo).ToList(); // Danh sách nhân viên bị xóa
                //List<NhanVien_ChuyenToModel> insert_lst = item.lstNhanVienChuyenTo.Except<NhanVien_ChuyenToModel>(cur_lst).ToList(); // Danh sách nhân viên được thêm
                //if (delete_lst != null)
                //{
                //    foreach (NhanVien_ChuyenToModel del in delete_lst) // Xóa các item cũ
                //    {
                //        if (nvdao.Delete(del.ID))
                //        {

                //        }
                //        else
                //        {
                //            countXoaErr++;
                //        }

                //    }
                //}
                //if (insert_lst != null)
                //{
                //    foreach (NhanVien_ChuyenToModel ins in insert_lst) // Thêm các item mới
                //    {
                //        if (nvdao.Insert(ins, IDnew) > 0)
                //        {

                //        }
                //        else
                //        {
                //            countThemErr++;
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
        public ActionResult DeleteMulti_ChuyenTo(string ID)
        {
            ChuyenToDAO dm_dao = new ChuyenToDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            NhanVien_ChuyenToDAO nvdao = new NhanVien_ChuyenToDAO();
            if (dm_dao.DeleteMulti(ID))
            {
                if (nvdao.DeleteMultiByIDChuyenTo(ID))
                {
                    clddao.DeleteMultiByIDChuyenTo(ID);
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