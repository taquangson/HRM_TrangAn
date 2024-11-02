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
    public class BaoHiemXaHoi_LichSuDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(BaoHiemXaHoi_LichSuDAO));
        private DataHelper helper;
        public BaoHiemXaHoi_LichSuDAO()
        {
            helper = new DataHelper();
        }

        private BaoHiemXaHoi_LichSuModel GetObjFromDataRow(DataRow dr)
        {
            BaoHiemXaHoi_LichSuModel obj = new BaoHiemXaHoi_LichSuModel();
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

        public List<BaoHiemXaHoi_LichSuModel> GetByThang(int Thang, int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Thang", Thang),
                    new SqlParameter("@Nam", Nam),
                };
                DataSet ds = helper.ExecuteDataSet("sp_BaoHiemXaHoi_LichSu_GetByThang");
                DataTable dt = ds.Tables[0];
                List<BaoHiemXaHoi_LichSuModel> result = new List<BaoHiemXaHoi_LichSuModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    BaoHiemXaHoi_LichSuModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoHiemXaHoi_LichSu_GetByThang " + ex.Message);
                return null;
            }
        }

        public bool InsertOrUpdate(List<BaoHiemXaHoi_LichSuModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (BaoHiemXaHoi_LichSuModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@MucLuongDongBaoHiem", model.MucLuongDongBaoHiem),
                        new SqlParameter("@SDLD_BHXH", model.SDLD_BHXH),
                        new SqlParameter("@SDLD_BHYT", model.SDLD_BHYT),
                        new SqlParameter("@SDLD_BHTN", model.SDLD_BHTN),
                        new SqlParameter("@SDLD_Tong", model.SDLD_Tong),
                        new SqlParameter("@SDLD_ThucTe", model.SDLD_ThucTe),
                        new SqlParameter("@NLD_BHXH", model.NLD_BHXH),
                        new SqlParameter("@NLD_BHYT", model.NLD_BHYT),
                        new SqlParameter("@NLD_BHTN", model.NLD_BHTN),
                        new SqlParameter("@NLD_Tong", model.NLD_Tong),
                        new SqlParameter("@NLD_ThucTe", model.NLD_ThucTe),
                        new SqlParameter("@Tong", model.Tong),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@MoTa", model.MoTa),
                        new SqlParameter("@ID_HoSoNhanSu", model.ID_HoSoNhanSu),
                        new SqlParameter("@Thang", model.Thang),
                        new SqlParameter("@Nam", model.Nam),
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_BaoHiemXaHoi_LichSu_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }

                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoHiemXaHoi_LichSu_InsertOrUpdate " + ex.Message);
                return false;
            }

        }
    }
}