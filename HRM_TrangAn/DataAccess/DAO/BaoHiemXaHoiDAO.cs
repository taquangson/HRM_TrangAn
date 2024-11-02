using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace HRM_TrangAn.DataAccess.DAO
{
    public class BaoHiemXaHoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(BaoHiemXaHoiDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public BaoHiemXaHoiDAO()
        {
            helper = new DataHelper();
        }

        private BaoHiemXaHoiModel GetObjFromDataRow(DataRow dr)
        {
            BaoHiemXaHoiModel obj = new BaoHiemXaHoiModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_NhanVien_BaoHiem_Delete", pars);
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
                log.Error("sp_NhanVien_BaoHiem_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_BaoHiemXaHoi_DeleteMulti", pars);
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
                log.Error("sp_BaoHiemXaHoi_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public List<BaoHiemXaHoiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_BaoHiemXaHoi_GetAll");
                DataTable dt = ds.Tables[0];
                List<BaoHiemXaHoiModel> result = new List<BaoHiemXaHoiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    BaoHiemXaHoiModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành NghiPhepModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoHiemXaHoi_GetAll " + ex.Message);
                return null;
            }
        }

        public int InsertOrUpdate(BaoHiemXaHoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID", model.ID > 0 ? model.ID : (object)DBNull.Value),
                    new SqlParameter("@MucLuongDongBaoHiem", model.MucLuongDongBaoHiem),
                    new SqlParameter("@SDLD_BHXH", model.SDLD_BHXH),
                    new SqlParameter("@SDLD_BHYT", model.SDLD_BHYT),
                    new SqlParameter("@SDLD_BHTN", model.SDLD_BHTN),
                    new SqlParameter("@SDLD_Tong", model.SDLD_Tong),
                    new SqlParameter("@SDLD_ThucTe", model.SDLD_ThucTe),
                    new SqlParameter("@NLD_BHXH", model.NLD_BHXH),
                    new SqlParameter("@NLD_BHYT", model.NLD_BHYT),
                    new SqlParameter("@NLD_BHTN", model.NLD_BHTN),
                    new SqlParameter("@NLD_Tong", model.NLD_Tong),
                    new SqlParameter("@NLD_ThucTe", model.NLD_ThucTe),
                    new SqlParameter("@Tong", model.Tong),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@MoTa", model.MoTa),
                    new SqlParameter("@GhiChu", model.GhiChu ?? (object)DBNull.Value),
                    new SqlParameter("@MoTa", model.MoTa ?? (object)DBNull.Value),
                };

                object id = helper.ExecuteScalar("sp_BaoHiemXaHoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoHiemXaHoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        /*public bool InsertOrUpdateWithHoSoNhanSu(BaoHiemXaHoiModel model)
        {
            try
            {
                List<HoSoNhanSu_BaoHiemXaHoiModel> ListBH_HS = model.lstHS;
                List<int> ListID_HS = new List<int>();
                for (int i = 0; i < ListBH_HS.Count; i++)
                {
                    ListID_HS.Add(ListBH_HS[i].ID_HoSoNhanSu);
                };
                String stringID_HoSoNhanSu = string.Join(",", ListID_HS.ToArray());
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ListID_HoSoNhanSu", stringID_HoSoNhanSu),
                    new SqlParameter("@MucLuongDongBaoHiem", model.MucLuongDongBaoHiem),
                    new SqlParameter("@TyLeDongBaoHiem", model.TyLeDongBaoHiem),
                    new SqlParameter("@ThoiGianBatDau", model.ThoiGianBatDau),
                    new SqlParameter("@ThoiGianKetThuc", model.ThoiGianKetThuc),
                    new SqlParameter("@CongTyDong", model.CongTyDong),
                    new SqlParameter("@NhanVienDong", model.NhanVienDong),
                };

                int? id = int.Parse(helper.ExecuteScalar("sp_BaoHiemXaHoi_InsertOrUpdate", pars).ToString());
                if (id != null)
                {
                    for (int i = 0; i < ListBH_HS.Count; i++)
                    {
                        ListBH_HS[i].ID_BaoHiemXaHoi = (int)id;
                    }
                    HoSoNhanSu_BaoHiemXaHoiDAO hsbhDAO = new HoSoNhanSu_BaoHiemXaHoiDAO();
                    return hsbhDAO.InsertOrUpdate(ListBH_HS);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BaoHiemXaHoi_InsertOrUpdate " + ex.Message);
            }

            return false;
        }*/
    }
}