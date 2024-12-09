using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class NhanVien_BaoHiemXaHoiDAO
    {

        log4net.ILog log = log4net.LogManager.GetLogger(typeof(NhanVien_BaoHiemXaHoiDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public NhanVien_BaoHiemXaHoiDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private NhanVien_BaoHiemXaHoiModel GetObjFromDataRow(DataRow dr)
        {
            NhanVien_BaoHiemXaHoiModel obj = new NhanVien_BaoHiemXaHoiModel();
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

        public bool InsertOrUpdate(List<NhanVien_BaoHiemXaHoiModel> list)
        {
            try
            {
                if (list != null)
                {
                    List<int> ListID = new List<int>();
                    foreach (NhanVien_BaoHiemXaHoiModel model in list)
                    {
                        ListID.Add(model.ID_NhanVien);
                    }
                    SqlParameter[] delPars = new SqlParameter[]
                    {
                    new SqlParameter("@ID_BaoHiemXaHoi", list.FirstOrDefault().ID_BaoHiemXaHoi),
                    new SqlParameter("@StringID_NhanVien", string.Join(",",ListID)),
                    };
                    int rowaff = helper.ExecuteNonQuery("sp_NhanVien_BaoHiemXaHoi_DeleteMulti", delPars);
                    List<TransactionModel> param = new List<TransactionModel>();
                    foreach (NhanVien_BaoHiemXaHoiModel model in list)
                    {
                        SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                        new SqlParameter("@ID_BaoHiemXaHoi", model.ID_BaoHiemXaHoi),
                        new SqlParameter("@ID_NguoiTao", model.ID_NguoiTao),
                        new SqlParameter("@ThoiGianBatDau", ((model.BatDauApDung.Year == 1 || model.BatDauApDung == null) ? (object)DBNull.Value : model.BatDauApDung)),
                        new SqlParameter("@ThoiGianKetThuc", ((model.KetThucApDung.Year == 1 || model.KetThucApDung == null) ? (object)DBNull.Value : model.KetThucApDung)),
                    };
                        TransactionModel tranparam = new TransactionModel();
                        tranparam.procName = "sp_NhanVien_BaoHiemXaHoi_InsertOrUpdate";
                        tranparam.procParams = pars;
                        param.Add(tranparam);
                    }

                    bool success = helper.ExecuteTransaction(param);
                    return success;
                }
                else
                {
                    SqlParameter[] delPars = new SqlParameter[]
                    {
                    new SqlParameter("@ID_BaoHiemXaHoi", list.FirstOrDefault().ID_BaoHiemXaHoi),
                    new SqlParameter("@StringID_NhanVien", ""),
                    };
                    int rowaff = helper.ExecuteNonQuery("sp_NhanVien_BaoHiemXaHoi_DeleteMulti", delPars);
                    return true;
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_BaoHiemXaHoi_InsertOrUpdate" + ex.Message);
            }

            return false;

        }

        public List<NhanVien_BaoHiemXaHoiModel> GetByID_BaoHiemXaHoi(int ID_BaoHiemXaHoi)
        {
            try
            {
                List<NhanVien_BaoHiemXaHoiModel> result = new List<NhanVien_BaoHiemXaHoiModel>();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_BaoHiemXaHoi",ID_BaoHiemXaHoi),
                };
                DataSet ds = helper.ExecuteDataSet("sp_NhanVien_BaoHiemXaHoi_GetByID_BaoHiemXaHoi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    NhanVien_BaoHiemXaHoiModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_NhanVien_BaoHiemXaHoi_GetByID_BaoHiemXaHoi " + ex.Message);
                return new List<NhanVien_BaoHiemXaHoiModel>();
            }
        }

    }
}