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
    public class SoDuBuoiHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(SoDuBuoiHocDAO));
        private DataHelper helper;
        public SoDuBuoiHocDAO()
        {
            helper = new DataHelper();
        }

        private SoDuBuoiHocModel GetObjFromDataRow(DataRow dr)
        {
            SoDuBuoiHocModel obj = new SoDuBuoiHocModel();
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

        public bool TruSoDuBuoiHocChinh(int ID_Lop, int ID_HocSinh, int SoLuong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@SoLuong", SoLuong)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_TruSoDuHocChinh", pars);
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
                log.Error("sp_SoDuBuoiHoc_TruSoDuHocChinh " + ex.Message);
                return false;
            }
        }

        public bool CongSoDuBuoiHocChinh(int ID_Lop, int ID_HocSinh, int SoLuong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@SoLuong", SoLuong)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_CongSoDuHocChinh", pars);
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
                log.Error("sp_SoDuBuoiHoc_TruSoDuHocChinh " + ex.Message);
                return false;
            }
        }

        public bool TruSoDuBuoiHocDuoi(int ID_Lop, int ID_HocSinh, int SoLuong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@SoLuong", SoLuong)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_TruSoDuHocDuoi", pars);
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
                log.Error("sp_SoDuBuoiHoc_TruSoDuHocDuoi " + ex.Message);
                return false;
            }
        }

        public bool CongSoDuBuoiHocDuoi(int ID_Lop, int ID_HocSinh, int SoLuong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@SoLuong", SoLuong)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_CongSoDuHocDuoi", pars);
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
                log.Error("sp_SoDuBuoiHoc_CongSoDuHocDuoi " + ex.Message);
                return false;
            }
        }

        public bool XoaSoDuBuoiHocDuoi(int ID_Lop, int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_XoaSoDuHocDuoi", pars);
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
                log.Error("sp_SoDuBuoiHoc_CongSoDuHocDuoi " + ex.Message);
                return false;
            }
        }

        public bool XoaSoDuBuoiHocChinh(int ID_Lop, int ID_HocSinh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };

                int rowaff = helper.ExecuteNonQuery("sp_SoDuBuoiHoc_XoaSoDuHocChinh", pars);
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
                log.Error("sp_SoDuBuoiHoc_CongSoDuHocDuoi " + ex.Message);
                return false;
            }
        }


        public List<SoDuBuoiHocModel> GetByHocSinh(int ID_HocSinh)
        {
            List<SoDuBuoiHocModel> result = new List<SoDuBuoiHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_SoDuBuoiHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_SoDuBuoiHoc_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public SoDuBuoiHocModel GetByHocSinh_Lop(int ID_HocSinh, int ID_Lop)
        {
            SoDuBuoiHocModel result = new SoDuBuoiHocModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_SoDuBuoiHoc_GetByHocSinhLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_SoDuBuoiHoc_GetByHocSinhLop " + ex.Message);
            }

            return result;
        }
    }
}