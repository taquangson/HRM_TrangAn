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
    public class ChamCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChamCongDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ChamCongDAO()
        {
            helper = new DataHelper();
        }

        private ChamCongModel GetObjFromDataRow(DataRow dr)
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

        private ChamCongMonitorModel GetMonitorObjFromDataRow(DataRow dr)
        {
            ChamCongMonitorModel obj = new ChamCongMonitorModel();
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

        private DuLieuChuyenDoModel DLChuyenDo_GetObjFromDataRow(DataRow dr)
        {
            DuLieuChuyenDoModel obj = new DuLieuChuyenDoModel();
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


        public List<ChamCongModel> GetListChamCong_PhuHopTuyen(DateTime ThoiGianVeBen, int ThoiGianToiThieu, int ThoiGianToiDa, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ThoiGianVeBen", ThoiGianVeBen),
                    new SqlParameter("@ThoiGianToiThieu", ThoiGianToiThieu),
                    new SqlParameter("@ThoiGianToiDa", ThoiGianToiDa),
                    new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCong_PhuHopTuyen", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_PhuHopTuyen " + ex.Message);
                return new List<ChamCongModel>();
            }
        }

        public List<DuLieuChuyenDoModel> GetDuLieuChamCong_PhuHopChuyenDo(DateTime From, DateTime To, int ID_DiemDau, int ID_DiemGiua, int ID_DiemCuoi, int MinTime, int MaxTime)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@From", From),
                    new SqlParameter("@To", To),
                    new SqlParameter("@ID_DiemDau", ID_DiemDau),
                    new SqlParameter("@ID_DiemGiua", ID_DiemGiua),
                    new SqlParameter("@ID_DiemCuoi", ID_DiemCuoi),
                    new SqlParameter("@MinTime", MinTime),
                    new SqlParameter("@MaxTime", MaxTime),
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChuyenDo_GetDuLieuChamCong_PhuHopChuyen", pars);
                DataTable dt = ds.Tables[0];
                List<DuLieuChuyenDoModel> result = new List<DuLieuChuyenDoModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DuLieuChuyenDoModel model = DLChuyenDo_GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuyenDo_GetDuLieuChamCong_PhuHopChuyen " + ex.Message);
                return null;
            }
        }

        public List<ChamCongModel> GetListChamCong_ByNgay(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCong_ByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_ByNgay " + ex.Message);
                return null;
            }
        }

        public List<ChamCongModel> GetListChamCongBenLen_ByNgayByDiem(DateTime from, DateTime to, int ID_DiemQuetThe)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCong_ByNgayByDiem", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_ByNgayByDiem " + ex.Message);
                return null;
            }
        }

        public List<ChamCongMonitorModel> GetListMonitorChamCong_ByNgay(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCong_ByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongMonitorModel> result = new List<ChamCongMonitorModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongMonitorModel model = GetMonitorObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_ByNgay " + ex.Message);
                return null;
            }
        }

        public List<ChamCongMonitorModel> GetListMonitorChamCong_ByNgay(DateTime ngay, int ID_DiemQuetThe)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@Ngay", ngay),
                    new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };

                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_GetAllNhanVien_TheoDiemQuetThe", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongMonitorModel> result = new List<ChamCongMonitorModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongMonitorModel model = GetMonitorObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_GetAllNhanVien_TheoDiemQuetThe " + ex.Message);
                return null;
            }
        }

        public List<ChamCongModel> GetListChamCong_ByNgay_NhanVien(int ID_NhanVien, DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_GetListChamCong_ByNgayNhanVien", pars);
                DataTable dt = ds.Tables[0];
                List<ChamCongModel> result = new List<ChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành TuyenDoModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetListChamCong_ByNgayNhanVien " + ex.Message);
                return null;
            }
        }

        public int CountExistCheckpoint(int ID_TaiKhoan, int ID_DiemQuetThe, DateTime WorkDate)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {

                    new SqlParameter("@ID_TaiKhoan", ID_TaiKhoan),
                    new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe),
                    new SqlParameter("@WorkDate", WorkDate)
                };

                object id = helper.ExecuteScalar("sp_ChamCong_GetExistsCheckPoint", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_GetExistsCheckPoint " + ex.Message);
            }

            return 0;
        }


        public int Insert(ChamCongModel model, string MaNhanVien, int ID_ChuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                
                    new SqlParameter("@EnrollNumber", MaNhanVien),
                    new SqlParameter("@VerifyMode", 1),
                    new SqlParameter("@InOutMode", 0),
                    new SqlParameter("@WorkDate", model.ThoiGian),
                    new SqlParameter("@Workcode", 0),
                    new SqlParameter("@ID_DiemQuetThe", model.ID_DiemQuetThe),
                    new SqlParameter("@DiaChiIP", model.DiaChiIP),
                    new SqlParameter("@ID_ChuyenDo", ID_ChuyenDo),
                    new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                    new SqlParameter("@MaThuyen", model.MaThuyen)

                };

                object id = helper.ExecuteScalar("sp_ChamCong_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_Insert " + ex.Message);
            }

            return 0;
        }
        
        public int Update(ChamCongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_ChuyenDo", model.ID_ChuyenDo)

                };

                object id = helper.ExecuteScalar("sp_ChamCong_Update", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_Update " + ex.Message);
            }

            return 0;
        }

        public bool DeleteByChuyenDo(int ID_ChuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChuyenDo",ID_ChuyenDo ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChamCong_DeleteByChuyenDo", pars);
                //if (rowaff > 0)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
                return true;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_DeleteByChuyenDo " + ex.Message);
                return false;
            }
        }

        public DataTable GetDataChotCong(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoChotCong", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_CongLaoDong_InsertOrUpdate " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataChotCongByNhanVien(DateTime from, DateTime to, int ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoChotCong_ByNhanVien", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoChotCong_ByNhanVien " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCong(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongLaoDong", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongLaoDong " + ex.Message);
                return null;
            }
        }
        
        public DataTable GetDataCongTinhTien(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongTinhTien", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongTinhTien " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCongChuyenDoTheoDanhMucCongViec(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongTheoDanhMucCongViec", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongTheoDanhMucCongViec " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataNghiPhep(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoNghiPhep", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoNghiPhep " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCongChuyenDo(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongChuyenDo", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongChuyenDo " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCongChuyenDo_TruGiamTru(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongChuyenDo_TruGiamTru", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongChuyenDo_TruGiamTru" + ex.Message);
                return null;
            }
        }


        public DataTable GetDataCongGiamTru(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongGiamTru", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongGiamTru " + ex.Message);
                return null;
            }
        }


        public DataTable GetDataCongChuyenDoTheoTuyen(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongChuyenDoTheoTuyen", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongChuyenDoTheoTuyen " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCongLaoDong(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoChamCongLaoDong", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoChamCongLaoDong " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataLuongTickeTheoTo(DateTime from, DateTime to, int ID_ToNhom)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to),
                    new SqlParameter("@ID_ToNhom", ID_ToNhom)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoBangLuongTo", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoBangLuongTo " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataTickeTheoNam(int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@Nam", Nam)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongChuyenDoToTheoNam", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongChuyenDoToTheoNam " + ex.Message);
                return null;
            }
        }

        public DataTable GetDataCongChuyenDoTheoCacTo(DateTime from, DateTime to)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@fromdate", from),
                    new SqlParameter("@todate", to)
                };

                DataSet ds = helper.ExecuteDataSet("sp_ChamCong_BaoCaoCongChuyenDoTo", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChamCong_BaoCaoCongChuyenDoTo " + ex.Message);
                return null;
            }
        }

        public bool ChotCong(DateTime Ngay, int ID_TaiKhoan)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ThangChotCong",Ngay ),
                    new SqlParameter("@ID_TaiKhoan",ID_TaiKhoan ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_LichSuChotCong_Insert", pars);
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
                log.Error("sp_LichSuChotCong_Insert " + ex.Message);
                return false;
            }
        }
    }

}