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
    public class ToNhomDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ToNhomDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public ToNhomDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private ToNhomModel GetObjFromDataRow(DataRow dr)
        {
            ToNhomModel obj = new ToNhomModel();
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

        public List<ToNhomModel> GetAll()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_GetAll");
                DataTable dt = ds.Tables[0];
                List<ToNhomModel> result = new List<ToNhomModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongToNhom(model.ID);
                    model.SoLaoDong_Tong = model.SoLaoDong_TamNghi + model.SoLaoDong_HoatDong + model.SoLaoDong_DaTraDo + model.SoLaoDong_Nghi;
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ToNhomModel> GetAllDanhMuc()
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_GetAll");
                DataTable dt = ds.Tables[0];
                List<ToNhomModel> result = new List<ToNhomModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_GetAll " + ex.Message);
                return null;
            }
        }

        public List<ToNhomModel> GetAllTheoLichSuCongViec(int ID_CongViec)
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_CongViec", ID_CongViec )
                };
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_GetAllTheoLichSuCongViec", pars);
                DataTable dt = ds.Tables[0];
                List<ToNhomModel> result = new List<ToNhomModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongToNhomTheoCongViec(model.ID, ID_CongViec);
                    model.GhiChu = model.lstNhanVien.Count(x => x.CoLichSuLamViec > 0).ToString();
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_GetAllTheoLichSuCongViec " + ex.Message);
                return null;
            }
        }

        public List<ToNhomModel> GetAllTheoLichSuCongViecNgay(int ID_CongViec, DateTime Ngay)
        {
            try
            {
                NhanVienDAO nvdao = new NhanVienDAO();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_CongViec", ID_CongViec )
                };
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_GetAllTheoLichSuCongViecNgay", pars);
                DataTable dt = ds.Tables[0];
                List<ToNhomModel> result = new List<ToNhomModel>();
                int ID_DiemQuetThe = int.Parse(System.Configuration.ConfigurationManager.AppSettings["KeyPointCheckRouter2"]);
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongToNhomTheoCongViecNgay(model.ID, ID_CongViec, Ngay, ID_DiemQuetThe);
                    model.GhiChu = model.lstNhanVien.Count(x => x.CoLichSuLamViec > 0).ToString();
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_GetAllTheoLichSuCongViecNgay " + ex.Message);
                return null;
            }
        }

        public List<ToNhomModel> GetByMa(string Ma)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaToNhom", Ma ),
                };
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_ToNhom_GetByMa", pars);
                DataTable dt = ds.Tables[0];
                List<ToNhomModel> result = new List<ToNhomModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    ToNhomModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ToNhomModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongToNhom(model.ID);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_GetByMa " + ex.Message);
                return new List<ToNhomModel>();
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
                int rowaff = helper.ExecuteNonQuery("sp_ToNhom_Delete", pars);
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
                log.Error("sp_ToNhom_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_ToNhom_DeleteMulti", pars);
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
                log.Error("sp_ToNhom_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdate(ToNhomModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@MaToNhom", model.MaToNhom),
                new SqlParameter("@GhiChu", model.GhiChu),
                new SqlParameter("@TenToNhom", model.TenToNhom)
                //new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                };

                object id = helper.ExecuteScalar("sp_ToNhom_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ToNhom_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


    }
}