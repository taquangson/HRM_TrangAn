using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web;
namespace HRM_TrangAn.Schedule
{
    public class ProcessAutoTinhChuyen
    {

        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ProcessAutoTinhChuyen));

        public async Task<bool> AutoTinhChuyen()
        {
            ChamCongDAO cc_dao = new ChamCongDAO();
            TuyenDoDAO dao = new TuyenDoDAO();
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            var now = DateTime.Now;
            List<ChamCongModel> result1 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(new DateTime(now.Year, now.Month, now.Day, 0, 0, 0), DateTime.Now, 2007).ToList();
            List<ChamCongModel> result2 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(new DateTime(now.Year, now.Month, now.Day, 0, 0, 0), DateTime.Now, 2008).ToList();
            List<ChamCongModel> result3 = cc_dao.GetListChamCongBenLen_ByNgayByDiem(new DateTime(now.Year, now.Month, now.Day, 0, 0, 0), DateTime.Now, 2009).ToList();
            List<ChamCongModel> result = new List<ChamCongModel>();
            result.AddRange(result1);
            result.AddRange(result2);
            result.AddRange(result3);
            //foreach (ChamCongModel i in result)
            //{
            //    List<TuyenDoModel> lstTuyen = dao.GetAll().ToList();
            //    if (lstTuyen != null)
            //    {
            //        foreach (TuyenDoModel tuyen in lstTuyen)
            //        {
            //            List<ChamCongModel> lstChamCong = cc_dao.GetListChamCong_PhuHopTuyen(i.WorkDate, tuyen.ThoiGianToiThieu, tuyen.ThoiGianToiDa, i.ID_TaiKhoan);
            //            List<ChamCongModel> lstMatch = new List<ChamCongModel>();
            //            if (lstChamCong.Count >= 3)
            //            {
            //                int count = 1;
            //                lstMatch.Add(i);
            //                foreach (TuyenDo_DiemModel td in tuyen.lstDiemTuyen)
            //                {

            //                    if (lstChamCong.Count(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006) > 0)
            //                    {
            //                        //isMatch = false;
            //                        if (td.ID_DiemQuetThe == 2005)
            //                        {
            //                            count++;
            //                            lstMatch.AddRange(lstChamCong.Where(x => x.ID_DiemQuetThe == 2005));
            //                        }
            //                        else
            //                        {
            //                            count++;
            //                            lstMatch.Add(lstChamCong.Where(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006).First());
            //                        }
            //                    }
            //                }
            //                if (count >= 3)
            //                {
            //                    ChuyenDoModel model = new ChuyenDoModel();
            //                    model.MaThuyen = i.MaThuyen;
            //                    model.ID_NhanVien = i.ID_TaiKhoan;
            //                    model.ID_TuyenDo = tuyen.ID;
            //                    model.NgayDi = i.WorkDate;
            //                    model.GhiChu = "Tinh chuyen tu dong 23h";
            //                    model.IsManager = 0;
            //                    model.TrangThai = 1;
            //                    int ID_New = dm_dao.InsertOrUpdate(model);
            //                    if (ID_New > 0)
            //                    {
            //                        //clddao.InsertOrUpdate(model.ID_NhanVien, 1, 1, ID_New, model.NgayDi);
            //                        foreach (ChamCongModel matchItem in lstMatch)
            //                        {
            //                            matchItem.ID_ChuyenDo = ID_New;
            //                            cc_dao.Update(matchItem);
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}

            foreach (ChamCongModel i in result)
            {
                //Tính chuyến đò chính
                if (i.ID_DiemQuetThe == 2007 || i.ID_DiemQuetThe == 2008 || i.ID_DiemQuetThe == 2009)
                {
                    if (cc_dao.CountExistCheckpoint(i.ID_TaiKhoan, i.ID_DiemQuetThe, i.WorkDate) == 0)
                    {
                        ChuyenDoModel model = new ChuyenDoModel();
                        model.MaThuyen = i.MaThuyen;
                        model.ID_NhanVien = i.ID_TaiKhoan;
                        model.NgayDi = i.WorkDate;
                        model.GhiChu = "";
                        model.IsManager = 0;
                        model.TrangThai = 1;
                        switch (i.ID_DiemQuetThe)
                        {
                            case 2007:
                                model.ID_TuyenDo = 2005;
                                break;
                            case 2008:
                                model.ID_TuyenDo = 1;
                                break;
                            case 2009:
                                model.ID_TuyenDo = 2004;
                                break;
                        }
                        int ID_New = dm_dao.InsertOrUpdate(model);
                        if (ID_New > 0)
                        {
                            i.ID_ChuyenDo = ID_New;
                            cc_dao.Update(i);
                        }
                    }
                }
            }

            //dm_dao.AutoTinhCongTheoChuyenDo();
            return true;
        }
    }
}

