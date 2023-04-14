using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Hubs;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web;
using zkemkeeper;

namespace HRM_TrangAn.Schedule
{
    public class ProcessMCC
    {

        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ProcessMCC));

        public async Task<bool> MayChamCong_GetDataToDB()
        {
            DiemQuetTheDAO dao = new DiemQuetTheDAO();
            MayChamCong_DiemQuetTheDAO dqtdao = new MayChamCong_DiemQuetTheDAO();
            List<DiemQuetTheModel> list = dao.GetAll().Where(x => x.TrangThai == 1).ToList();
            foreach (DiemQuetTheModel d in list)
            {
                List<MayChamCong_DiemQuetTheModel> lstMCC = dqtdao.GetAllByDiemQuetThe(d.ID);
                foreach (MayChamCong_DiemQuetTheModel dqt in lstMCC)
                {
                    await GetData(dqt.DiaChiIP, int.Parse(dqt.Port), d.ID, dqt.ID_MayChamCong);
                }
            }
            DiemDanhHub.updateChamCong();
            return true;
        }

        public async Task<DataTable> GetData(string deviceIp, int port, int ID_May, int ID_MCC)
        {
            CZKEM izkem = await AttLogHelper.Connect(deviceIp, port);
            LichSuKetNoiMCCDAO lskndao = new LichSuKetNoiMCCDAO();
            LichSuKetNoiMCCModel kn = new LichSuKetNoiMCCModel();
            kn.ID_MayChamCong = ID_MCC;
            kn.ThoiGianKetNoi = DateTime.Now;
            var dt = new DataTable();

            if (izkem != null)
            {
                kn.TrangThaiKetNoi = 1;
                kn.GhiChu = "";
                int recordCount = AttLogHelper.getRecordCount(izkem);
                if (recordCount <= 0)
                {
                    log.Info(deviceIp + ":" + port + " : Máy không có dữ liệu");
                }
                else if (recordCount > 20000)
                {
                    log.Info(deviceIp + ":" + port + ": Máy chưa clear dữ liệu");
                }
                else
                {
                    log.Info(deviceIp + ":" + port + " : Đã kết nối. Đang tải " + recordCount + " row");
                    byte[] data = AttLogHelper.downloadDataFile(izkem);
                    //AttLogHelper.GetAllListLogData(izkem, deviceIp, ID_May);
                    AttLogHelper.GetAllListLogDataV2(izkem, deviceIp, ID_May);
                    izkem.Disconnect();
                    //if (data != null)
                    //{

                    //    if (AttLogHelper.ParseLog2Datatable(ref data, dt))
                    //    {
                    //        log.Info("Tìm thấy " + dt.Rows.Count + " dòng");
                    //    }

                    //}
                    //else
                    //{
                    //    log.Info("Tải file chấm công thất bại");
                    //}
                }
            }
            else
            {
                kn.TrangThaiKetNoi = 0;
                kn.GhiChu = "Lỗi kết nối";
                log.Info(deviceIp + ":" + port + " : Lỗi kết nối. Thử lại sau.");
                
            }
            lskndao.Insert(kn);
            return dt;
        }
    }
}