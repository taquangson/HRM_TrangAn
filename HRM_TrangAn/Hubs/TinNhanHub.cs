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
    public class TinNhanHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<TinNhanHub>();
        public static void updateTinNhan(string DienThoai)
        {         
            hubContext.Clients.All.pushTinNhan(DienThoai);

        }
    }
}