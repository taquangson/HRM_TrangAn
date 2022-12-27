using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Quartz;
using Quartz.Impl;

namespace HRM_TrangAn.Schedule
{
    public class JobScheduler
    {
        public static IScheduler scheduler;
        private static ITrigger trigger;
        private static ITrigger trigger2;
        private static ITrigger trigger3;

        public static async void Start()
        {

            //StdSchedulerFactory factory = new StdSchedulerFactory();
            //scheduler = await factory.GetScheduler();
            scheduler = await new StdSchedulerFactory().GetScheduler();
            await scheduler.Start();


            IJobDetail job = JobBuilder.Create<GetDuLieuMCCJob>().Build();
            IJobDetail job2 = JobBuilder.Create<ReCalcChuyenDoJob>().Build();

            trigger = TriggerBuilder.Create()
                .WithIdentity("trigger1", "group1")
                 //.WithDailyTimeIntervalSchedule
                 //  (s =>
                 //     s.WithIntervalInHours(24)
                 //    .OnEveryDay()
                 //    .StartingDailyAt(TimeOfDay.HourAndMinuteOfDay(0, 0))
                 //  )
                 .StartNow()
                 //.WithSimpleSchedule(x => x
                //.WithIntervalInSeconds(10)
                //.RepeatForever())
                .WithCronSchedule("0 0/10 * * * ?")

                .Build();

            trigger2 = TriggerBuilder.Create()
                .WithDescription("EachDay_23H_ReCalcChuyenDo")
                .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(23, 0))
                .Build();

            //trigger3 = TriggerBuilder.Create()
            //    .WithDescription("EachDay_06H_ReCalcChuyenDo")
            //    .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(6, 0))
            //    .Build();



            await scheduler.ScheduleJob(job, trigger);
            await scheduler.ScheduleJob(job2, trigger2);
            //await scheduler.ScheduleJob(job2, trigger3);
        }

        public static void ReScheduleJob(ITrigger newtrigger)
        {
            scheduler.RescheduleJob(trigger.Key, newtrigger);
        }

        public static void Pause()
        {
            scheduler.PauseAll();
        }

        public static void Resume()
        {
            scheduler.ResumeAll();
        }
    }
}