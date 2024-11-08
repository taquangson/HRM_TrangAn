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
    public class BangLuongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(BangLuongDAO));
        private DataHelper helper;
        public BangLuongDAO()
        {
            helper = new DataHelper();
        }

        private TinhBangLuongModel GetObjTBLFromDataRow(DataRow dr)
        {
            TinhBangLuongModel obj = new TinhBangLuongModel();
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

        private BangLuongModel GetObjBLFromDataRow(DataRow dr)
        {
            BangLuongModel obj = new BangLuongModel();
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

        public List<BangLuongModel> GetBangLuong(DateTime from, DateTime to)
        {
            try
            {
                List<BangLuongModel> result = new List<BangLuongModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                new SqlParameter("from", from),
                new SqlParameter("to", to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BangLuong_GetBangLuong", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    BangLuongModel model = GetObjBLFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BangLuong_GetDataTinhBangLuong " + ex.Message);
                return new List<BangLuongModel>();
            };

        }
        
        
        public DataTable GetDataBangLuong(int Thang, int Nam)
        {
            try
            {
                List<BangLuongModel> result = new List<BangLuongModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                new SqlParameter("@Thang", Thang),
                new SqlParameter("@Nam", Nam)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BangLuong_GetData", pars);
                DataTable dt = ds.Tables[0];
               
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_BangLuong_GetData " + ex.Message);
                return null;
            };

        }

        public List<TinhBangLuongModel> GetDataTinhBangLuong(DateTime from, DateTime to)
        {
            try
            {
                List<TinhBangLuongModel> result = new List<TinhBangLuongModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                new SqlParameter("from", from),
                new SqlParameter("to", to)
                };
                DataSet ds = helper.ExecuteDataSet("sp_BangLuong_GetDataTinhBangLuong", pars);
                DataTable dt = ds.Tables[0];
                ChinhSachLuongDAO dao = new ChinhSachLuongDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    TinhBangLuongModel model = GetObjTBLFromDataRow(dr);
                    model.listChinhSachLuong = dao.GetNV_ByIDCSL(0, model.ID_HoSoNhanSu);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BangLuong_GetDataTinhBangLuong " + ex.Message);
                return new List<TinhBangLuongModel>();
            }
        }

        public bool InsertOrUpdate(BangLuongModel model) {
            try {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChinhSachLuong_NhanSu", model.ID_ChinhSachLuong_NhanSu),
                    new SqlParameter("@Ngay", model.Ngay),
                    new SqlParameter("@Tuan", model.Tuan),
                    new SqlParameter("@Thang", model.Thang),
                    new SqlParameter("@Quy", model.Quy),
                    new SqlParameter("@Nam", model.Nam),
                    new SqlParameter("@NgayBatDau", model.NgayBatDau),
                    new SqlParameter("@NgayKetThuc", model.NgayKetThuc),
                    new SqlParameter("@TienLuong", model.TienLuong),
                    new SqlParameter("@ID_ChinhSachLuong", model.ID_ChinhSachLuong),
                    new SqlParameter("@ID_NhanSu", model.ID_NhanSu)
                };
                int rowaff = helper.ExecuteNonQuery("sp_BangLuong_InsertOrUpdate", pars);
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
                log.Error("sp_BangLuong_InsertOrUpdate " + ex.Message);
                return false;
            }
        }

        public bool InsertOrUpdateMulti(List<BangLuongModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach(BangLuongModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[]
                    {
                        new SqlParameter("@ID_ChinhSachLuong_NhanSu", model.ID_ChinhSachLuong_NhanSu),
                        new SqlParameter("@Ngay", model.Ngay),
                        new SqlParameter("@Tuan", model.Tuan),
                        new SqlParameter("@Thang", model.Thang),
                        new SqlParameter("@Quy", model.Quy),
                        new SqlParameter("@Nam", model.Nam),
                        new SqlParameter("@NgayBatDau", model.NgayBatDau),
                        new SqlParameter("@NgayKetThuc", model.NgayKetThuc),
                        new SqlParameter("@TienLuong", model.TienLuong),
                        new SqlParameter("@ID_ChinhSachLuong", model.ID_ChinhSachLuong),
                        new SqlParameter("@ID_NhanSu", model.ID_NhanSu)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_BangLuong_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }
                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_BangLuong_InsertOrUpdate " + ex.Message);
                return false;
            }
        }
    }
}