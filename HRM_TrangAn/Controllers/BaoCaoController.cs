using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using NPOI.POIFS.Crypt.Dsig;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static HRM_TrangAn.DataAccess.DAO.BaoCaoDAO;

namespace HRM_TrangAn.Controllers
{
    public class BaoCaoController : Controller
    {
        // GET: BaoCao
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult ThongKeBuoiHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoChiTietChamCong()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BangChotCong()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoTickeCuaToTrongThang()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoTickeCuaCacToTrongThang()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoLuongTickeTheoTo()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult BaoCaoLaoDongCuaToTrongThang()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoTickeNam()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoChuyenDoTheoTuyen()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoCongTheoDanhMucCongViec()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoLichTrinhTuyen()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult BaoCaoChuyenDoNhapTay()
        {
            return View();
        }

        //[AllowAnonymous]
        //public ActionResult BaoCaoForLaiDo()
        //{
        //    return View();
        //}

        [AllowAnonymous]
        public ActionResult BaoCaoForLaiDo(int? ID_LaiDo)
        {
            return View(ID_LaiDo);
        }

        [AllowAnonymous]
        public ActionResult BCLD(int? I)
        {
            return View("BaoCaoForLaiDo", I);
        }

        [AllowAnonymous]
        public ActionResult DG(int? I)
        {
            return Redirect("https://docs.google.com/forms/d/e/1FAIpQLSfAja_rqx6ayhCgue0TM5CtPohGh_9N9G3l8F61GRK6AJBBzQ/viewform?usp=pp_url&entry.1488161317=" + I.ToString());
        }

        [SessionExpire]
        public ActionResult GetData_BaoCaoChuyenDoNhapTay(DateTime from, DateTime to, int ID_ToNhom)
        {
            ChuyenDoDAO cdao = new ChuyenDoDAO();
            return Json(cdao.GetChuyenDoNhapTay(from, to, ID_ToNhom), JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public ActionResult GetData_BaoCaoForLaiDo(string MaNhanVien, DateTime from, DateTime to)
        {
            ChuyenDoDAO dao = new ChuyenDoDAO();
            ChamCongDAO cdao = new ChamCongDAO();
            NhanVienDAO nvdao = new NhanVienDAO();
            NhanVienModel nv = nvdao.GetByMa(MaNhanVien);
            int day = DateTime.Now.Day;
            DateTime fromd = DateTime.Now.AddDays((day - 1) * (-1));
            List<ChuyenDoModel> data1 = dao.GetChuyenDo_GetByNhanVien(fromd.Date, DateTime.Now, nv.ID);

            DataTable data2 = cdao.GetDataChotCongByNhanVien(fromd.Date, DateTime.Now, nv.ID);
            Dictionary<string, object> childRow = new Dictionary<string, object>();
            for (int i = 0; i < data2.Rows.Count; i++)
            {
                DataRow dr = data2.Rows[i];
                foreach (DataColumn col in data2.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
            }
            List<ChamCongModel> data3 = cdao.GetListChamCong_ByNgay_NhanVien(nv.ID, from, to);
            DanhGiaLaiDoDAO rdao = new DanhGiaLaiDoDAO();
            List<DanhGiaLaiDoModel> rating = rdao.GetAll(0, MaNhanVien, new DateTime(DateTime.Now.Year, 1, 1), DateTime.Now).Where(x => x.TrangThai == 1).ToList();
            List<DanhGiaLaiDoModel> ratingmonth = rdao.GetAll(0, MaNhanVien, new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1), DateTime.Now).Where(x => x.TrangThai == 1).ToList();
            childRow.Add("LuotDanhGia", rating.Count());
            return Json(new { nv = nv, data1 = data1, data2 = childRow, data3 = data3, data4 = rating, data5 = ratingmonth }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoLuongTickeTheoTo(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            //DataTable dt = new DataTable();
            //dt.Columns.Add("ID", typeof(Int32));
            //dt.Columns.Add("TenDayDu", typeof(string));
            //dt.Columns.Add("MaThuyen", typeof(string));
            //dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            //for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            //{
            //    dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
            //}
            DataTable ticket = tk_dao.GetDataLuongTickeTheoTo(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = ticket.Rows[i];


                //    float TongCong = 0;
                //    for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                //    {
                //        dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                //        TongCong += float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                //    }
                //    dr["ID"] = ticket.Rows[i]["ID"].ToString();
                //    dr["TenDayDu"] = ticket.Rows[i]["TenDayDu"].ToString();
                //    dr["MaThuyen"] = ticket.Rows[i]["MaThuyen"].ToString();
                //    dr["TongCongLDTrongThang"] = TongCong;
                //    dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in ticket.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet);
            //return Json(ticket, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ContentResult GetData_BaoCaoTickeCuaToTrongThang(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenDayDu", typeof(string));
            dt.Columns.Add("MaThuyen", typeof(string));
            dt.Columns.Add("MaNhanVien", typeof(string));
            dt.Columns.Add("TenToNhom", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            {
                dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
                dt.Columns.Add("data2" + date.ToString("yyyyMMdd"), typeof(float));
                dt.Columns.Add("data3" + date.ToString("yyyyMMdd"), typeof(float));
            }
            DataTable ticket = tk_dao.GetDataCongChuyenDo(TuNgay, DenNgay, ID_ToNhom);
            DataTable giamtru = tk_dao.GetDataCongGiamTru(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                {
                    dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    dr["data2" + date.ToString("yyyyMMdd")] = float.Parse(giamtru.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    dr["data3" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString()) - float.Parse(giamtru.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    TongCong += float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString()) + float.Parse(giamtru.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                dr["ID"] = ticket.Rows[i]["ID"].ToString();
                dr["TenDayDu"] = ticket.Rows[i]["TenDayDu"].ToString();
                dr["MaThuyen"] = ticket.Rows[i]["MaThuyen"].ToString();
                dr["MaNhanVien"] = ticket.Rows[i]["MaNhanVien"].ToString();
                dr["TenToNhom"] = ticket.Rows[i]["TenToNhom"].ToString();
                dr["TongCongLDTrongThang"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
            //return Json(parentRow, JsonRequestBehavior.AllowGet);
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ContentResult GetData_BaoCaoCongTheoDanhMucCongViec(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            //dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenDayDu", typeof(string));
            dt.Columns.Add("MaThuyen", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            DanhMucCongViecDAO dmcv = new DanhMucCongViecDAO();
            List<DanhMucCongViecModel> lst = new List<DanhMucCongViecModel>();
            lst = dmcv.GetAll();
            foreach (DanhMucCongViecModel item in lst)
            {
                dt.Columns.Add("data" + item.ID.ToString(), typeof(float));
            }
            DataTable ticket = tk_dao.GetDataCongChuyenDoTheoDanhMucCongViec(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                foreach (DanhMucCongViecModel item in lst)
                {
                    if (!string.IsNullOrWhiteSpace(ticket.Rows[i][item.ID.ToString()].ToString()) && ticket.Rows[i][item.ID.ToString()].ToString() != "NULL")
                    {
                        dr["data" + item.ID.ToString()] = float.Parse(ticket.Rows[i][item.ID.ToString()].ToString());
                        TongCong += float.Parse(ticket.Rows[i][item.ID.ToString()].ToString());
                    }
                    else
                    {
                        dr["data" + item.ID.ToString()] = 0;
                    }
                }
                //dr["ID"] = ticket.Rows[i]["ID"].ToString();
                dr["TenDayDu"] = ticket.Rows[i]["TenDayDu"].ToString();
                dr["MaThuyen"] = ticket.Rows[i]["MaThuyen"].ToString();
                dr["TongCongLDTrongThang"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            //return Json(parentRow, JsonRequestBehavior.AllowGet);
            return Content(JsonConvert.SerializeObject(parentRow));
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoTickeCuaTuyenTheoNgay(DateTime TuNgay, DateTime DenNgay)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenTuyen", typeof(string));
            dt.Columns.Add("TongCong", typeof(float));
            for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            {
                dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
            }
            DataTable ticket = tk_dao.GetDataCongChuyenDoTheoTuyen(TuNgay, DenNgay);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                {
                    dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    TongCong += float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                dr["ID"] = ticket.Rows[i]["ID"].ToString();
                dr["TenTuyen"] = ticket.Rows[i]["TenTuyen"].ToString();
                dr["TongCong"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet);
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoLaoDongCuaToTrongThang(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenDayDu", typeof(string));
            dt.Columns.Add("MaNhanVien", typeof(string));
            dt.Columns.Add("MaThuyen", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            {
                dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
            }
            DataTable ticket = tk_dao.GetDataCongLaoDong(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                {
                    dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    TongCong += float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                dr["ID"] = ticket.Rows[i]["ID"].ToString();
                dr["TenDayDu"] = ticket.Rows[i]["TenDayDu"].ToString();
                dr["MaThuyen"] = ticket.Rows[i]["MaThuyen"].ToString();
                dr["MaNhanVien"] = ticket.Rows[i]["MaNhanVien"].ToString();
                dr["TongCongLDTrongThang"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet); ;
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoTickeCuaCacToTrongThang(DateTime TuNgay, DateTime DenNgay)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("TenToNhom", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            {
                dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
            }
            DataTable ticket = tk_dao.GetDataCongChuyenDoTheoCacTo(TuNgay, DenNgay);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                {
                    dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    TongCong += float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                dr["TenToNhom"] = ticket.Rows[i]["TenToNhom"].ToString();
                dr["TongCongLDTrongThang"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet); ;
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoTickeCuaCacToTrongNam(int Nam)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("TenToNhom", typeof(string));
            dt.Columns.Add("MaToNhom", typeof(string));
            dt.Columns.Add("TongCong", typeof(float));
            for (int date = 1; date <= 12; date++)
            {
                dt.Columns.Add("data" + date, typeof(float));
            }
            DataTable ticket = tk_dao.GetDataTickeTheoNam(Nam);
            for (int i = 0; i < ticket.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();


                float TongCong = 0;
                for (int date = 1; date <= 12; date++)
                {
                    dr["data" + date] = float.Parse(ticket.Rows[i]["thang" + date].ToString());
                    TongCong += float.Parse(ticket.Rows[i]["thang" + date].ToString());
                }
                dr["TenToNhom"] = ticket.Rows[i]["TenToNhom"].ToString();
                dr["MaToNhom"] = ticket.Rows[i]["MaToNhom"].ToString();
                dr["TongCong"] = TongCong;
                dt.Rows.Add(dr);

                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet); ;
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ContentResult GetData_BaoCaoChiTietChamCong(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();            
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenDayDu", typeof(string));
            dt.Columns.Add("MaNhanVien", typeof(string));
            dt.Columns.Add("MaThuyen", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(float));
            dt.Columns.Add("Ticket", typeof(float));
            dt.Columns.Add("ChuyenTo", typeof(float));
            dt.Columns.Add("Plus", typeof(float));
            dt.Columns.Add("CongPhatSinh", typeof(float));
            dt.Columns.Add("NoCongTonDau", typeof(float));
            dt.Columns.Add("NoCong", typeof(float));
            for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
            {
                dt.Columns.Add("data" + date.ToString("yyyyMMdd"), typeof(float));
                dt.Columns.Add("data2" + date.ToString("yyyyMMdd"), typeof(float));
                dt.Columns.Add("data3" + date.ToString("yyyyMMdd"), typeof(float));
                dt.Columns.Add("data4" + date.ToString("yyyyMMdd"), typeof(float));
            }
            DataTable conglaodong = tk_dao.GetDataCong(TuNgay, DenNgay, ID_ToNhom);
            DataTable congtinhtien = tk_dao.GetDataCongTinhTien(TuNgay, DenNgay, ID_ToNhom);
            DataTable nghiphep = tk_dao.GetDataNghiPhep(TuNgay, DenNgay, ID_ToNhom);
            DataTable ticket = tk_dao.GetDataCongChuyenDo_TruGiamTru(TuNgay, DenNgay, ID_ToNhom);
            DataTable chotcong = tk_dao.GetDataChotCong(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < chotcong.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();
                dr["ID"] = chotcong.Rows[i]["ID"].ToString();
                dr["TenDayDu"] = chotcong.Rows[i]["TenDayDu"].ToString();
                dr["MaNhanVien"] = chotcong.Rows[i]["MaNhanVien"].ToString();
                dr["MaThuyen"] = chotcong.Rows[i]["MaThuyen"].ToString();
                dr["TongCongLDTrongThang"] = chotcong.Rows[i]["TongCongLDTrongThang"].ToString();
                dr["Ticket"] = float.Parse(chotcong.Rows[i]["Ticket"].ToString()) + float.Parse(chotcong.Rows[i]["Plus"].ToString());
                dr["ChuyenTo"] = chotcong.Rows[i]["ChuyenTo"].ToString();
                dr["Plus"] = chotcong.Rows[i]["Plus"].ToString();
                dr["NoCongTonDau"] = chotcong.Rows[i]["NoCongTonDau"].ToString();
                dr["CongPhatSinh"] = chotcong.Rows[i]["CongPhatSinh"].ToString();
                dr["NoCong"] = float.Parse(chotcong.Rows[i]["NoCongTonDau"].ToString()) + float.Parse(chotcong.Rows[i]["TongCongLDTrongThang"].ToString()) + float.Parse(chotcong.Rows[i]["ChuyenTo"].ToString()) +
                    float.Parse(chotcong.Rows[i]["CongPhatSinh"].ToString()) - float.Parse(chotcong.Rows[i]["Ticket"].ToString()) - float.Parse(chotcong.Rows[i]["Plus"].ToString());
                for (var date = TuNgay; date <= DenNgay; date = date.AddDays(1))
                {
                    dr["data" + date.ToString("yyyyMMdd")] = float.Parse(ticket.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    dr["data2" + date.ToString("yyyyMMdd")] = float.Parse(conglaodong.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    dr["data3" + date.ToString("yyyyMMdd")] = float.Parse(nghiphep.Rows[i][date.ToString("yyyyMMdd")].ToString());
                    dr["data4" + date.ToString("yyyyMMdd")] = float.Parse(congtinhtien.Rows[i][date.ToString("yyyyMMdd")].ToString());
                }
                dt.Rows.Add(dr);
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Content(JsonConvert.SerializeObject(parentRow));
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoChotCong(DateTime TuNgay, DateTime DenNgay, int ID_ToNhom)
        {
            ChamCongDAO tk_dao = new ChamCongDAO();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(Int32));
            dt.Columns.Add("TenDayDu", typeof(string));
            dt.Columns.Add("MaThuyen", typeof(string));
            dt.Columns.Add("MaNhanVien", typeof(string));
            dt.Columns.Add("TongCongLDTrongThang", typeof(string));
            dt.Columns.Add("Ticket", typeof(string));
            dt.Columns.Add("ChuyenTo", typeof(string));
            dt.Columns.Add("CongPhatSinh", typeof(string));
            dt.Columns.Add("NoCongTonDau", typeof(string));
            dt.Columns.Add("NoCong", typeof(float));
            DataTable chotcong = tk_dao.GetDataChotCong(TuNgay, DenNgay, ID_ToNhom);
            for (int i = 0; i < chotcong.Rows.Count; i++)
            {
                DataRow dr = dt.NewRow();
                dr["ID"] = chotcong.Rows[i]["ID"].ToString();
                dr["TenDayDu"] = chotcong.Rows[i]["TenDayDu"].ToString();
                dr["MaThuyen"] = chotcong.Rows[i]["MaThuyen"].ToString();
                dr["MaNhanVien"] = chotcong.Rows[i]["MaNhanVien"].ToString();
                dr["TongCongLDTrongThang"] = chotcong.Rows[i]["TongCongLDTrongThang"].ToString();
                dr["Ticket"] = float.Parse(chotcong.Rows[i]["Ticket"].ToString()) + float.Parse(chotcong.Rows[i]["Plus"].ToString());
                dr["ChuyenTo"] = chotcong.Rows[i]["ChuyenTo"].ToString();
                dr["NoCongTonDau"] = chotcong.Rows[i]["NoCongTonDau"].ToString();
                dr["CongPhatSinh"] = chotcong.Rows[i]["CongPhatSinh"].ToString();
                dr["NoCong"] = float.Parse(chotcong.Rows[i]["NoCongTonDau"].ToString()) + float.Parse(chotcong.Rows[i]["TongCongLDTrongThang"].ToString()) + float.Parse(chotcong.Rows[i]["ChuyenTo"].ToString()) +
                   float.Parse(chotcong.Rows[i]["CongPhatSinh"].ToString()) - float.Parse(chotcong.Rows[i]["Ticket"].ToString()) - float.Parse(chotcong.Rows[i]["Plus"].ToString());
                dt.Rows.Add(dr);
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet); ;
            //return Json(dt, JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        public ActionResult BaoCaoPhieuHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoSoBuoiHocTheoGiaoVien()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult BaoCaoDoanhThuBanPhieu()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoHocSinhNoPhieu()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BieuDoDiem()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BieuDoDiemTrungBinh_TheoLop()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult GetData_ThongKeBuoiHocTheoHocSinh(int ID_Lop, int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoDAO().ThongKeBuoiHocTheoHocSinh(ID_Lop, ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKePhieuHocTheoHocSinh(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoDAO().GetBaoCaoPhieuHocTheoHocSinh(ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKePhieuHocTheoHocSinhTheoThang(int ID_HocSinh, int Thang)
        {
            return Json(new BaoCaoDAO().GetBaoCaoPhieuHocTheoHocSinh_TheoThang(ID_HocSinh, Thang), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKeSoBuoiTheoHocSinhTheoThang(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoDAO().GetBaoCaoSoBuoiHoc_HocSinh_Thang(ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BaoCaoDoanhThu(int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBaoCaoDoanhThu(userinfor.ID_ChiNhanh, ID_NhanVien, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BaoCaoNoPhieu(int Thang, int Nam)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBaoCaoNoPhieu(userinfor.ID_ChiNhanh, Thang, Nam), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BieuDoDiem(DateTime from, DateTime to, int ID_HocSinh, int ID_Lop)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBieuDoDiem(ID_Lop, ID_HocSinh, from, to), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BieuDoDiemTrungBinh_TheoLop(DateTime from, DateTime to, int ID_Lop)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBieuDoDiemTrungBinh_TheoLop(ID_Lop, from, to), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_LichSuChotCong(int Thang, int Nam)
        {
            Dictionary<string, object> childRow;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = new BaoCaoDAO().GetLichSuChotCongByThang(Thang, Nam);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    childRow.Add(col.ColumnName, dr[col]);
                }
                parentRow.Add(childRow);
            }
            return Json(parentRow, JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        public ActionResult ChotCong(DateTime Ngay)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new ChamCongDAO().ChotCong(Ngay, userinfor.ID), JsonRequestBehavior.AllowGet);
        }

        public class BaoCaoSoBuoiHocTheoGiaoVienData
        {
            public int ID_Lop { get; set; }
            public int ID_GiaoVien { get; set; }
            public DateTime TuNgay { get; set; }
            public DateTime DenNgay { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoSoBuoiHocTheoGiaoVien(BaoCaoSoBuoiHocTheoGiaoVienData model)
        {
            return Json(new BaoCaoDAO().GetData_ThongKeBuoiHocTheoGiaoVien(model.ID_Lop, model.ID_GiaoVien, model.TuNgay, model.DenNgay), JsonRequestBehavior.AllowGet);
        }
        public class DataSoBuoiHocTheoGiaoVien
        {
            public int ID_Lop { get; set; }
            public string TenLop { get; set; }
            public int TongSoBuoi { get; set; }
            public int TongSiSo { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetDataGrid_BaoCaoSoBuoiHocTheoGiaoVien(BaoCaoSoBuoiHocTheoGiaoVienData model)
        {
            List<ThongKeBuoiHocTheoGiaoVienModel> data = new BaoCaoDAO().GetData_ThongKeBuoiHocTheoGiaoVien(model.ID_Lop, model.ID_GiaoVien, model.TuNgay, model.DenNgay);
            List<DataSoBuoiHocTheoGiaoVien> result = new List<DataSoBuoiHocTheoGiaoVien>();
            foreach (ThongKeBuoiHocTheoGiaoVienModel item in data)
            {
                if (result.Where(x => x.ID_Lop == item.ID_Lop).FirstOrDefault() == null)
                {
                    DataSoBuoiHocTheoGiaoVien d = new DataSoBuoiHocTheoGiaoVien();
                    d.TenLop = item.TenLop;
                    d.ID_Lop = item.ID_Lop;
                    d.TongSiSo = item.SiSo;
                    d.TongSoBuoi = 1;
                    result.Add(d);
                }
                else
                {
                    DataSoBuoiHocTheoGiaoVien d = result.Where(x => x.ID_Lop == item.ID_Lop).FirstOrDefault();
                    d.TongSoBuoi++;
                    d.TongSiSo += item.SiSo;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveFile_BieuDoDiem(string contentType, string bHRM_TrangAn64, string fileName)
        {
            byte[] fileContents = Convert.FromBase64String(bHRM_TrangAn64);
            string filePath = AppDomain.CurrentDomain.BaseDirectory + @"Images\BaiKiemTra" + @"\" + fileName;
            System.IO.File.WriteAllBytes(filePath, fileContents);
            return RedirectToAction("BieuDoDiem");
            //return Json(filePath, JsonRequestBehavior.AllowGet);
        }

    }
}