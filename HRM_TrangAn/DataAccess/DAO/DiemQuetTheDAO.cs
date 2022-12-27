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
    public class DiemQuetTheDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(DiemQuetTheDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public DiemQuetTheDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private DiemQuetTheModel GetObjFromDataRow(DataRow dr)
        {
            DiemQuetTheModel obj = new DiemQuetTheModel();
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

        public List<DiemQuetTheModel> GetAll()
        {
            try
            {
                MayChamCongDAO mccdao = new MayChamCongDAO();
                DataSet ds = helper.ExecuteDataSet("sp_DiemQuetThe_GetAll");
                DataTable dt = ds.Tables[0];
                List<DiemQuetTheModel> result = new List<DiemQuetTheModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DiemQuetTheModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DiemQuetTheModel
                    model.lstMayChamCong = mccdao.GetAllByDiemQuetThe(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemQuetThe_GetAll " + ex.Message);
                return null;
            }
        }

        public List<DiemQuetTheModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaDiem", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_DiemQuetThe_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<DiemQuetTheModel> result = new List<DiemQuetTheModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DiemQuetTheModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DiemQuetTheModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemQuetThe_GetByMa " + ex.Message);
                return new List<DiemQuetTheModel>();
            }
        }

        public int InsertOrUpdate(DiemQuetTheModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaDiem", model.MaDiem),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@TenDiem", model.TenDiem),
                new SqlParameter("@DiaChiIP", model.DiaChiIP),
                new SqlParameter("@Port", model.Port),
                new SqlParameter("@ThongTinThietBi", model.ThongTinThietBi),
                new SqlParameter("@DiaDiem", model.DiaDiem),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_DiemQuetThe_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemQuetThe_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<DiemQuetTheModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (DiemQuetTheModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@MaDiem", model.MaDiem),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@TenDiem", model.TenDiem),
                        new SqlParameter("@DiaChiIP", model.DiaChiIP),
                        new SqlParameter("@Port", model.Port),
                        new SqlParameter("@ThongTinThietBi", model.ThongTinThietBi),
                        new SqlParameter("@DiaDiem", model.DiaDiem),
                        new SqlParameter("@TrangThai", model.TrangThai)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_DiemQuetThe_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_DiemQuetThe_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_DiemQuetThe_Delete", pars);
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
                log.Error("sp_DiemQuetThe_Delete " + ex.Message);
                return false;
            }
        }

        public bool DeleteMulti(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_DiemQuetThe_DeleteMulti", pars);
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
                log.Error("sp_DiemQuetThe_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public bool UpdateTrangThai(int ID, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID ),
                    new SqlParameter("@TrangThai",TrangThai ),

                };
                int rowaff = helper.ExecuteNonQuery("sp_DiemQuetThe_ChangeStatus", pars);
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
                log.Error("sp_DiemQuetThe_ChangeStatus " + ex.Message);
                return false;
            }
        }

        public List<DiemQuetTheModel> GetAllDiemTrongTuyen(int ID_TuyenDo)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_TuyenDo", ID_TuyenDo)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TuyenDo_Diem_GetAllDiem_TrongTuyen", pars);
                DataTable dt = ds.Tables[0];
                List<DiemQuetTheModel> result = new List<DiemQuetTheModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    DiemQuetTheModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NhanVienModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TuyenDo_Diem_GetAllDiem_TrongTuyen " + ex.Message);
                return null;
            }
        }




    }
}