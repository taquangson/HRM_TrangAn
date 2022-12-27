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
    public class ThuyenDoLichSuDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ThuyenDoLichSuDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ThuyenDoLichSuDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ThuyenDoLichSuModel GetObjFromDataRow(DataRow dr)
        {
            ThuyenDoLichSuModel obj = new ThuyenDoLichSuModel();
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

        public int Insert(int ID_NhanVien, int ID_Thuyen)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_Thuyen", ID_Thuyen),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_ThuyenDo_LichSu_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_Insert " + ex.Message);
            }

            return 0;
        }

        public bool InsertList(List<ThuyenDoModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (ThuyenDoModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID_Thuyen", model.ID),
                        new SqlParameter("@ID_NhanVien", model.ID_NhanVien)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_ThuyenDo_LichSu_Insert";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
                
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_Insert " + ex.Message);
            }

            return false;
        }
        public bool InsertListThuyen(List<NhanVienModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (NhanVienModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID_Thuyen", model.ID_Thuyen),
                        new SqlParameter("@ID_NhanVien", model.ID)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_ThuyenDo_LichSu_Insert";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;

            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_Insert " + ex.Message);
            }

            return false;
        }
        public int InsertThuyen(int ID_NhanVien, int ID_Thuyen)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_Thuyen", ID_Thuyen),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_ThuyenDo_LichSu_InsertThuyen", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_InsertThuyen " + ex.Message);
            }

            return 0;
        }

        public int InsertNhanVien(int ID_NhanVien, int ID_Thuyen)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_Thuyen", ID_Thuyen),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_ThuyenDo_LichSu_InsertNhanVien", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_InsertNhanVien " + ex.Message);
            }

            return 0;
        }

        public int UpdateStatus(int ID_NhanVien, int ID_Thuyen)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID_Thuyen", ID_Thuyen),
                    new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_ThuyenDo_LichSu_UpdateStatus", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ThuyenDo_LichSu_UpdateStatus " + ex.Message);
            }

            return 0;
        }






    }
}