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
    public class MayChamCong_DiemQuetTheDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(MayChamCong_DiemQuetTheDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public MayChamCong_DiemQuetTheDAO()
        {
            helper = new DataHelper();
        }

        private MayChamCong_DiemQuetTheModel GetObjFromDataRow(DataRow dr)
        {
            MayChamCong_DiemQuetTheModel obj = new MayChamCong_DiemQuetTheModel();
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
        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_MayChamCong_DiemQuetThe_Delete", pars);
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
                log.Error("sp_MayChamCong_DiemQuetThe_Delete " + ex.Message);
                return false;
            }
        }


        public List<MayChamCong_DiemQuetTheModel> GetAllByDiemQuetThe(int ID_DiemQuetThe)
        {
            List<MayChamCong_DiemQuetTheModel> result = new List<MayChamCong_DiemQuetTheModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe)
                };
                DataSet ds = helper.ExecuteDataSet("sp_MayChamCong_DiemQuetThe_GetAllMayChamCong", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    MayChamCong_DiemQuetTheModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_DiemQuetThe_GetAllMayChamCong " + ex.Message);
                return result;
            }
        }

        public int Insert(int ID_DiemQuetThe, int ID_MayChamCong)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_DiemQuetThe", ID_DiemQuetThe),
                new SqlParameter("@ID_MayChamCong", ID_MayChamCong),
                };

                object id = helper.ExecuteScalar("sp_MayChamCong_DiemQuetThe_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_MayChamCong_DiemQuetThe_Insert " + ex.Message);
            }

            return 0;
        }

        

        public bool DeleteMultiByIDDiemQuetThe(string ID_DiemQuetThe)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DiemQuetThe",ID_DiemQuetThe ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_MayChamCong_DiemQuetThe_DeleteMultiByIDDiemQuetThe", pars);
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
                log.Error("sp_MayChamCong_DiemQuetThe_DeleteMultiByIDDiemQuetThe " + ex.Message);
                return false;
            }
        }
    }
}