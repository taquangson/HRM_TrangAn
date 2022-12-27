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

    public class LopHocDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LopHocDAO));
        private DataHelper helper;
        public LopHocDAO()
        {
            helper = new DataHelper();
        }

        private LopHocModel GetObjFromDataRow(DataRow dr)
        {
            LopHocModel obj = new LopHocModel();
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

        public List<LopHocModel> GetAll_LopHoc(int ID_ChiNhanh)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetAll", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetAll " + ex.Message);
            }

            return result;
        }

        public List<KhoiModel> GetAll_Khoi()
        {
            List<KhoiModel> result = new List<KhoiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_Khoi_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    KhoiModel item = new KhoiModel();
                    item.ID = int.Parse(dr["ID"].ToString());
                    item.TenKhoi = dr["TenKhoi"].ToString();
                    result.Add(item);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_Khoi_GetAll " + ex.Message);
            }

            return result;
        }

        public LopHocModel GetById_LopHoc(int ID)
        {
            LopHocModel result = new LopHocModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetById", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result = GetObjFromDataRow(dr);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetById " + ex.Message);
            }

            return result;
        }

        public List<LopHocModel> GetByGiaoVien(int ID_GiaoVien)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            LichHocDAO lich = new LichHocDAO();
            try
            {
                SqlParameter[] pars = new SqlParameter[]{
                    new SqlParameter("@ID_GiaoVien", ID_GiaoVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetByGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    LopHocModel lop = GetObjFromDataRow(dr);
                    lop.lstLichHoc = lich.GetByLop(lop.ID);
                    result.Add(lop);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetByGiaoVien " + ex.Message);
            }

            return result;
        }

        public List<LopHocModel> GetLopChuaDangKy_ByHocSinh(int ID_HocSinh)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            LichHocDAO lich = new LichHocDAO();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetByHocSinhChuaDangKy", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    LopHocModel lop = GetObjFromDataRow(dr);
                    lop.lstLichHoc = lich.GetByLop(lop.ID);
                    result.Add(lop);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetByHocSinhChuaDangKy " + ex.Message);
            }

            return result;
        }

        

        public List<LopHocModel> GetAll_ByHocSinh(int ID_HocSinh)
        {
            List<LopHocModel> result = new List<LopHocModel>();
            LichHocDAO lich = new LichHocDAO();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HocSinh", ID_HocSinh),
                };
                DataSet ds = helper.ExecuteDataSet("sp_LopHoc_GetByHocSinh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    LopHocModel lop = GetObjFromDataRow(dr);
                    lop.lstLichHoc = lich.GetByLop(lop.ID);
                    result.Add(lop);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_GetByHocSinh " + ex.Message);
            }

            return result;
        }

        public int InsertOrUpdate(LopHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenLop", model.TenLop),
                new SqlParameter("@GiaoVien", model.GiaoVien),
                new SqlParameter("@SoDoLop", model.SoDoLop),
                new SqlParameter("@LichHoc", model.LichHoc),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@ID_Khoi", model.ID_Khoi),
                new SqlParameter("@PhongHoc", model.PhongHoc)
                };

                object id = helper.ExecuteScalar("sp_LopHoc_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int UpdateLive(int ID_Lop,int TrangThai,string Token)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@TrangThai", TrangThai),
                new SqlParameter("@Token", Token)
                };

                object id = helper.ExecuteScalar("sp_LopHoc_UpdateLive", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_UpdateLive " + ex.Message);
            }

            return 0;
        }

        public bool Insert_LichSuLive(int ID_Lop, string Token)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@Token", Token)
                };

                int rowaff = helper.ExecuteNonQuery("sp_LopHoc_LichSuLive_Insert", pars);
                if (rowaff> 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LopHoc_LichSuLive_Insert " + ex.Message);
            }

            return false;
        }

        public int InsertOrUpdateByGiaoVien(LopHocModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenLop", model.TenLop),
                new SqlParameter("@GiaoVien", model.GiaoVien),
                new SqlParameter("@SoDoLop", model.SoDoLop),
                new SqlParameter("@LichHoc", model.LichHoc)
                };

                object id = helper.ExecuteScalar("sp_LopHoc_InsertOrUpdateByGiaoVien", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TaiKhoan_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_LopHoc_Delete", pars);
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
                log.Error("sp_LopHoc_Delete " + ex.Message);
                return false;
            }
        }

        public bool PheDuyet(int ID_Lop)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Lop",ID_Lop )
                };
                int rowaff = helper.ExecuteNonQuery("sp_LopHoc_PheDuyet", pars);
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
                log.Error("sp_LopHoc_PheDuyet " + ex.Message);
                return false;
            }
        }
    }
}