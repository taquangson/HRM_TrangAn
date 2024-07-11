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
    public class ChuyenDoDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChuyenDoDAO));
        private DataHelper helper;
        public ChuyenDoDAO()
        {
            helper = new DataHelper();
        }

        private ChuyenDoModel GetChuyenDoFromDataRow(DataRow dr)
        {
            ChuyenDoModel obj = new ChuyenDoModel();
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

        private ChamCongModel GetChamCongFromDataRow(DataRow dr)
        {
            ChamCongModel obj = new ChamCongModel();
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

        public List<ChuyenDoModel> GetChuyenDoByNgay(DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Ngay", Ngay)
                };
                TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    //model.lstChamCong = GetChamCongByChuyenDo(model.ID_ChuyenDo);
                    //model.lstDiemTuyen = tddao.GetAllByTuyen(model.ID_TuyenDo);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetByNgay " + ex.Message);
                return null;
            }
        }
        
        public List<ChuyenDoModel> GetChuyenDoByNgay_NhanVien(DateTime Ngay, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Ngay", Ngay),
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetByNgay_NhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    model.lstChamCong = GetChamCongByChuyenDo(model.ID_ChuyenDo);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetByNgay_NhanVien " + ex.Message);
                return null;
            }
        }

        public ChuyenDoModel GetChuyenDoCuoi_NhanVien(DateTime ThoiGian, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ThoiGian", ThoiGian),
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetChuyenCuoiByNgay_NhanVien", pars);
                DataTable dt = ds.Tables[0];
                ChuyenDoModel result = new ChuyenDoModel();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    result = model;
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetChuyenCuoiByNgay_NhanVien " + ex.Message);
                return null;
            }
        }

        public List<ChuyenDoModel> GetChuyenDo_GetByNhanVien(DateTime from, DateTime to, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    model.lstChamCong = GetChamCongByChuyenDo(model.ID_ChuyenDo);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetByNgay_NhanVien " + ex.Message);
                return null;
            }
        }

        public List<ChuyenDoModel> GetChuyenDoNhapTay(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@from", from),
                new SqlParameter("@to", to),
                new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetChuyenDoNhapTay", pars);
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetChuyenDoNhapTay " + ex.Message);
                return null;
            }
        }

        public List<ChamCongModel> GetChamCongByChuyenDo(int ID_ChuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChuyenDo", ID_ChuyenDo)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetByChuyenDo", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetChamCongFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetByChuyenDo " + ex.Message);
                return null;
            }
        }

        public List<ChamCongModel> GetChamCongByNhanVien(int ID_NhanVien, DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                new SqlParameter("@From", From),
                new SqlParameter("@To", To),
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetChamCongFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetByNhanVien " + ex.Message);
                return null;
            }
        }

        public bool XacNhanMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenDo_XacNhanMulti", pars);
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
                log.Error("sp_ChuyenDo_XacNhanMulti " + ex.Message);
                return false;
            }
        }

        public bool HuyMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenDo_HuyMulti", pars);
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
                log.Error("sp_ChuyenDo_HuyMulti " + ex.Message);
                return false;
            }
        }

        public List<ChuyenDoModel> GetAll()
        {
            try
            {
                TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    model.lstChamCong = GetChamCongByChuyenDo(model.ID_ChuyenDo);
                    model.lstDiemTuyen = tddao.GetAllByTuyen(model.ID_TuyenDo);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ChuyenDoModel> GetChuyenDoThieu(DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@From", From),
                new SqlParameter("@To", To)
                };
                TuyenDo_DiemDAO tddao = new TuyenDo_DiemDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetChuyenDoThieu", pars);
                DataTable dt = ds.Tables[0];
                List<ChuyenDoModel> result = new List<ChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChuyenDoModel model = GetChuyenDoFromDataRow(dr);
                    //model.lstChamCong = GetChamCongByNhanVien(model.ID_NhanVien, From, To);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetChuyenDoThieu " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(ChuyenDoModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID_ChuyenDo),
                new SqlParameter("@MaThuyen", model.MaThuyen),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@ID_TuyenDo", model.ID_TuyenDo),
                new SqlParameter("@NgayDi", model.NgayDi),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@IsManager", model.IsManager),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_ChuyenDo_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool AutoTinhCongTheoChuyenDo()
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Ngay",DateTime.Now),
                };
                int rowaff = helper.ExecuteNonQuery("sp_CongLaoDong_AutoTinhCongLaoDongTheoChuyenDo", pars);
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
                log.Error("sp_CongLaoDong_AutoTinhCongLaoDongTheoChuyenDo " + ex.Message);
                return false;
            }
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenDo_DeleteMulti", pars);
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
                log.Error("sp_ChuyenDo_DeleteMulti " + ex.Message);
                return false;
            }
        }
        
        public bool Delete_ChuyenDoThemByNgay(DateTime Ngay, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Ngay",Ngay ),
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuyenDo_DeleteChuyenDoThemByNgay", pars);
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
                log.Error("sp_ChuyenDo_DeleteChuyenDoThemByNgay " + ex.Message);
                return false;
            }
        }

    }
}