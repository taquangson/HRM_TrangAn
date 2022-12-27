using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using Quartz;

namespace HRM_TrangAn.Schedule
{
    public class GetDuLieuMCCJob : IJob
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetDuLieuMCCJob));
        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                log.Info("GetDuLieuMCCJob - Execute: Run script!");
                ProcessMCC process = new ProcessMCC();
                await process.MayChamCong_GetDataToDB();
            }
            catch (Exception ex)
            {
                log.Error("GetDuLieuMCCJob - Execute: " + ex.Message);
                throw new NotImplementedException();
            }
        }

    }
}