using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;

[assembly: OwinStartup(typeof(HRM_TrangAn.Startup))]
namespace HRM_TrangAn.Hubs
{
    public class DiemDanhHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<DiemDanhHub>();
        public static void updateDiemDanh(int ID_Lop, string Username, int Ca)
        {
            LopHocDAO lhdao = new LopHocDAO();
            LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);
            hubContext.Clients.All.pushDiemDanh(ID_Lop);
            hubContext.Clients.All.pushDesktopDiemDanh(ID_Lop, l.TenLop, Username, Ca);
        }

        public static void updateChamCong()
        {
            hubContext.Clients.All.pushChamCong();
        }
    }
}