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
    public class File_NhanVienDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(File_NhanVienDAO));
        // log4net de ghi lai log moi khi co exception
        // Khi e de ten class vào trong typeof thì log nó sẽ ghi rõ exception bắn ra từ class nào
        private DataHelper helper;
        public File_NhanVienDAO()
        {
            helper = new DataHelper();
        }

        private File_NhanVienModel GetObjFromDataRow(DataRow dr)
        {
            File_NhanVienModel obj = new File_NhanVienModel();
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
                int rowaff = helper.ExecuteNonQuery("sp_File_NhanVien_Delete", pars);
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
                log.Error("sp_File_NhanVien_Delete " + ex.Message);
                return false;
            }
        }

        public bool DeleteFile(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_File_Delete", pars);
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
                log.Error("sp_File_Delete " + ex.Message);
                return false;
            }
        }


        public List<File_NhanVienModel> GetAllByNhanVien(int ID_NhanVien)
        {
            List<File_NhanVienModel> result = new List<File_NhanVienModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_NhanVien", ID_NhanVien)
                };
                DataSet ds = helper.ExecuteDataSet("sp_File_NhanVien_GetAllFileNhanVien", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    File_NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_File_NhanVien_GetAllFileNhanVien " + ex.Message);
                return result;
            }
        }

        public List<File_NhanVienModel> GetAllByHoSoNhanSu(int ID_HoSoNhanSu)
        {
            List<File_NhanVienModel> result = new List<File_NhanVienModel>();

            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_HoSoNhanSu", ID_HoSoNhanSu)
                };
                DataSet ds = helper.ExecuteDataSet("sp_File_NhanVien_GetAllByHoSoNhanSu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    File_NhanVienModel model = GetObjFromDataRow(dr);// Tự động chuyển datarow thành ChucDanhModel
                    result.Add(model);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_File_NhanVien_GetAllByHoSoNhanSu " + ex.Message);
                return result;
            }
        }

        public File_NhanVienModel GetByPath(string Path)
        {
            File_NhanVienModel model = new File_NhanVienModel();
            model.NgayTao = DateTime.Now;
            model.FileName = "";
            log.Error("sp_File_GetByPath " + Path);
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@Path", Path)
                };
                DataSet ds = helper.ExecuteDataSet("sp_File_GetByPath", pars);
                DataTable dt = ds.Tables[0];
                model = GetObjFromDataRow(dt.Rows[0]);// Tự động chuyển datarow thành ChucDanhModel
                return model;
            }
            catch (Exception ex)
            {
                log.Error("sp_File_GetByPath " + ex.Message);
                return model;
            }
        }

        public int Insert(int ID_NhanVien, File_NhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@FileName", model.FileName),
                new SqlParameter("@FilePath", model.FilePath),
                 new SqlParameter("@FileType", model.FileType),
                new SqlParameter("@FileStatus", model.FileStatus),
                new SqlParameter("@ID_NhanVien", ID_NhanVien),
                };

                object id = helper.ExecuteScalar("sp_File_NhanVien_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_File_NhanVien_Insert " + ex.Message);
            }

            return 0;
        }

        public int InsertFile(File_NhanVienModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@FileName", model.FileName),
                new SqlParameter("@FilePath", model.FilePath),
                new SqlParameter("@FileType", model.FileType),
                new SqlParameter("@FileStatus", model.FileStatus),
                new SqlParameter("@NgayTao", model.NgayTao)
                };

                object id = helper.ExecuteScalar("sp_File_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_File_Insert " + ex.Message);
            }

            return 0;
        }

        public int UpdateFileStatus(int ID, int Status)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID),
                new SqlParameter("@FileStatus", Status)
                };

                object id = helper.ExecuteScalar("sp_File_UpdateFileStatus", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_File_UpdateFileStatus " + ex.Message);
            }

            return 0;
        }



        public bool DeleteMultiByIDNhanVien(string ID_NhanVien)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_NhanVien",ID_NhanVien ),
                };
                int rowaff = helper.ExecuteNonQuery("sp_File_NhanVien_DeleteMultiByIDNhanVien", pars);
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
                log.Error("sp_File_NhanVien_DeleteMultiByIDNhanVien " + ex.Message);
                return false;
            }
        }
    }
}