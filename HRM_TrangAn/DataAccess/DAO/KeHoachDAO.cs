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
    public class KeHoachDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(KeHoachDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public KeHoachDAO()
        {
            helper = new DataHelper();
        }

        //Hàm trả về 1  object từ datarow truy vấn được trong database
        //Khi truy vấn từ database sẽ trả về dữ liệu dạng table chứa text, hàm này sẽ chuyển text trong table đó sang int,float,string,datetime.... trong C#
        private KeHoachModel GetObjFromDataRow(DataRow dr)
        {
            KeHoachModel obj = new KeHoachModel();
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

        public List<KeHoachModel> GetAll()
        {
            try
            {
                NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_GetAll");
                DataTable dt = ds.Tables[0];
                List<KeHoachModel> result = new List<KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành KeHoachModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongKeHoach(model.ID);
                    model.To_SoNguoiDuKien = GetTo_SoNguoi(model.ID, 0);
                    model.To_SoNguoiThucTe = GetTo_SoNguoi(model.ID, 1);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_GetAll " + ex.Message);
                return null;
            }
        }

        public KeHoachModel GetById(int ID)
        {
            try
            {
                NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_GetByID", pars);

                DataTable dt = ds.Tables[0];
                List<KeHoachModel> result = new List<KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành KeHoachModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongKeHoach(model.ID);
                    model.To_SoNguoiDuKien = GetTo_SoNguoi(model.ID, 0);
                    model.To_SoNguoiThucTe = GetTo_SoNguoi(model.ID, 1);
                    result.Add(model);
                }
                return result.FirstOrDefault();
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_GetByID " + ex.Message);
                return null;
            }
        }

        public List<KeHoachModel> GetAllByNgay(DateTime Ngay)
        {
            try
            {
                NhanVien_KeHoachDAO nvdao = new NhanVien_KeHoachDAO();
                KeHoach_FileDAO fdao = new KeHoach_FileDAO();
                ToNhom_KeHoachDAO tndao = new ToNhom_KeHoachDAO();
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@Ngay",Ngay )
                };
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_GetAllByNgay", pars);
                DataTable dt = ds.Tables[0];
                List<KeHoachModel> result = new List<KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành KeHoachModel
                    model.lstNhanVien = nvdao.GetAllNhanVienTrongKeHoach(model.ID);
                    model.lstToNhomKeHoach = tndao.GetAllByKeHoach(model.ID);
                    model.lstFile = fdao.GetAllByKeHoach(model.ID);
                    model.To_SoNguoiDuKien = GetTo_SoNguoi(model.ID, 0);
                    model.To_SoNguoiDuKien_Text = model.To_SoNguoiDuKien.Replace("</br>", ", ");
                    model.To_SoNguoiThucTe = GetTo_SoNguoi(model.ID, 1);
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_GetAll " + ex.Message);
                return null;
            }
        }

        public List<KeHoachModel> GetByChamCongNhanVien(int ID_NhanVien, DateTime Ngay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                    new SqlParameter("@Ngay",Ngay )
                };
                NhanVienDAO nvdao = new NhanVienDAO();
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_GetByChamCongNhanVien_Ngay", pars);
                DataTable dt = ds.Tables[0];
                List<KeHoachModel> result = new List<KeHoachModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    KeHoachModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành KeHoachModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_GetAll " + ex.Message);
                return null;
            }
        }

        public string GetTo_SoNguoi(int ID, int TrangThai)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                    new SqlParameter("@TrangThai",TrangThai )
                };
                DataSet ds = helper.ExecuteDataSet("sp_KeHoach_GetTo_SoLuongNhanVien", pars);
                DataTable dt = ds.Tables[0];
                string result = "";
                foreach (DataRow dr in dt.Rows)
                {
                    string s = dr[0].ToString();
                    result += s + " ";
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_GetTo_SoLuongNhanVien " + ex.Message);
                return null;
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
                int rowaff = helper.ExecuteNonQuery("sp_KeHoach_Delete", pars);
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
                log.Error("sp_KeHoach_Delete " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_KeHoach_DeleteMulti", pars);
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
                log.Error("sp_KeHoach_DeleteMulti " + ex.Message);
                return false;
            }
        }

        public int InsertOrUpdate(KeHoachModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_CongViec", model.ID_CongViec),
                    new SqlParameter("@Cong", model.Cong),
                    new SqlParameter("@TenCongViec", model.TenCongViec),
                    new SqlParameter("@MaPhieuPhanCong", model.MaPhieuPhanCong),
                    new SqlParameter("@DiaDiem", model.DiaDiem),
                    new SqlParameter("@ThoiGianDuKien", model.ThoiGianDuKien),
                    new SqlParameter("@ThoiGianThucTe", model.ThoiGianThucTe),
                    new SqlParameter("@GhiChu", model.GhiChu),
                    new SqlParameter("@NgayLamViec", model.NgayLamViec),
                    new SqlParameter("@ID_CongViecThucTe", model.ID_CongViecThucTe),
                    new SqlParameter("@CongThucTe", model.CongThucTe),
                    new SqlParameter("@TenCongViecThucTe", model.TenCongViecThucTe),
                    new SqlParameter("@SoNguoiDuKien", model.SoNguoiDuKien),
                    new SqlParameter("@SoNguoiThucTe", model.SoNguoiThucTe),
                    new SqlParameter("@ID_NguoiGiamSat", model.ID_NguoiGiamSat),
                    new SqlParameter("@NguoiGiamSat", model.NguoiGiamSat),
                    new SqlParameter("@ID_NguoiGiamSatThucTe", model.ID_NguoiGiamSatThucTe),
                    new SqlParameter("@NguoiGiamSatThucTe", model.NguoiGiamSatThucTe),
                    new SqlParameter("@ThoiGianBatDauDuKien", model.ThoiGianBatDauDuKien),
                    new SqlParameter("@ThoiGianKetThucDuKien", model.ThoiGianKetThucDuKien),
                    new SqlParameter("@ThoiGianBatDauThucTe", model.ThoiGianBatDauThucTe),
                    new SqlParameter("@ThoiGianKetThucThucTe", model.ThoiGianKetThucThucTe),
                    new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_KeHoach_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_KeHoach_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


    }
}