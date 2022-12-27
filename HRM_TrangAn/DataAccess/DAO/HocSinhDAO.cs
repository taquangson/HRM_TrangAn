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

    public class HocSinhDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public HocSinhDAO()
        {
            helper = new DataHelper();
        }

        private HocSinhModel GetObjFromDataRow(DataRow dr)
        {
            HocSinhModel obj = new HocSinhModel();
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

        public List<HocSinhModel> GetAll_HocSinh()
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetAll " + ex.Message);
            }

            return result;
        }

        public HocSinhModel GetById(int ID)
        {
            HocSinhModel result = new HocSinhModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetByID",pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return GetObjFromDataRow(dt.Rows[0]);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetAll " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetAllBySDT(string SDT)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@SDT", SDT)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetBySDT", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    HocSinhModel hs = GetObjFromDataRow(dr);
                    if(hs.NgaySinh.Year == 1)
                    {
                        hs.NgaySinh.AddYears(1900);
                    }
                    result.Add(hs);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetBySDT " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetAll_HocSinhByChiNhanh(int ID_ChiNhanh)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_ChiNhanh", ID_ChiNhanh)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetAllByChiNhanh", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetAll " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetByLop_HocSinh(int ID_Lop)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetByLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetByLop " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetByBoLocTinNhan(int ID_Lop, int NamSinh, string DienThoai, int Loai)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop),
                new SqlParameter("@NamSinh", NamSinh),
                new SqlParameter("@DienThoai", DienThoai),
                new SqlParameter("@Loai", Loai)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetByBoLocGuiTin", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetByBoLocGuiTin " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetNgoaiLop_HocSinh(int ID_Lop)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetAllNgoaiLop", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetAllNgoaiLop " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetByGiaoVien_HocSinh(int ID_GiaoVien)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_GiaoVien", ID_GiaoVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_GetByGiaoVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_GetByGiaoVien " + ex.Message);
            }

            return result;
        }

        public List<HocSinhModel> GetByLop_HocSinh_HocDuoi(int ID_Lop)
        {
            List<HocSinhModel> result = new List<HocSinhModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_Lop", ID_Lop)
                };
                DataSet ds = helper.ExecuteDataSet("sp_HocSinh_PhieuHocDuoi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    HocSinhModel m = GetObjFromDataRow(dr);
                    m.IsHocDuoi = true;
                    result.Add(m);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_HocSinh_PhieuHocDuoi " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(HocSinhModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@DiaChi", model.DiaChi),
                new SqlParameter("@DienThoai1", model.DienThoai1),
                new SqlParameter("@DienThoai2", model.DienThoai2),
                new SqlParameter("@DienThoai3", model.DienThoai3),
                new SqlParameter("@DienThoaiMacDinh", model.DienThoaiMacDinh),
                new SqlParameter("@GioiTinh", model.GioiTinh),
                new SqlParameter("@ID_Truong", model.ID_Truong),
                new SqlParameter("@NgaySinh", ((model.NgaySinh.Year == 1 || model.NgaySinh == null) ? (object)DBNull.Value : model.NgaySinh)),
                new SqlParameter("@PhuHuynh", model.PhuHuynh),
                new SqlParameter("@TenHocSinh", model.TenHocSinh),
                new SqlParameter("@ID_ChiNhanh", model.ID_ChiNhanh),
                new SqlParameter("@AnhDaiDien", model.AnhDaiDien)
                };

                object id = helper.ExecuteScalar("sp_HocSinh_InsertOrUpdate", pars);
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
                int rowaff = helper.ExecuteNonQuery("sp_HocSinh_Delete", pars);
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
                log.Error("sp_HocSinh_Delete " + ex.Message);
                return false;
            }
        }
    }
}