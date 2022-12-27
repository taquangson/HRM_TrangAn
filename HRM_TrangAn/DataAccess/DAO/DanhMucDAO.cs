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
    public class DanhMucDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public DanhMucDAO()
        {
            helper = new DataHelper();
        }

        public class DanhMuc
        {
            public int value { get; set; }
            public string text { get; set; }
        }

        public List<DanhMuc> GetAll_DMQuyen()
        {
            List<DanhMuc> result = new List<DanhMuc>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_DanhMucQuyen_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMuc dm = new DanhMuc();
                    dm.value = int.Parse(dr["ID"].ToString());
                    dm.text = dr["TenQuyen"].ToString();
                    result.Add(dm);
                }
            }
            catch (Exception ex)
            {
                log.Error("GetAll " + ex.Message);
            }

            return result;
        }

        public List<DanhMuc> GetAll_DM(string TenBang)
        {
            List<DanhMuc> result = new List<DanhMuc>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_" + TenBang + "_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    DanhMuc dm = new DanhMuc();
                    dm.value = int.Parse(dr["ID"].ToString());
                    dm.text = dr["TenTruong"].ToString();
                    result.Add(dm);
                }
            }
            catch (Exception ex)
            {
                log.Error("GetAll " + ex.Message);
            }

            return result;
        }

        public bool InsertOrUpdate_DM(DanhMuc item, string TenBang, int ChiNhanh)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",item.value ),
                    new SqlParameter("@Value",item.text),
                    new SqlParameter("@ChiNhanh", ChiNhanh)
                };
                int rowaff = helper.ExecuteNonQuery("sp_" + TenBang + "_InsertOrUpdate", pars);
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
                log.Error("Insert or update " + ex.Message);
                return false;
            }
        }

        public bool Delete_DM(string ID, string TenBang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_" + TenBang + "_Delete", pars);
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
                log.Error("Delete DM " + ex.Message);
                return false;
            }
        }
    }
}