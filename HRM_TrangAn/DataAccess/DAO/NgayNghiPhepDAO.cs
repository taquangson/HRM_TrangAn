using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI.WebControls.WebParts;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class NgayNghiPhepDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ToNhomDAO));
        private DataHelper helper;

        public NgayNghiPhepDAO()
        {
            helper = new DataHelper();
        }

        private NghiPhepNamViewModel GetObjNPNVMFromDataRow(DataRow dr)
        {
            NghiPhepNamViewModel obj = new NghiPhepNamViewModel();
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

        private NgayNghiPhepModel GetObjNNPMFromDataRow(DataRow dr)
        {
            NgayNghiPhepModel obj = new NgayNghiPhepModel();
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

        public List<NghiPhepNamViewModel> GetByNam(int Nam)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Nam", Nam)
                };
                List<NghiPhepNamViewModel> result = new List<NghiPhepNamViewModel>();
                DataSet ds = helper.ExecuteDataSet("sp_NgayNghiPhep_GetAll", pars);
                DataTable NPNVTable = ds.Tables[0];
                DataTable NNPTable = ds.Tables[1];
                List<NgayNghiPhepModel> listNgayNghiPhep = new List<NgayNghiPhepModel>();
                foreach (DataRow dr in NNPTable.Rows) 
                {
                    listNgayNghiPhep.Add(GetObjNNPMFromDataRow(dr));
                }
                foreach (DataRow dr in NPNVTable.Rows)
                {
                    NghiPhepNamViewModel model = GetObjNPNVMFromDataRow(dr);
                    var list = listNgayNghiPhep.Where(item => item.ID_HoSoNhanSu == model.ID_HoSoNhanSu);
                    model.ListNgayNghiPhep = list.ToList();
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NgayNghiPhep_GetAll " + ex.Message);
                return new List<NghiPhepNamViewModel>();
            }
        }

        public bool UpdateListNgayNghiPhep(NghiPhepNamViewModel model, int ID_NguoiSua, int Nam)
        {
            try
            {
                List<NgayNghiPhepModel> listNgayNghiPhep = model.ListNgayNghiPhep;
                string StringID_NNP = "";
                foreach(NgayNghiPhepModel item in listNgayNghiPhep)
                {
                    StringID_NNP += item.ID.ToString()+",";
                }
                SqlParameter[] deletePars = new SqlParameter[] {
                    new SqlParameter("ID_HoSoNhanSu",model.ID_HoSoNhanSu),
                    new SqlParameter("ListID", StringID_NNP),
                    new SqlParameter("ID_NguoiSua", ID_NguoiSua),
                    new SqlParameter("Nam", Nam)
                };
                List<TransactionModel> transistions = new List<TransactionModel>();
                TransactionModel deleteTransaction = new TransactionModel();
                deleteTransaction.procName = "sp_NgayNghiPhep_DeleteByID_HSNS";
                deleteTransaction.procParams = deletePars;
                transistions.Add(deleteTransaction);
                foreach (NgayNghiPhepModel item in listNgayNghiPhep)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("ID", item.ID),
                        new SqlParameter("NgayNghi", item.NgayNghi),
                        new SqlParameter("ID_HoSoNhanSu", item.ID_HoSoNhanSu),
                        new SqlParameter("GhiChu", item.GhiChu),
                        new SqlParameter("ID_NguoiTao", ID_NguoiSua),
                        new SqlParameter("ID_NguoiSua", ID_NguoiSua),
                    };
                    TransactionModel transaction = new TransactionModel();
                    transaction.procName = "sp_NgayNghiPhep_InsertOrUpdate";
                    transaction.procParams = pars;
                    transistions.Add(transaction);
                }

                bool success = helper.ExecuteTransaction(transistions);
                return success;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                return false;
            }
        }
    }
}