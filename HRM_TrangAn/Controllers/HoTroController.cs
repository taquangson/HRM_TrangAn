using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Helper;
using HRM_TrangAn.Hubs;
using Newtonsoft.Json;
using NPOI.POIFS.Crypt.Dsig;
using Quartz.Impl.Triggers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;
namespace HRM_TrangAn.Controllers
{
	public class HoTroController : Controller
	{
		log4net.ILog log = log4net.LogManager.GetLogger(typeof(HoTroController));
		// GET: HoTro
		public ActionResult HoTroDuongDe()
		{
			return View();
		}

		public ActionResult HoTroDuongDev2()
		{
			return View();
		}


		public ActionResult GiaoVan()
		{
			return View();
		}

		public ActionResult HoTroDuongDev3()
		{
			return View();
		}

        public ActionResult InTheA5(int ID_ToNhom, string IDs)
        {
            NhanVienDAO hsdao = new NhanVienDAO();
            List<NhanVienModel> data = hsdao.GetAllNhanVienTrongToNhom(ID_ToNhom).Where(x => x.TrangThai == 1).ToList();
            if (!string.IsNullOrWhiteSpace(IDs))
            {
                List<string> lid = IDs.Split(',').ToList();
                data = data.Where(x => lid.IndexOf(x.ID.ToString()) >= 0).ToList();
            }
            return View(data);
        }

        public ActionResult InTheA4(int ID_ToNhom,string IDs)
        {
            NhanVienDAO hsdao = new NhanVienDAO();
            List<NhanVienModel> data = hsdao.GetAllNhanVienTrongToNhom(ID_ToNhom).Where(x => x.TrangThai == 1).ToList();
            if (!string.IsNullOrWhiteSpace(IDs))
            {
                List<string> lid = IDs.Split(',').ToList();
                data = data.Where(x => lid.IndexOf(x.ID.ToString()) >= 0).ToList();
            }
            return View(data);
        }

        public ActionResult InTheA3(int ID_ToNhom, string IDs)
        {
            NhanVienDAO hsdao = new NhanVienDAO();
            List<NhanVienModel> data = hsdao.GetAllNhanVienTrongToNhom(ID_ToNhom).Where(x => x.TrangThai == 1).ToList();
            if (!string.IsNullOrWhiteSpace(IDs))
            {
                List<string> lid = IDs.Split(',').ToList();
                data = data.Where(x => lid.IndexOf(x.ID.ToString()) >= 0).ToList();
            }
            return View(data);
        }

        public ActionResult RatingLaiDo(string MaNhanVien)
		{
			NhanVienDAO hsdao = new NhanVienDAO();
			RatingLaiDoDAO rdao = new RatingLaiDoDAO();
			NhanVienModel data = hsdao.GetByMa(MaNhanVien);
			data.rating = rdao.RatingLaiDo_GetByLaiDo(data.ID);
			return View(data);
		}

		public ActionResult GuiDanhGia(RatingLaiDoModel model)
		{
			RatingLaiDoDAO rdao = new RatingLaiDoDAO();
			if (rdao.Insert(model) > 0)
			{
				return Json(new { success = true }, JsonRequestBehavior.AllowGet);
			}
			else
			{
				return Json(new { success = false }, JsonRequestBehavior.AllowGet);
			}
		}
		public class DanhGiaViewModel
		{
			public string MaLaiDo { get; set; }
		}
		public ActionResult FormDanhGiaLaiDo(string MaLaiDo)
		{
			DanhGiaViewModel m = new DanhGiaViewModel();
			m.MaLaiDo= MaLaiDo;
			return View(m);
		}

		public ActionResult DanhGiaThanhCong()
		{
			return View();
		}


		[HttpPost]
		public ActionResult SyncResponseGoogleFormForDiem(GoogleFormResult model)
		{
			log.Info(JsonConvert.SerializeObject(model));
			DanhGiaDiemDAO d = new DanhGiaDiemDAO();
			foreach (GoogleFormResultObject i in model.items)
			{
				DanhGiaDiemModel item = new DanhGiaDiemModel();
				item.STT = i.STT;
				item.CauHoi = i.Title;
				item.MaCauHoi = StringHelper.RemoveVietNameseSign(item.CauHoi).Replace(" ", "_");
				item.TraLoi = i.Value;
				d.InsertOrUpdate(item);
			}
			return Json(new { success = true }, JsonRequestBehavior.AllowGet);
		}		


		[HttpPost]
		public ActionResult SyncResponseGoogleForm(GoogleFormResult model)
		{
			log.Info(JsonConvert.SerializeObject(model));
			DanhGiaLaiDoDAO d = new DanhGiaLaiDoDAO();
			int STT = d.GetLastStt() +1;

            foreach (GoogleFormResultObject i in model.items)
			{
				DanhGiaLaiDoModel item = new DanhGiaLaiDoModel();
				item.STT = STT.ToString();
                item.CauHoi = i.Title;
				item.MaCauHoi = StringHelper.RemoveVietNameseSign(item.CauHoi).Replace(" ", "_");
				item.TraLoi = i.Value;
				d.InsertOrUpdate(item);
			}
			return Json(new { success = true }, JsonRequestBehavior.AllowGet);
		}

		public class GoogleFormResult
		{
			public List<GoogleFormResultObject> items { get; set; }
		}

		public class GoogleFormResultObject
		{
			public string STT { get; set; }
			public string Title { get; set; }
			public string Value { get; set; }
		}

		public ActionResult QRCodeScanResult(int ID_HocSinh)
		{
			CheckInSuKienDAO cdao = new CheckInSuKienDAO();
			List<CheckInSuKienModel> rs = cdao.GetByHocSinh(ID_HocSinh, DateTime.Now);
			ViewBag.Student = new HocSinhDAO().GetById(ID_HocSinh);
			ViewBag.CheckInLanDau = rs.FirstOrDefault();
			CheckInSuKienModel newitem = new CheckInSuKienModel();
			DiemDanhDAO ddao = new DiemDanhDAO();
			DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(479, ID_HocSinh, DateTime.Now, 3);
			if (diemdanhcu.ID == 0)
			{
				DiemDanhModel dmodel = new DiemDanhModel();
				dmodel.ID = 0;
				dmodel.ID_Lop = 479;
				dmodel.ID_HocSinh = ID_HocSinh;
				dmodel.ThoiGianVaoLop = DateTime.Now;
				dmodel.Ca = 3;
				dmodel.ID_NhanVien = 1;
				dmodel.HocDuoi = 0;
				dmodel.CoPhep = 0;
				dmodel.GhiChu = "";
				ddao.InsertOrUpdate(dmodel);
			}
			newitem.ID_HocSinh = ID_HocSinh;
			newitem.ThoiGianCheckIn = DateTime.Now;
			newitem.NgayToChucSuKien = DateTime.Now;
			cdao.Insert(newitem);
			return View();
		}

		[HttpPost]
		public ActionResult UploadExcelData(HttpPostedFileBase file, string filter)
		{
			try
			{
				List<SortByMarketcapModel> result = new List<SortByMarketcapModel>();
				List<SortByMarketcapModel> sortresult = new List<SortByMarketcapModel>();
				if (file != null && file.ContentLength > 0)
				{
					var fileName = Path.GetFileName(file.FileName);
					string Path_Year = DateTime.Now.Year.ToString();
					string Path_Month = DateTime.Now.Month.ToString();
					string Path_Day = DateTime.Now.Day.ToString();
					string p = "/Images/" + "HoTro/";
					var path = Path.Combine(Server.MapPath(p), Path_Year + "-" + Path_Month + "-" + Path_Day + "-" + fileName);
					file.SaveAs(path);
					Excel.Application xlApp = new Excel.Application();
					Excel.Workbook xlWorkbook = xlApp.Workbooks.Open(path);
					Excel._Worksheet xlWorksheet = xlWorkbook.Sheets[1];
					Excel.Range xlRange = xlWorksheet.UsedRange;

					int rowCount = xlRange.Rows.Count;
					int colCount = xlRange.Columns.Count;
					for (int i = 1; i <= rowCount; i++)
					{
						try
						{
							SortByMarketcapModel item = new SortByMarketcapModel();
							item.Ticket = xlRange.Cells[i, 2].Value2.ToString();
							item.Market_cap = long.Parse(xlRange.Cells[i, 3].Value2.ToString());
							item.Total_assets = long.Parse(xlRange.Cells[i, 4].Value2.ToString());
							item.Total_liabilities = long.Parse(xlRange.Cells[i, 5].Value2.ToString());
							item.Debt_to_assets = float.Parse(xlRange.Cells[i, 6].Value2.ToString());
							result.Add(item);
						}
						catch (Exception ex)
						{

						}
					}
					result = result.OrderBy(i => i.Market_cap).ToList();
					int firtIndex = 0;
					int lastIndex = 0;
					try
					{
						if (filter.Length == 1)
						{
							switch (int.Parse(filter))
							{
								case 0:
									sortresult = result;
									break;
								case 1:
									firtIndex = int.Parse(Math.Round((double)result.Count * 0 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 1 / 5).ToString());
									sortresult = result.Skip(firtIndex).Take(lastIndex - firtIndex).ToList();
									break;
								case 2:
									firtIndex = int.Parse(Math.Round((double)result.Count * 1 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 2 / 5).ToString());
									sortresult = result.Skip(firtIndex).Take(lastIndex - firtIndex).ToList();
									break;
								case 3:
									firtIndex = int.Parse(Math.Round((double)result.Count * 2 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 3 / 5).ToString());
									sortresult = result.Skip(firtIndex).Take(lastIndex - firtIndex).ToList();
									break;
								case 4:
									firtIndex = int.Parse(Math.Round((double)result.Count * 3 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 4 / 5).ToString());
									sortresult = result.Skip(firtIndex).Take(lastIndex - firtIndex).ToList();
									break;
								case 5:
									firtIndex = int.Parse(Math.Round((double)result.Count * 4 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 5 / 5).ToString());
									sortresult = result.Skip(firtIndex).Take(lastIndex - firtIndex).ToList();
									break;
							}
						}
						else if (filter.Length == 2)
						{
							List<SortByMarketcapModel> parents = new List<SortByMarketcapModel>();
							switch ((int)int.Parse(filter) / 10)
							{
								case 1:
									firtIndex = int.Parse(Math.Round((double)result.Count * 0 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 1 / 5).ToString());
									parents = result.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Market_cap).ToList();
									break;
								case 2:
									firtIndex = int.Parse(Math.Round((double)result.Count * 1 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 2 / 5).ToString());
									parents = result.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Market_cap).ToList();
									break;
								case 3:
									firtIndex = int.Parse(Math.Round((double)result.Count * 2 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 3 / 5).ToString());
									parents = result.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Market_cap).ToList();
									break;
								case 4:
									firtIndex = int.Parse(Math.Round((double)result.Count * 3 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 4 / 5).ToString());
									parents = result.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Market_cap).ToList();
									break;
								case 5:
									firtIndex = int.Parse(Math.Round((double)result.Count * 4 / 5).ToString());
									lastIndex = int.Parse(Math.Round((double)result.Count * 5 / 5).ToString());
									parents = result.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Market_cap).ToList();
									break;
							}

							switch ((int)int.Parse(filter) % 10)
							{
								case 1:
									firtIndex = int.Parse(Math.Round((double)parents.Count * 0 / 3).ToString());
									lastIndex = int.Parse(Math.Round((double)parents.Count * 1 / 3).ToString());
									sortresult = parents.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Debt_to_assets).ToList();
									break;
								case 2:
									firtIndex = int.Parse(Math.Round((double)parents.Count * 1 / 3).ToString());
									lastIndex = int.Parse(Math.Round((double)parents.Count * 2 / 3).ToString());
									sortresult = parents.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Debt_to_assets).ToList();
									break;
								case 3:
									firtIndex = int.Parse(Math.Round((double)parents.Count * 2 / 3).ToString());
									lastIndex = int.Parse(Math.Round((double)parents.Count * 3 / 3).ToString());
									sortresult = parents.Skip(firtIndex).Take(lastIndex - firtIndex).OrderBy(z => z.Debt_to_assets).ToList();
									break;
							}
							firtIndex = int.Parse(Math.Round((double)sortresult.Count * 0 / 3).ToString());
							lastIndex = int.Parse(Math.Round((double)sortresult.Count * 1 / 3).ToString());
							for (var j = firtIndex; j < lastIndex; j++)
							{
								sortresult[j].Rank = "LOW";
							}
							firtIndex = int.Parse(Math.Round((double)sortresult.Count * 1 / 3).ToString());
							lastIndex = int.Parse(Math.Round((double)sortresult.Count * 2 / 3).ToString());
							for (var k = firtIndex; k < lastIndex; k++)
							{
								sortresult[k].Rank = "MID";
							}
							firtIndex = int.Parse(Math.Round((double)sortresult.Count * 2 / 3).ToString());
							lastIndex = int.Parse(Math.Round((double)sortresult.Count * 3 / 3).ToString());
							for (var h = firtIndex; h < lastIndex; h++)
							{
								sortresult[h].Rank = "HIGH";
							}

						}
					}
					catch
					{

					}
					finally
					{


						GC.Collect();
						GC.WaitForPendingFinalizers();
						Marshal.ReleaseComObject(xlRange);
						Marshal.ReleaseComObject(xlWorksheet);

						//close and releHRM_TrangAn
						xlWorkbook.Close();
						Marshal.ReleaseComObject(xlWorkbook);

						//quit and releHRM_TrangAn
						xlApp.Quit();
						Marshal.ReleaseComObject(xlApp);
						if (System.IO.File.Exists(path))
						{
							try
							{
								System.IO.File.Delete(path);
							}
							catch
							{

							}
						}
					}
				}
				return Json(new { status = true, msg = "Xử lý dữ liệu thành công", data = sortresult }, JsonRequestBehavior.AllowGet);
			}
			catch (Exception ex)
			{
				return Json(new { status = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
			}
		}
	}
}