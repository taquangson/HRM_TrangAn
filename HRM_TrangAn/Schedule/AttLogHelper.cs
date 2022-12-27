using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Hubs;
using log4net;
using Quartz.Util;
using SuperSocket.SocketEngine.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using zkemkeeper;

namespace HRM_TrangAn.Schedule
{
    public static class AttLogHelper
    {
        public const int TCP_PORT = 4370;
        private const int CONNECT_TIMEOUT = 4000;
        private const int DATA_FILE_FLAG = 1; // Log data file
        private const int RECORD_COUNT_FLAG = 6; // Log data file
        private static int iMachineNumber = 1;//In fact,when you are using the tcp/ip communication,this parameter will be ignored,that is any integer will all right.Here we use 1.
        private static readonly Random m_random = new Random();
        private static readonly string HOB_TEMP_CHAMCONG_DIR = Path.GetTempPath() + "hob_chamcong\\" + DateTime.Now.Year + "\\" + DateTime.Now.Month + "\\" + DateTime.Now.Day + "\\";

        //1 dòng dữ liệu LOG máy chấm công cố định là 16 byte
        private const int ROW_LOG_BYTE_LENGTH = 16;
        //1 dòng dữ liệu USER máy chấm công cố định là 28 byte
        private const int ROW_USER_BYTE_LENGTH = 28;

        private const string CHAMCONG_LOG_FILENAME = "extlog.dat";
        private const string CHAMCONG_USER_FILENAME = "user.dat"; //file lưu mã nhân viên - seri thẻ
        private const long MAX_SERI = 4294967295;
        private static readonly ILog log = LogManager.GetLogger(typeof(AttLogHelper));


        //return false nghĩa là dữ liệu máy chấm công có lỗi cấu trúc
        public static bool ParseLog2Datatable(ref byte[] buff, DataTable outDt)
        {
            int manv;
            DateTime ngaygio = default(DateTime);
            int startIndex = 0;
            var Today = DateTime.Now;
            DataRow row = default(DataRow);
            outDt.Clear();
            outDt.Columns.Add("manv", typeof(int));
            outDt.Columns.Add("ngaygio", typeof(DateTime));
            //1 dòng dữ liệu LOG máy chấm công cố định là 16 byte
            //buff.Length > 0 AndAlso
            //log.Info(Encoding.UTF8.GetString(buff, 0, buff.Length));
            if (buff.Length % ROW_LOG_BYTE_LENGTH == 0)
            {
                for (var r = 0; r <= (buff.Length / ROW_LOG_BYTE_LENGTH) - 1; r++)
                {
                    startIndex = ROW_LOG_BYTE_LENGTH * r;
                    manv = ReadManvFromByteArr(buff, startIndex);
                    ngaygio = ReadDateFromByteArr(buff, startIndex + 4);
                    //if (r < 10)
                    //{
                    //    log.Info(ngaygio);
                    //    log.Info(manv);
                    //}
                    if (!validDateLog(ngaygio, Today))
                    {
                        //lỗi cấu trúc file log, phải chuyển sang dùng zkem thay thế
                        return false;
                    }
                    row = outDt.NewRow();
                    row["manv"] = manv;
                    row["ngaygio"] = ngaygio;
                    outDt.Rows.Add(row);
                }
                return true;
            }
            return false;
        }

        public static List<ChamCongModel> GetAllListLogData(CZKEM axCZKEM1, string DeviceIP, int ID_DiemQuetThe)
        {
            int idwVerifyMode;
            int idwInOutMode;
            int idwYear;
            int idwMonth;
            int idwDay;
            int idwHour;
            int idwMinute;
            int idwErrorCode = 0;
            int iGLCount = 0;
            int iIndex = 0;
            int dwValue = 0;
            int idwSecond;
            int idwWorkcode = 0;
            string sdwEnrollNumber;
            List<ChamCongModel> result = new List<ChamCongModel>();
            axCZKEM1.EnableDevice(1, false);//disable the device
            if (axCZKEM1.ReadGeneralLogData(2))//read all the attendance records to the memory
            {
                while (axCZKEM1.SSR_GetGeneralLogData(iMachineNumber, out sdwEnrollNumber, out idwVerifyMode,
                    out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode))//get records from the memory
                {
                    iGLCount++;
                    ChamCongModel item = new ChamCongModel();
                    NhanVienDAO nvdao = new NhanVienDAO();
                    NhanVienModel nv = nvdao.GetByMa(sdwEnrollNumber.ToString());
                    item.EnrollNumber = sdwEnrollNumber.ToString();
                    item.VerifyMode = idwVerifyMode;
                    item.InOutMode = idwInOutMode;
                    item.WorkDate = new DateTime(idwYear, idwMonth, idwDay, idwHour, idwMinute, idwSecond);
                    item.ThoiGian = item.WorkDate;
                    item.Workcode = idwWorkcode;
                    item.DiaChiIP = DeviceIP;
                    item.ID_DiemQuetThe = ID_DiemQuetThe;
                    if (nv != null)
                    {
                        item.ID_TaiKhoan = nv.ID;
                        item.MaThuyen = nv.MaThuyen;
                    }
                    else
                    {
                        item.ID_TaiKhoan = 0;
                        item.MaThuyen = "0";
                    }

                    result.Add(item);
                    iIndex++;
                }
                if (axCZKEM1.GetDeviceStatus(2, 6, ref dwValue))
                {
                    log.Info("Records: " + dwValue.ToString());
                }
            }
            else
            {
                axCZKEM1.GetLastError(ref idwErrorCode);
            }
            axCZKEM1.ClearGLog(iMachineNumber);
            axCZKEM1.RefreshData(iMachineNumber);
            axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
            ChamCongDAO cc_dao = new ChamCongDAO();
            TuyenDoDAO dao = new TuyenDoDAO();
            ChuyenDoDAO dm_dao = new ChuyenDoDAO();
            CongLaoDongDAO clddao = new CongLaoDongDAO();
            int keypoint_tuyenchinh = int.Parse(System.Configuration.ConfigurationManager.AppSettings["KeyPointCheckRouter1"]);
            foreach (ChamCongModel i in result)
            {
                i.ID = cc_dao.Insert(i, i.EnrollNumber, 0);
                //List<TuyenDoModel> lstTuyen = dao.GetTuyenDoTheoDiemCuoi(ID_DiemQuetThe);
                List<TuyenDoModel> lstTuyen = dao.GetAll();
                //Tính chuyến đò chính
                if (lstTuyen != null && i.ID_DiemQuetThe == keypoint_tuyenchinh)
                {
                    foreach (TuyenDoModel tuyen in lstTuyen)
                    {
                        List<ChamCongModel> lstChamCong = cc_dao.GetListChamCong_PhuHopTuyen(i.WorkDate, tuyen.ThoiGianToiThieu, tuyen.ThoiGianToiDa, i.ID_TaiKhoan);
                        List<ChamCongModel> lstMatch = new List<ChamCongModel>();
                        if (lstChamCong.Count >= 3)
                        {
                            int count = 1;
                            lstMatch.Add(i);
                            foreach (TuyenDo_DiemModel td in tuyen.lstDiemTuyen)
                            {

                                if (lstChamCong.Count(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006) > 0)
                                {
                                    if (td.ID_DiemQuetThe == 2005)
                                    {
                                        count++;
                                        lstMatch.AddRange(lstChamCong.Where(x => x.ID_DiemQuetThe == 2005));
                                    }
                                    else
                                    {
                                        count++;
                                        lstMatch.Add(lstChamCong.Where(x => x.ID_DiemQuetThe == td.ID_DiemQuetThe && x.ID_DiemQuetThe != 2006).First());
                                    }
                                }
                            }
                            if (count >= 3)
                            {
                                ChuyenDoModel model = new ChuyenDoModel();
                                model.MaThuyen = i.MaThuyen;
                                model.ID_NhanVien = i.ID_TaiKhoan;
                                model.ID_TuyenDo = tuyen.ID;
                                model.NgayDi = i.WorkDate;
                                model.GhiChu = "";
                                model.IsManager = 0;
                                model.TrangThai = 1;
                                int ID_New = dm_dao.InsertOrUpdate(model);
                                if (ID_New > 0)
                                {
                                    //clddao.InsertOrUpdate(model.ID_NhanVien, 1, 1, ID_New, model.NgayDi);
                                    foreach (ChamCongModel matchItem in lstMatch)
                                    {
                                        matchItem.ID_ChuyenDo = ID_New;
                                        cc_dao.Update(matchItem);
                                    }
                                }
                            }
                        }
                    }
                }
                //Tính chuyển khách mời
            }
            return result;
        }


        //return false nghĩa là dữ liệu máy chấm công có lỗi cấu trúc
        public static bool ParseUser2Datatable(ref byte[] buff, DataTable outDt)
        {
            int startIndex = 0;
            DataRow row = default(DataRow);
            outDt.Clear();
            outDt.Columns.Add("manv", typeof(int));
            outDt.Columns.Add("masothe", typeof(long));
            outDt.Columns.Add("khoathe", typeof(bool));

            //1 dòng dữ liệu USER máy chấm công cố định là 28 byte
            //buff.Length > 0 AndAlso
            if (buff.Length % ROW_USER_BYTE_LENGTH == 0)
            {
                for (var r = 0; r <= (buff.Length / ROW_USER_BYTE_LENGTH) - 1; r++)
                {
                    startIndex = ROW_USER_BYTE_LENGTH * r;
                    row = outDt.NewRow();
                    row["manv"] = ReadManvFromByteArr(buff, startIndex);
                    row["masothe"] = ReadMasotheFromByteArr(buff, startIndex + 16);
                    row["khoathe"] = buff[startIndex + 21] == 0;

                    outDt.Rows.Add(row);
                }
                return true;
            }
            return false;
        }

        //Chuyển ngược datatable USER thành mảng Byte
        public static byte[] ConvertTbl_UserToByteArr(DataTable dt)
        {
            byte[] buff = new byte[] { };
            int r = 0;
            int startIndex = 0;
            byte b1 = 0;
            byte b2 = 0;
            int manv = 0;
            long masothe = 0;
            bool khoathe = false;
            if (dt.Rows.Count > 0)
            {
                buff = new byte[dt.Rows.Count * ROW_USER_BYTE_LENGTH - 1 + 1];
                foreach (DataRow row in dt.Rows)
                {
                    startIndex = r * ROW_USER_BYTE_LENGTH;
                    r++;

                    manv = Convert.ToInt32(row["manv"]);
                    b1 = Convert.ToByte(manv >> 0 & 0xFF);
                    b2 = Convert.ToByte(manv >> 8 & 0xFF);
                    buff[startIndex] = b1;
                    buff[startIndex + 1] = b2;
                    buff[startIndex + 24] = b1;
                    buff[startIndex + 25] = b2;

                    masothe = Convert.ToInt64(row["masothe"]);
                    buff[startIndex + 16] = Convert.ToByte(masothe >> 0 & 0xFF);
                    buff[startIndex + 17] = Convert.ToByte(masothe >> 8 & 0xFF);
                    buff[startIndex + 18] = Convert.ToByte(masothe >> 16 & 0xFF);
                    buff[startIndex + 19] = Convert.ToByte(masothe >> 24 & 0xFF);

                    khoathe = Convert.ToBoolean(row["khoathe"]);
                    buff[startIndex + 21] = Convert.ToByte(khoathe);
                }
            }
            return buff;
        }

        public static int getRecordCount(CZKEM axCZKEM1)
        {
            int result = -1;
            if (axCZKEM1 == null)
            {
                return result;
            }
            axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device
            if (!axCZKEM1.GetDeviceStatus(iMachineNumber, RECORD_COUNT_FLAG, ref result))
            {
                result = -1;
            }
            axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
            return result;
        }
        private static string genRandomFilename()
        {
            DateTime now = DateTime.Now;
            DateTime sd = new DateTime(1970, 1, 1);
            string filename = (int)now.Subtract(sd).TotalDays + "." + (int)now.TimeOfDay.TotalMilliseconds +
                "." + m_random.Next(10000, 99999) + ".data.dat";
            return filename;
        }
        public static byte[] downloadDataFile(CZKEM axCZKEM1)
        {
            if (axCZKEM1 == null)
            {
                return null;
            }
            string filename = HOB_TEMP_CHAMCONG_DIR + genRandomFilename();
            //string filename = Path.GetDirectoryName("DataMCC") + genRandomFilename();

            var path = Path.Combine("DataMCC", filename);

            log.Info(path);
            if (!Directory.Exists(HOB_TEMP_CHAMCONG_DIR))
            {
                try
                {
                    Directory.CreateDirectory(HOB_TEMP_CHAMCONG_DIR);
                }
                catch (System.Exception ex)
                {
                    log.Error(ex.Message);
                    return null;
                }
            }

            bool isSuccess = axCZKEM1.GetDataFile(iMachineNumber, DATA_FILE_FLAG, path);
            if (isSuccess)
            {
                byte[] bt = null;
                try
                {
                    bt = File.ReadAllBytes(filename);
                    //File.Delete(filename);
                }
                catch (Exception)
                {
                    log.Info(path);
                }
                return bt;
            }
            else
            {
                return null;
            }
        }

        private static bool validDateLog(DateTime testDate, DateTime today)
        {
            return today.Date >= testDate.Date && testDate > today.AddDays(-35);
        }

        private static int ReadManvFromByteArr(byte[] buff, int startIndex)
        {
            return buff[startIndex] + buff[startIndex + 1] * 256;
        }
        public static async Task<CZKEM> Connect(string ip, int port)
        {
            CZKEM axCZKEM1 = new CZKEM();
            bool success = false;
            await Task.Factory.StartNew(new Action(() =>
            {
                success = axCZKEM1.Connect_Net(ip, port);
            }));
            if (success)
                return axCZKEM1;
            else
                return null;

        }


        private static DateTime ReadDateFromByteArr(byte[] buff, int startIndex)
        {
            long dateInt = 0;
            dateInt = System.Convert.ToInt64(buff[startIndex] + buff[startIndex + 1] * 256 +
                buff[startIndex + 2] * 65536 + buff[startIndex + 3] * Convert.ToInt64(16777216));
            int Year = 0;
            int Month = 0;
            int Day = 0;
            int Hour = 0;
            int Minute = 0;
            int Second = 0;
            Second = (int)(dateInt % 60);
            dateInt /= 60;
            Minute = (int)(dateInt % 60);
            dateInt /= 60;
            Hour = (int)(dateInt % 24);
            dateInt /= 24;
            Day = (int)(dateInt % 31 + 1);
            dateInt /= 31;
            Month = (int)(dateInt % 12 + 1);
            dateInt /= 12;
            Year = System.Convert.ToInt32(dateInt + 2000);
            return new DateTime(Year, Month, Day, Hour, Minute, Second);
        }

        private static long ReadMasotheFromByteArr(byte[] buff, int startIndex)
        {
            long Masothe = System.Convert.ToInt64(buff[startIndex] + buff[startIndex + 1] * 256 +
                buff[startIndex + 2] * 65536 + buff[startIndex + 3] * Convert.ToInt64(16777216));
            return Masothe;
        }

        private static string ReadUsernameFromByteArr(byte[] buff, int startIndex)
        {
            if (buff[startIndex] == 0)
            {
                return "";
            }
            else
            {
                var nameLen = 1;
                for (var r = 1; r <= 7; r++)
                {
                    if (buff[startIndex + r] == 0)
                    {
                        break;
                    }
                    else
                    {
                        nameLen++;
                    }
                }
                return Encoding.Default.GetString(buff, startIndex, nameLen);
            }
        }

    }
}
