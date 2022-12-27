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
    public class MayChamCongDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(MayChamCongDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public MayChamCongDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private MayChamCongModel GetObjFromDataRow(DataRow dr)
        {
            MayChamCongModel obj = new MayChamCongModel();
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

        public List<MayChamCongModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_MayChamCong_GetAll");
                DataTable dt = ds.Tables[0];
                List<MayChamCongModel> result = new List<MayChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    MayChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành MayChamCongModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_GetAll " + ex.Message);
                return null;
            }
        }
        public List<MayChamCongModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaThietBi", Ma ),
                };
                DataSet ds = helper.ExecuteDataSet("sp_MayChamCong_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<MayChamCongModel> result = new List<MayChamCongModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    MayChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành DiemQuetTheModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_GetByMa " + ex.Message);
                return new List<MayChamCongModel>();
            }
        }

        public int InsertOrUpdate(MayChamCongModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaThietBi", model.MaThietBi),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@TenThietBi", model.TenThietBi),
                new SqlParameter("@ThongTinThietBi", model.ThongTinThietBi),
                new SqlParameter("@DiaChiIP", model.DiaChiIP),
                new SqlParameter("@Port", model.Port),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_MayChamCong_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool InsertOrUpdateMulti(List<MayChamCongModel> list)
        {
            try
            {
                List<TransactionModel> param = new List<TransactionModel>();
                foreach (MayChamCongModel model in list)
                {
                    SqlParameter[] pars = new SqlParameter[] {
                        new SqlParameter("@ID", model.ID),
                        new SqlParameter("@MaThietBi", model.MaThietBi),
                        new SqlParameter("@GhiChu", model.GhiChu),
                        new SqlParameter("@TenThietBi", model.TenThietBi),
                        new SqlParameter("@DiaChiIP", model.DiaChiIP),
                        new SqlParameter("@Port", model.Port),
                        new SqlParameter("@ThongTinThietBi", model.ThongTinThietBi),
                        new SqlParameter("@TrangThai", model.TrangThai)
                    };
                    TransactionModel tranparam = new TransactionModel();
                    tranparam.procName = "sp_MayChamCong_InsertOrUpdate";
                    tranparam.procParams = pars;
                    param.Add(tranparam);
                }


                bool success = helper.ExecuteTransaction(param);
                return success;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_InsertOrUpdate " + ex.Message);
            }

            return false;
        }

        public List<MayChamCongModel> GetAllByDiemQuetThe(int ID_DiemQuetThe)
        {
            List<MayChamCongModel> result = new List<MayChamCongModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };
                DataSet ds = helper.ExecuteDataSet("sp_MayChamCong_DiemQuetThe_GetAllMayChamCongByDiemQuetThe", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    MayChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_DiemQuetThe_GetAllMayChamCongByDiemQuetThe " + ex.Message);
                return result;
            }
        }
        public List<MayChamCongModel> GetAllMayChamCongNgoaiDiemQuetThe(int ID_DiemQuetThe)
        {
            List<MayChamCongModel> result = new List<MayChamCongModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };
                DataSet ds = helper.ExecuteDataSet("sp_MayChamCong_DiemQuetThe_GetAllMayChamCongNgoaiDiemQuetThe", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    MayChamCongModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_DiemQuetThe_GetAllMayChamCongNgoaiDiemQuetThe " + ex.Message);
                return result;
            }
        }
        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_MayChamCong_Delete", pars);
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
                log.Error("sp_MayChamCong_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_MayChamCong_ChangeStatus", pars);
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
                log.Error("sp_MayChamCong_ChangeStatus " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_MayChamCong_DeleteMulti", pars);
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
                log.Error("sp_MayChamCong_DeleteMulti " + ex.Message);
                return false;
            }
        }





    }
}