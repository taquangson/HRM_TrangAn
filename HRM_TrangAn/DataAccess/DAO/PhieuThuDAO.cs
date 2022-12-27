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
    public class PhieuThuDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public PhieuThuDAO()
        {
            helper = new DataHelper();
        }
        private PhieuThuModel GetPhieuThuFromDataRow(DataRow dr)
        {
            PhieuThuModel obj = new PhieuThuModel();
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

        private PhuThuGiamTruModel GetPhuThuGiamTruFromDataRow(DataRow dr)
        {
            PhuThuGiamTruModel obj = new PhuThuGiamTruModel();
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

        public int InsertOrUpdatePhieuThu(PhieuThuModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@Last_Update_User", model.Last_Update_User),
                new SqlParameter("@MaPhieu", model.MaPhieu),
                new SqlParameter("@TongThu", model.TongThu),
                new SqlParameter("@HinhThucThanhToan", model.HinhThucThanhToan)
                };

                object id = helper.ExecuteScalar("sp_PhieuThu_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_InsertOrUpdate " + ex.Message);
            }
            return 0;
        }

        public int InsertOrUpdatePhieuThuTemp(PhieuThuModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_HocSinh", model.ID_HocSinh),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@MaPhieu", model.MaPhieu),
                new SqlParameter("@TongThu", model.TongThu)
                };

                object id = helper.ExecuteScalar("sp_PhieuThuTemp_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_InsertOrUpdate " + ex.Message);
            }
            return 0;
        }

        public int UpdatePrintPhieuThu(int ID, DateTime Last_Print_Time, int Last_Print_User)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", ID),
                new SqlParameter("@Last_Print_User", Last_Print_User)
                };

                object id = helper.ExecuteScalar("sp_PhieuThu_UpdatePrint", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_UpdatePrint " + ex.Message);
            }
            return 0;
        }

        public List<PhieuThuModel> GetAllByHocSinh(int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThu_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<PhieuThuModel> result = new List<PhieuThuModel>();
                PhieuHocDAO phdao = new PhieuHocDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    PhieuThuModel item = GetPhieuThuFromDataRow(dr);
                    List<PhuThuGiamTruModel> dataPhuThuGiamTru = GetAllPhuThuGiamTru_ByPhieuThu(item.ID);
                    item.lstGiamTru = dataPhuThuGiamTru.Where(x => x.Type == 1).ToList();
                    item.lstPhuThu = dataPhuThuGiamTru.Where(x => x.Type == 0).ToList();
                    item.lstPhieuHoc = phdao.GetByPhieuThu(item.ID);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<PhieuThuModel> GetAllTempByHocSinh(int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThuTemp_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                List<PhieuThuModel> result = new List<PhieuThuModel>();
                PhieuHocDAO phdao = new PhieuHocDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    PhieuThuModel item = GetPhieuThuFromDataRow(dr);
                    List<PhuThuGiamTruModel> dataPhuThuGiamTru = GetAllPhuThuGiamTruTemp_ByPhieuThuTemp(item.ID);
                    item.lstGiamTru = dataPhuThuGiamTru.Where(x => x.Type == 1).ToList();
                    item.lstPhuThu = dataPhuThuGiamTru.Where(x => x.Type == 0).ToList();
                    item.lstPhieuHoc = phdao.GetByPhieuThuTemp(item.ID);
                    item.NguoiLap = item.NgayTao.ToString("hh:mm dd/MM/yyyy") + " - " + item.NguoiLap;
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public PhieuThuModel GetById(int ID_PhieuThu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThu_GetByID", pars);
                DataTable dt = ds.Tables[0];
                PhieuThuModel result = new PhieuThuModel();
                PhieuHocDAO phdao = new PhieuHocDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    PhieuThuModel item = GetPhieuThuFromDataRow(dr);
                    List<PhuThuGiamTruModel> dataPhuThuGiamTru = GetAllPhuThuGiamTru_ByPhieuThu(item.ID);
                    item.lstGiamTru = dataPhuThuGiamTru.Where(x => x.Type == 1).ToList();
                    item.lstPhuThu = dataPhuThuGiamTru.Where(x => x.Type == 0).ToList();
                    item.lstPhieuHoc = phdao.GetByPhieuThu(item.ID);
                    result = item;
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public PhieuThuModel GetTempById(int ID_PhieuThu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThuTemp_GetByID", pars);
                DataTable dt = ds.Tables[0];
                PhieuThuModel result = new PhieuThuModel();
                PhieuHocDAO phdao = new PhieuHocDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    PhieuThuModel item = GetPhieuThuFromDataRow(dr);
                    List<PhuThuGiamTruModel> dataPhuThuGiamTru = GetAllPhuThuGiamTruTemp_ByPhieuThuTemp(item.ID);
                    item.lstGiamTru = dataPhuThuGiamTru.Where(x => x.Type == 1).ToList();
                    item.lstPhuThu = dataPhuThuGiamTru.Where(x => x.Type == 0).ToList();
                    item.lstPhieuHoc = phdao.GetByPhieuThuTemp(item.ID);
                    result = item;
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool DeletePhieuThu(int ID)// Funtion xóa toàn bộ phiếu học, giảm trừ, phụ thu liên quan tới phiếu thu bị xóa
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhieuThu_Delete", pars);
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
                log.Error("sp_PhieuThu_Delete " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdatePhuThuGiamTru(PhuThuGiamTruModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                new SqlParameter("@LyDo", model.LyDo),
                new SqlParameter("@Type", model.Type),
                new SqlParameter("@DonGia", model.DonGia),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@SoBuoi", model.SoBuoi),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@Nam", model.Nam),
                new SqlParameter("@ID_PhieuHoc", model.ID_PhieuHoc)
                };

                object id = helper.ExecuteScalar("sp_PhuThuGiamTru_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuThuGiamTru_InsertOrUpdate " + ex.Message);
            }
            return 0;
        }

        public int InsertOrUpdatePhuThuGiamTruTemp(PhuThuGiamTruModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                new SqlParameter("@LyDo", model.LyDo),
                new SqlParameter("@Type", model.Type),
                new SqlParameter("@DonGia", model.DonGia),
                new SqlParameter("@ID_Lop", model.ID_Lop),
                new SqlParameter("@SoBuoi", model.SoBuoi),
                new SqlParameter("@Thang", model.Thang),
                new SqlParameter("@Nam", model.Nam),
                new SqlParameter("@ID_PhieuHoc", model.ID_PhieuHoc)
                };

                object id = helper.ExecuteScalar("sp_PhuThuGiamTruTemp_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhuThuGiamTruTemp_InsertOrUpdate " + ex.Message);
            }
            return 0;
        }

        public List<PhuThuGiamTruModel> GetAllPhuThuGiamTru_ByPhieuThu(int ID_PhieuThu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhuThuGiamTru_GetByPhieuThu", pars);
                DataTable dt = ds.Tables[0];
                List<PhuThuGiamTruModel> result = new List<PhuThuGiamTruModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetPhuThuGiamTruFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<PhuThuGiamTruModel> GetAllPhuThuGiamTruTemp_ByPhieuThuTemp(int ID_PhieuThu)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", ID_PhieuThu),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhuThuGiamTruTEmp_GetByPhieuThuTemp", pars);
                DataTable dt = ds.Tables[0];
                List<PhuThuGiamTruModel> result = new List<PhuThuGiamTruModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetPhuThuGiamTruFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool DeletePhuThuGiamTru(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhuThuGiamTru_Delete", pars);
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
                log.Error("sp_PhuThuGiamTru_Delete " + ex.Message);
                return false;
            }
        }


    }
}