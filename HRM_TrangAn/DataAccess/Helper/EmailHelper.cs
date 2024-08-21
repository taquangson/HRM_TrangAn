using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using HRM_TrangAn.DataAccess.DAO;
using System.Web.Razor;
using System.Web.Razor.Generator;
using System.Web.Mvc;
using System.IO;

namespace HRM_TrangAn.DataAccess.Helper
{
    public class EmailHelper
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(EmailHelper));


        public void SendEmail(string htmlString, string Email, string subject)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress(System.Configuration.ConfigurationManager.AppSettings["EmailAccount"]);
                message.To.Add(new MailAddress(Email));
                message.Subject = subject;
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = htmlString;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;                
                smtp.Credentials = new NetworkCredential(System.Configuration.ConfigurationManager.AppSettings["EmailAccount"], System.Configuration.ConfigurationManager.AppSettings["EmailPassword"]);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }
    }
}