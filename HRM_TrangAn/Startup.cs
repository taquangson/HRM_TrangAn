using Microsoft.Owin;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//[assembly: OwinStartup("HRM_TrangAn", typeof(HRM_TrangAn.Startup))]
namespace HRM_TrangAn
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            if (FirebaseMessaging.DefaultInstance == null)
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + @"Assets\serviceAccount.json";
                FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile(path),
                });
            }
        }
    }
}