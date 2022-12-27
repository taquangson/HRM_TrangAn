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
    public class LichSuKetNoiMCCDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public LichSuKetNoiMCCDAO()
        {
            helper = new DataHelper();
        }

        private LichSuKetNoiMCCModel GetObjFromDataRow(DataRow dr)
        {
            LichSuKetNoiMCCModel obj = new LichSuKetNoiMCCModel();
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
        public List<LichSuKetNoiMCCModel> GetByMCC(int ID_MayChamCong, DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_MayChamCong", ID_MayChamCong),
                new SqlParameter("@From", From),
                new SqlParameter("@To", To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuKetNoiMCC_GetByMCC", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuKetNoiMCCModel> result = new List<LichSuKetNoiMCCModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuKetNoiMCC_GetByMCC " + ex.Message);

                return null;
            }
        }


        public List<LichSuKetNoiMCCModel> GetData()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_GetTrangThaiKetNoi");
                DataTable dt = ds.Tables[0];
                List<LichSuKetNoiMCCModel> result = new List<LichSuKetNoiMCCModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_GetTrangThaiKetNoi " + ex.Message);

                return null;
            }
        }

        public List<LichSuKetNoiMCCModel> GetAll(DateTime From, DateTime To)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@From", From),
                new SqlParameter("@To", To)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuKetNoiMCC_GetAll", pars);
                DataTable dt = ds.Tables[0];
                List<LichSuKetNoiMCCModel> result = new List<LichSuKetNoiMCCModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuKetNoiMCC_GetAll " + ex.Message);

                return null;
            }
        }

        public LichSuKetNoiMCCModel GetTrangThaiHienTai(int ID_MayChamCong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_MayChamCong", ID_MayChamCong)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LichSuKetNoiMCC_GetTrangThaiHienTai", pars);
                DataTable dt = ds.Tables[0];
                LichSuKetNoiMCCModel item = GetObjFromDataRow(dt.Rows[0]);
                return item;

            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuKetNoiMCC_GetTrangThaiHienTai " + ex.Message);

                return null;
            }
        }

        public int Insert(LichSuKetNoiMCCModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_MayChamCong", model.ID_MayChamCong),
                new SqlParameter("@ThoiGianKetNoi", model.ThoiGianKetNoi),
                new SqlParameter("@TrangThaiKetNoi", model.TrangThaiKetNoi),
                new SqlParameter("@GhiChu", model.GhiChu)
                };

                object id = helper.ExecuteScalar("sp_LichSuKetNoiMCC_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_AnhBaiKiemTra_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_LichSuKetNoiMCC_Delete", pars);
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
                log.Error("sp_LichSuKetNoiMCC_Delete " + ex.Message);
                return false;
            }
        }
    }
}