using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using DataTable = System.Data.DataTable;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class ThuongDanhGiaDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ThuongDanhGiaDAO));
        private DataHelper helper;
        public ThuongDanhGiaDAO()
        {
            helper = new DataHelper();
        }

        private CauHinhThuongDanhGiaModel GetCauHinhObjFromDataRow(DataRow dr)
        {
            CauHinhThuongDanhGiaModel obj = new CauHinhThuongDanhGiaModel();
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

        private LichSuThuongDanhGiaModel GetLichSuObjFromDataRow(DataRow dr)
        {
            LichSuThuongDanhGiaModel obj = new LichSuThuongDanhGiaModel();
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

        public List<CauHinhThuongDanhGiaModel> CauHinhThuong_GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_CauHinhThuong_GetAll");
                DataTable dt = ds.Tables[0];
                List<CauHinhThuongDanhGiaModel> result = new List<CauHinhThuongDanhGiaModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    CauHinhThuongDanhGiaModel model = GetCauHinhObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHinhThuongRating_GetAll " + ex.Message);
                return null;
            }
        }

        public List<LichSuThuongDanhGiaModel> LichSuThuong_GetAll(int ID_ToNhom, int Thang, int Quy, int Nam, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ToNhom", ID_ToNhom),
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Quy", Quy),
                new SqlParameter("@Nam", Nam),
                new SqlParameter("@TuNgay", TuNgay),
                new SqlParameter("@DenNgay", DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThuongDanhGia_GetAll", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuThuongDanhGiaModel> result = new List<LichSuThuongDanhGiaModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichSuThuongDanhGiaModel model = GetLichSuObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThuongDanhGia_GetAll " + ex.Message);
                return null;
            }
        }

        public List<LichSuThuongDanhGiaModel> LichSuThuong_GetAllByConfig(int ID_ToNhom, int Thang, int Quy, int Nam, DateTime TuNgay, DateTime DenNgay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ToNhom", ID_ToNhom),
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Quy", Quy),
                new SqlParameter("@Nam", Nam),
                new SqlParameter("@TuNgay", TuNgay),
                new SqlParameter("@DenNgay", DenNgay)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuThuongDanhGia_GetAllByConfig", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuThuongDanhGiaModel> result = new List<LichSuThuongDanhGiaModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    LichSuThuongDanhGiaModel model = GetLichSuObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuThuongDanhGia_GetAllByConfig " + ex.Message);
                return null;
            }
        }

        public bool LichSuThuong_InsertOrUpdate(LichSuThuongDanhGiaModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@DenSo", model.DenSo),
                new SqlParameter("@TuSo", model.TuSo),
                new SqlParameter("@ThuongTien", model.ThuongTien),
                new SqlParameter("@ThuongCong", model.ThuongCong),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@Quy", model.Quy),
                new SqlParameter("@Nam", model.Nam),
                new SqlParameter("@ID_CauHinhThuong", model.ID_CauHinhThuong),
                new SqlParameter("@DiemDanhGia", model.DiemDanhGia),
                new SqlParameter("@LuotDanhGia", model.LuotDanhGia),
                new SqlParameter("@STT", model.STT),
                new SqlParameter("@TuNgay", model.TuNgay),
                new SqlParameter("@DenNgay", model.DenNgay)
                };

                int rowaff = helper.ExecuteNonQuery("sp_LichSuThuong_InsertOrUpdate", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHinhThuong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }



        public bool CauHinhThuong_InsertOrUpdate(CauHinhThuongDanhGiaModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@DenSo", model.DenSo),
                new SqlParameter("@TuSo", model.TuSo),
                new SqlParameter("@ThuongTien", model.ThuongTien),
                new SqlParameter("@ThuongCong", model.ThuongCong)
                };

                int rowaff = helper.ExecuteNonQuery("sp_CauHinhThuong_InsertOrUpdate", pars);
                if (rowaff > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHinhThuong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool CauHinhThuong_Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CauHinhThuong_Delete", pars);
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
                log.Error("sp_CauHinhThuong_Delete " + ex.Message);
                return false;
            }
        }


    }
}