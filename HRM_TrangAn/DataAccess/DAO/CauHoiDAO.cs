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
    public class CauHoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(CauHoiDAO));
        private DataHelper helper;
        public CauHoiDAO()
        {
            helper = new DataHelper();
        }

        private CauHoiModel GetCauHoiFromDataRow(DataRow dr)
        {
            CauHoiModel obj = new CauHoiModel();
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

        private DapAnModel GetDapAnFromDataRow(DataRow dr)
        {
            DapAnModel obj = new DapAnModel();
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

        public List<CauHoiModel> GetCauHoi_GetByDanhMuc(int ID_DanhMuc)
        {
            List<CauHoiModel> result = new List<CauHoiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DanhMuc", ID_DanhMuc)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CauHoi_GetByDanhMuc", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    CauHoiModel item = GetCauHoiFromDataRow(dr);
                    item.lstDapAn = GetDapAn_ByCauHoi(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_GetByDanhMuc " + ex.Message);
            }

            return result;
        }

        public CauHoiModel GetCauHoi_GetByID(long ID)
        {
            CauHoiModel result = new CauHoiModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CauHoi_GetByID", pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    CauHoiModel item = GetCauHoiFromDataRow(dt.Rows[0]);
                    item.lstDapAn = GetDapAn_ByCauHoi(item.ID);
                    result = item;
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_GetByID " + ex.Message);
            }

            return result;
        }

        public List<CauHoiModel> GetRanDomCauHoi_GetByDanhMuc(int SoLuong, int ID_DanhMuc)
        {
            List<CauHoiModel> result = new List<CauHoiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DanhMuc", ID_DanhMuc),
                    new SqlParameter("@SoLuong", SoLuong)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CauHoi_GetRanDomByDanhMuc", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    CauHoiModel item = GetCauHoiFromDataRow(dr);
                    item.lstDapAn = GetDapAn_ByCauHoi(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_GetByDanhMuc " + ex.Message);
            }

            return result;
        }

        public List<CauHoiModel> GetCauHoi_GetByDeThi(int ID_DeThi)
        {
            List<CauHoiModel> result = new List<CauHoiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeThi", ID_DeThi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_CauHoi_GetByDeThi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    CauHoiModel item = GetCauHoiFromDataRow(dr);
                    item.lstDapAn = GetDapAn_ByCauHoi(item.ID);
                    result.Add(item);

                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_GetByDeThi " + ex.Message);
            }

            return result;
        }

        public List<DapAnModel> GetDapAn_ByCauHoi(long ID_CauHoi)
        {
            List<DapAnModel> result = new List<DapAnModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_CauHoi", ID_CauHoi)
                };
                DataSet ds = helper.ExecuteDataSet("sp_DapAn_ByCauHoi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetDapAnFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_GetByDanhMuc " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate_CauHoi(CauHoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_DanhMucCauHoi", model.ID_DanhMucCauHoi),
                new SqlParameter("@ID_TaiKhoan", model.ID_TaiKhoan),
                new SqlParameter("@NoiDungCauHoi", model.NoiDungCauHoi),
                new SqlParameter("@SoDapAn", model.SoDapAn),
                new SqlParameter("@SoDapAnDung", model.SoDapAnDung),
                new SqlParameter("@AnhCauHoi", model.AnhCauHoi)
                };

                object id = helper.ExecuteScalar("sp_CauHoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CauHoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public int InsertOrUpdate_DapAn(DapAnModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_CauHoi", model.ID_CauHoi),
                new SqlParameter("@AnhDapAn", model.AnhDapAn),
                new SqlParameter("@DapAn", model.DapAn),
                new SqlParameter("@IsDapAnDung", model.IsDapAnDung)
                };

                object id = helper.ExecuteScalar("sp_DapAn_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DapAn_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete_CauHoi(int ID_CauHoi)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_CauHoi )
                };
                int rowaff = helper.ExecuteNonQuery("sp_CauHoi_Delete", pars);
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
                log.Error("sp_CauHoi_Delete " + ex.Message);
                return false;
            }
        }

        public bool Delete_DapAn(long ID_DapAn)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_DapAn )
                };
                int rowaff = helper.ExecuteNonQuery("sp_DapAn_Delete", pars);
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
                log.Error("sp_DapAn_Delete " + ex.Message);
                return false;
            }
        }


    }
}