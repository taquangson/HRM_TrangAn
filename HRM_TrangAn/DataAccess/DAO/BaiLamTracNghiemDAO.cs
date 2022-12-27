using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Reflection;
using System.Web;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class BaiLamTracNghiemDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(BaiLamTracNghiemDAO));
        private DataHelper helper;
        public BaiLamTracNghiemDAO()
        {
            helper = new DataHelper();
        }

        private BaiLamTracNghiemModel GetBaiLamFromDataRow(DataRow dr)
        {
            BaiLamTracNghiemModel obj = new BaiLamTracNghiemModel();
            try
            {
                obj.ID = int.Parse(dr["ID"].ToString());
                obj.ID_HocSinh = int.Parse(dr["ID_HocSinh"].ToString());
                obj.TenHocSinh = dr["TenHocSinh"].ToString();
                obj.NgaySinh = (dr["NgaySinh"].ToString() != "") ? DateTime.Parse(dr["NgaySinh"].ToString()) : obj.NgaySinh;
                obj.ID_DeThi = dr["ID_DeThi"].ToString() != "" ? int.Parse(dr["ID_DeThi"].ToString()) : 0;
                obj.NgayGiao = (dr["NgayGiao"].ToString() != "") ? DateTime.Parse(dr["NgayGiao"].ToString()) : obj.NgayGiao;
                obj.HanNopBai = (dr["HanNopBai"].ToString() != "") ? DateTime.Parse(dr["HanNopBai"].ToString()) : obj.HanNopBai;
                obj.ThoiGianBatDau = (dr["ThoiGianBatDau"].ToString() != "") ? DateTime.Parse(dr["ThoiGianBatDau"].ToString()) : obj.ThoiGianBatDau;
                obj.ThoiGianKetThuc = (dr["ThoiGianKetThuc"].ToString() != "") ? DateTime.Parse(dr["ThoiGianKetThuc"].ToString()) : obj.ThoiGianKetThuc;
                obj.HanNiemPhong = (dr["HanNiemPhong"].ToString() != "") ? DateTime.Parse(dr["HanNiemPhong"].ToString()) : obj.HanNiemPhong;
                obj.TrangThai = dr["TrangThai"].ToString() != "" ? int.Parse(dr["TrangThai"].ToString()) : 0;
                obj.GioiHanLanLam = dr["GioiHanLanLam"].ToString() != "" ? int.Parse(dr["GioiHanLanLam"].ToString()) : 0;
                obj.Diem = dr["Diem"].ToString() != "" ? float.Parse(dr["Diem"].ToString()) : 0;
            }
            catch (Exception ex)
            {
                
            }
            return obj;
        }

        private BaiLamTracNghiem_ChiTietModel GetBaiLamChiTietFromDataRow(DataRow dr)
        {
            BaiLamTracNghiem_ChiTietModel obj = new BaiLamTracNghiem_ChiTietModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                try
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
                catch 
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        private LichSu_BaiLamTracNghiemModel GetLichSuBaiLamFromDataRow(DataRow dr)
        {
            LichSu_BaiLamTracNghiemModel obj = new LichSu_BaiLamTracNghiemModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                try
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
                catch 
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<BaiLamTracNghiemModel> GetBaiLamByHocSinh(int ID_HocSinh)
        {
            List<BaiLamTracNghiemModel> result = new List<BaiLamTracNghiemModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiLamTracNghiem_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                DeThiDAO dtdao = new DeThiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    BaiLamTracNghiemModel item = GetBaiLamFromDataRow(dr);
                    item.lstChitiet = GetBaiLamChiTiet(item.ID);
                    item.lstLichsu = GetLichSuBaiLamTracNghiem(item.ID);
                    item.dethi = dtdao.GetDeThiById(item.ID_DeThi);
                    result.Add(item);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiem_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public BaiLamTracNghiemModel GetBaiLamByID(long ID)
        {
            BaiLamTracNghiemModel result = new BaiLamTracNghiemModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiLamTracNghiem_GetByID", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    BaiLamTracNghiemModel item = GetBaiLamFromDataRow(dt.Rows[0]);
                    item.lstChitiet = GetBaiLamChiTiet(item.ID);
                    item.lstLichsu = GetLichSuBaiLamTracNghiem(item.ID);
                    result = item;

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiem_GetByID " + ex.Message);
            }

            return result;
        }

        public List<BaiLamTracNghiemModel> GetBaiLamByDeThi(int ID_DeThi)
        {
            List<BaiLamTracNghiemModel> result = new List<BaiLamTracNghiemModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeThi", ID_DeThi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiLamTracNghiem_GetByDeThi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BaiLamTracNghiemModel item = GetBaiLamFromDataRow(dr);
                    //item.lstChitiet = GetBaiLamChiTiet(item.ID);
                    item.lstLichsu = GetLichSuBaiLamTracNghiem(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiem_GetByDeThi " + ex.Message);
            }

            return result;
        }

        public List<BaiLamTracNghiem_ChiTietModel> GetBaiLamChiTiet(long ID_BaiLamTracNghiem)
        {
            List<BaiLamTracNghiem_ChiTietModel> result = new List<BaiLamTracNghiem_ChiTietModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaiLamTracNghiem", ID_BaiLamTracNghiem)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaiLamTracNghiemChiTiet_GetByID", pars);
                DataTable dt = ds.Tables[0];
                CauHoiDAO chdao = new CauHoiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    BaiLamTracNghiem_ChiTietModel item = GetBaiLamChiTietFromDataRow(dr);
                    item.cauhoi = chdao.GetCauHoi_GetByID(item.ID_CauHoi);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiemChiTiet_GetByID " + ex.Message);
            }

            return result;
        }

        public List<LichSu_BaiLamTracNghiemModel> GetLichSuBaiLamTracNghiem(long ID_BaiLamTracNghiem)
        {
            List<LichSu_BaiLamTracNghiemModel> result = new List<LichSu_BaiLamTracNghiemModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaiLamTracNghiem", ID_BaiLamTracNghiem)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuBaiLamTracNghiem_GetByID", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    LichSu_BaiLamTracNghiemModel item = GetLichSuBaiLamFromDataRow(dr);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuBaiLamTracNghiem_GetByID " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate_BaiLamTracNghiem(BaiLamTracNghiemModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_DeThi", model.ID_DeThi),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ThoiGianBatDau",  (model.ThoiGianBatDau == null) ? (object)DBNull.Value : model.ThoiGianBatDau),
                new SqlParameter("@ThoiGianKetThuc",(model.ThoiGianKetThuc == null) ? (object)DBNull.Value : model.ThoiGianKetThuc),
                new SqlParameter("@NgayGiao",model.NgayGiao),
                new SqlParameter("@HanNopBai",(model.HanNopBai == null) ? (object)DBNull.Value :  model.HanNopBai),
                new SqlParameter("@HanNiemPhong",(model.HanNiemPhong == null) ? (object)DBNull.Value :  model.HanNiemPhong),
                new SqlParameter("@GioiHanLanLam", model.GioiHanLanLam),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_BaiLamTracNghiem_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiem_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate_BaiLamTracNghiemChiTiet(BaiLamTracNghiem_ChiTietModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_BaiLamTracNghiem", model.ID_BaiLamTracNghiem),
                new SqlParameter("@ID_CauHoi", model.ID_CauHoi),
                new SqlParameter("@TraLoi", model.TraLoi),
                new SqlParameter("@TraLoiDung", model.TraLoiDung)
                };

                object id = helper.ExecuteScalar("sp_BaiLamTracNghiemChiTiet_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaiLamTracNghiemChiTiet_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate_LichSuBaiLamTracNghiem(LichSu_BaiLamTracNghiemModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ChiTiet", model.ChiTiet),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_BaiLamTracNghiem", model.ID_BaiLamTracNghiem),
                new SqlParameter("@ThoiGianBatDau", (model.ThoiGianBatDau == null) ? (object)DBNull.Value : model.ThoiGianBatDau),
                new SqlParameter("@ThoiGianKetThuc", (model.ThoiGianKetThuc == null) ? (object)DBNull.Value : model.ThoiGianKetThuc)
                };

                object id = helper.ExecuteScalar("sp_LichSuBaiLamTracNghiem_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuBaiLamTracNghiem_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete_BaiLamTracNghiemChiTiet(int ID_BaiLamTracNgihem)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaiLamTracNghiem",ID_BaiLamTracNgihem )
                };
                int rowaff = helper.ExecuteNonQuery("sp_BaiLamTracNghiemChiTiet_Delete", pars);
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
                log.Error("sp_BaiLamTracNghiemChiTiet_Delete " + ex.Message);
                return false;
            }
        }

        public bool Delete_BaiLamTracNghiem(int ID_BaiLamTracNgihem)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaiLamTracNgihem",ID_BaiLamTracNgihem )
                };
                int rowaff = helper.ExecuteNonQuery("sp_BaiLamTracNghiem_Delete", pars);
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
                log.Error("sp_BaiLamTracNghiem_Delete " + ex.Message);
                return false;
            }
        }
    }
}