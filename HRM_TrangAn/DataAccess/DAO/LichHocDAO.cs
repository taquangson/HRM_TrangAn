using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;


namespace HRM_TrangAn.DataAccess.DAO
{
    public class LichHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LichHocDAO));
        private DataHelper helper;
        public LichHocDAO()
        {
            helper = new DataHelper();
        }

        private LichHocModel GetObjFromDataRow(DataRow dr)
        {
            LichHocModel obj = new LichHocModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<LichHocModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetAll");
                DataTable dt = ds.Tables[0];
                List<LichHocModel> result = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetByLop(int ID_Lop)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetByLop", pars);
                DataTable dt = ds.Tables[0];
                List<LichHocModel> result = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    result.Add(l);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetAllTuanByCa(string GioBatDau, string GioKetThuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@GioBatDau", GioBatDau),
                new SqlParameter("@GioKetThuc", GioKetThuc)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetLichTuan", pars);
                DataTable dt = ds.Tables[0];
                List<LichHocModel> result = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    result.Add(l);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetAllTuanByCaByLop(string ID_Lop, string GioBatDau, string GioKetThuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@GioBatDau", GioBatDau),
                new SqlParameter("@GioKetThuc", GioKetThuc),
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetLichTuanByLop", pars);
                DataTable dt = ds.Tables[0];
                List<LichHocModel> result = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    result.Add(l);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetLichAppByLop(int ID_Lop, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@TuNgay", TuNgay),
                //new SqlParameter("@DenNgay", DenNgay),
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetByLop", pars);
                DataTable dt = ds.Tables[0];
                GiaoAnDAO gadao = new GiaoAnDAO();
                List<LichHocModel> result = new List<LichHocModel>();
                List<LichHocModel> lstLich = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    lstLich.Add(l);
                }
                List<DateTime> lstNgay = new List<DateTime>();
                for (DateTime d = TuNgay; d <= DenNgay; d = d.AddDays(1))
                {
                    lstNgay.Add(d);
                    int dow = (int)d.DayOfWeek;
                    if (lstLich.Where(x => x.Thu == dow + 1).FirstOrDefault() != null)
                    {
                        LichHocModel item = lstLich.Where(x => x.Thu == dow + 1).FirstOrDefault();
                        item.NgayHocDuKien = d;
                        item.GiaoAn = gadao.GetByLichHoc(item.ID_Lop, item.Ca, d);
                        result.Add(item);
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetLichAppByGiaoVien(int ID_GiaoVien, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@TuNgay", TuNgay),
                //new SqlParameter("@DenNgay", DenNgay),
                new SqlParameter("@ID_GiaoVien", ID_GiaoVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetByGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                GiaoAnDAO gadao = new GiaoAnDAO();
                List<LichHocModel> result = new List<LichHocModel>();
                List<LichHocModel> lstLich = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    lstLich.Add(l);
                }
                List<DateTime> lstNgay = new List<DateTime>();
                for (DateTime d = TuNgay; d <= DenNgay; d = d.AddDays(1))
                {
                    lstNgay.Add(d);
                    int dow = (int)d.DayOfWeek;
                    foreach(LichHocModel ngay in lstLich) {
                        if(ngay.Thu == dow + 1)
                        {
                            ngay.NgayHocDuKien = d;
                            ngay.GiaoAn = gadao.GetByLichHoc(ngay.ID_Lop, ngay.Ca, d);
                            result.Add(ngay);
                        }
                    }
                    //if (lstLich.Where(x => x.Thu == dow - 1).FirstOrDefault() != null)
                    //{
                    //    LichHocModel item = lstLich.Where(x => x.Thu == dow - 1).FirstOrDefault();
                    //    item.NgayHocDuKien = d;
                    //    item.GiaoAn = gadao.GetByLichHoc(item.ID_Lop, item.Ca, d);
                    //    result.Add(item);
                    //}
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<LichHocModel> GetLichByHocSinh(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@TuNgay", TuNgay),
                //new SqlParameter("@DenNgay", DenNgay),
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                GiaoAnDAO gadao = new GiaoAnDAO();
                List<LichHocModel> result = new List<LichHocModel>();
                List<LichHocModel> lstLich = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichHocModel l = GetObjFromDataRow(dr);
                    switch (l.Thu)
                    {
                        case 1:
                            l.TenBuoi = "Chủ nhật";
                            break;
                        case 2:
                            l.TenBuoi = "Thứ 2";
                            break;
                        case 3:
                            l.TenBuoi = "Thứ 3";
                            break;
                        case 4:
                            l.TenBuoi = "Thứ 4";
                            break;
                        case 5:
                            l.TenBuoi = "Thứ 5";
                            break;
                        case 6:
                            l.TenBuoi = "Thứ 6";
                            break;
                        case 7:
                            l.TenBuoi = "Thứ 7";
                            break;

                    }
                    lstLich.Add(l);
                }
                List<DateTime> lstNgay = new List<DateTime>();
                for (DateTime d = TuNgay; d <= DenNgay; d = d.AddDays(1))
                {
                    lstNgay.Add(d);
                    int dow = (int)d.DayOfWeek;
                    foreach (LichHocModel ngay in lstLich)
                    {
                        if (ngay.Thu == dow + 1)
                        {
                            ngay.NgayHocDuKien = d;
                            LichHocModel item = new LichHocModel();
                            item.NgayHocDuKien = d;
                            item.Ca = ngay.Ca;
                            item.GhiChu = ngay.GhiChu;
                            item.GiaoAn = gadao.GetByLichHoc(ngay.ID_Lop, ngay.Ca, d);
                            item.ID = ngay.ID;
                            item.ID_ChiNhanh = ngay.ID_ChiNhanh;
                            item.ID_Lop = ngay.ID_Lop;
                            item.NgayTao = ngay.NgayTao;
                            item.TenBuoi = ngay.TenBuoi;
                            item.TenCa = ngay.TenCa;
                            item.TenLop = ngay.TenLop;
                            item.Thu = ngay.Thu;
                            item.TenGiaoVien = ngay.TenGiaoVien;
                            result.Add(item);
                        }
                    }
                    //if (lstLich.Where(x => x.Thu == dow - 1).FirstOrDefault() != null)
                    //{
                    //    LichHocModel item = lstLich.Where(x => x.Thu == dow - 1).FirstOrDefault();
                    //    item.NgayHocDuKien = d;
                    //    item.GiaoAn = gadao.GetByLichHoc(item.ID_Lop, item.Ca, d);
                    //    result.Add(item);
                    //}
                }

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public LichHocModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichHoc_GetByID", pars);
                DataTable dt = ds.Tables[0];
                List<LichHocModel> result = new List<LichHocModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(LichHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@Thu", model.Thu),
                new SqlParameter("@Ca", model.Ca),
                new SqlParameter("@GhiChu", model.GhiChu)
                };

                object id = helper.ExecuteScalar("sp_LichHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichHoc_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_LichHoc_Delete", pars);
                if (rowaff > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichHoc_Delete " + ex.Message);
                return false;
            }
        }
    }
}