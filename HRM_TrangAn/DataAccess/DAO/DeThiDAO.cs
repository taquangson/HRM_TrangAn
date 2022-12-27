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
    public class DeThiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DeThiDAO));
        private DataHelper helper;
        public DeThiDAO()
        {
            helper = new DataHelper();
        }

        private DeThiModel GetDeThiFromDataRow(DataRow dr)
        {
            DeThiModel obj = new DeThiModel();
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

        private DeThi_ChiTietModel GetChiTietDeThiFromDataRow(DataRow dr)
        {
            DeThi_ChiTietModel obj = new DeThi_ChiTietModel();
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

        private DeThi_CauHoiModel GetCauHoiDeThiFromDataRow(DataRow dr)
        {
            DeThi_CauHoiModel obj = new DeThi_CauHoiModel();
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

        public List<DeThiModel> GetDeThi_GetByMonHoc(int ID_MonHoc)
        {
            List<DeThiModel> result = new List<DeThiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_MonHoc", ID_MonHoc)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DeThi_GetByMonHoc", pars);
                DataTable dt = ds.Tables[0];
                CauHoiDAO chdao = new CauHoiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    DeThiModel item = GetDeThiFromDataRow(dr);
                    item.lstChiTiet = GetChiTietDeThi_GetByDeThi(item.ID);
                    item.lstCauHoi = chdao.GetCauHoi_GetByDeThi(item.ID);
                    item.lstDeThiCauHoi = GetCauHoiDeThi_GetByDeThi(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThi_GetByMonHoc " + ex.Message);
            }

            return result;
        }

        public List<DeThiModel> GetAllDeThi()
        {
            List<DeThiModel> result = new List<DeThiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DeThi_GetAll");
                DataTable dt = ds.Tables[0];
                CauHoiDAO chdao = new CauHoiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    DeThiModel item = GetDeThiFromDataRow(dr);
                    item.lstChiTiet = GetChiTietDeThi_GetByDeThi(item.ID);
                    item.lstCauHoi = chdao.GetCauHoi_GetByDeThi(item.ID);
                    item.lstDeThiCauHoi = GetCauHoiDeThi_GetByDeThi(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThi_GetAll " + ex.Message);
            }

            return result;
        }

        public DeThiModel GetDeThiById(int ID)
        {
            DeThiModel result = new DeThiModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
               {
                    new SqlParameter("@ID", ID)
               };
                DataSet ds = helper.ExecuteDataSet("sp_DeThi_GetByID", pars);
                DataTable dt = ds.Tables[0];
                CauHoiDAO chdao = new CauHoiDAO();
                if (dt.Rows.Count > 0)
                {
                    DeThiModel item = GetDeThiFromDataRow(dt.Rows[0]);
                    item.lstChiTiet = GetChiTietDeThi_GetByDeThi(item.ID);
                    item.lstCauHoi = chdao.GetCauHoi_GetByDeThi(item.ID);
                    List<CauHoiModel> cauhoibydanhmuc = new List<CauHoiModel>();
                    foreach (DeThi_ChiTietModel i in item.lstChiTiet)
                    {
                        cauhoibydanhmuc = chdao.GetRanDomCauHoi_GetByDanhMuc(i.SoLuongCauHoi, i.ID_DanhMucCauHoi);
                        foreach(CauHoiModel c in cauhoibydanhmuc)
                        {
                            c.Diem = i.Diem / cauhoibydanhmuc.Count;
                        }
                        item.lstCauHoi.AddRange(cauhoibydanhmuc);
                    }          
                                       
                    result = item;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThi_GetByID " + ex.Message);
            }
            return result;
        }

        public List<DeThi_ChiTietModel> GetChiTietDeThi_GetByDeThi(int ID_DeThi)
        {
            List<DeThi_ChiTietModel> result = new List<DeThi_ChiTietModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeThi", ID_DeThi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DeThiChiTiet_GetByDeThi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DeThi_ChiTietModel item = GetChiTietDeThiFromDataRow(dr);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThiChiTiet_GetByDeThi " + ex.Message);
            }

            return result;
        }

        public List<DeThi_CauHoiModel> GetCauHoiDeThi_GetByDeThi(int ID_DeThi)
        {
            List<DeThi_CauHoiModel> result = new List<DeThi_CauHoiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeThi", ID_DeThi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DeThiCauHoi_GetByDeThi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DeThi_CauHoiModel item = GetCauHoiDeThiFromDataRow(dr);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThiCauHoi_GetByDeThi " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate_DeThi(DeThiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_Khoi", model.ID_Khoi),
                new SqlParameter("@ID_MonHoc", model.ID_MonHoc),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@TenDeThi", model.TenDeThi),
                new SqlParameter("@ThoiGian", model.ThoiGian)
                };

                object id = helper.ExecuteScalar("sp_DeThi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate_DeThiChiTiet(DeThi_ChiTietModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_DanhMucCauHoi", model.ID_DanhMucCauHoi),
                new SqlParameter("@ID_DeThi", model.ID_DeThi),
                new SqlParameter("@SoLuongCauHoi", model.SoLuongCauHoi)
                };

                object id = helper.ExecuteScalar("sp_DeThiChiTiet_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThiChiTiet_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int InsertOrUpdate_DeThiCauHoi(DeThi_CauHoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@ID_CauHoi", model.ID_CauHoi),
                new SqlParameter("@ID_DeThi", model.ID_DeThi),
                new SqlParameter("@STT", model.STT)
                };

                object id = helper.ExecuteScalar("sp_DeThiCauHoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DeThiCauHoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete_DeThi(int ID_DeThi)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DeThi )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DeThi_Delete", pars);
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
                log.Error("sp_DeThi_Delete " + ex.Message);
                return false;
            }
        }

        public bool Delete_DeThiChiTiet(int ID_DeThiChiTiet)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DeThiChiTiet )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DeThiChiTiet_Delete", pars);
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
                log.Error("sp_DeThi_Delete " + ex.Message);
                return false;
            }
        }

        public bool Delete_DeThiCauHoi(int ID_DeThiCauHoi)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DeThiCauHoi )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DeThiCauHoi_Delete", pars);
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
                log.Error("sp_DeThiCauHoi_Delete " + ex.Message);
                return false;
            }
        }
    }
}