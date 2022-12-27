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
    public class ReCalcChuyenDoJob : IJob
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ReCalcChuyenDoJob));
        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                log.Info("ReCalcChuyenDoJob - Execute: Run script!");
                ProcessAutoTinhChuyen process = new ProcessAutoTinhChuyen();
                await process.AutoTinhChuyen();
            }
            catch (Exception ex)
            {
                log.Error("ReCalcChuyenDoJob - Execute: " + ex.Message);
                throw new NotImplementedException();
            }
        }

    }
}