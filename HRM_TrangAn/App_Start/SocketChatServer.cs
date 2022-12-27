using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using HRM_TrangAn.Hubs;
using SuperWebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;

namespace HRM_TrangAn.App_Start
{
    public class SocketChatServer
    {
        private static WebSocketServer server;
        
        public class MessageJson
        {
            public int ID_TaiKhoan { get; set; }
            public string MessageContent { get; set; }
            public int BotChat { get; set; }
        }

        public static void StartServer()
        {
            server = new WebSocketServer();
            int port = 8088;
            server.Setup(port);
            server.NewSessionConnected += Server_NewSessionConnected;
            server.NewMessageReceived += Server_NewMessageReceived;
            server.NewDataReceived += Server_NewDataReceived;
            server.SessionClosed += Server_SessionClosed;
            server.Start();
        }

        public static void StopServer()
        {
            server.Stop();
        }

        private static void Server_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            new SocketChatServer().RemoveSession(0, session.SessionID);
            Console.WriteLine("Server_SessionClosed");
        }

        private static void Server_NewDataReceived(WebSocketSession session, byte[] value)
        {
            Console.WriteLine("Server_NewDataReceived");
        }

        private static void Server_NewMessageReceived(WebSocketSession session, string value)
        {
            try
            {
                JavaScriptSerializer json_serializer = new JavaScriptSerializer();
                MessageJson msg = json_serializer.Deserialize<MessageJson>(value);
                new SocketChatServer().CreateSession(msg.ID_TaiKhoan, session.SessionID);
                UserAppModel user = new TaiKhoanDAO().GetAppUserByID(msg.ID_TaiKhoan);
                TinNhanDAO tndao = new TinNhanDAO();
                TinNhanModel tn = new TinNhanModel();
                tn.DaTraLoi = 0;
                tn.DaXem = 0;
                tn.ID_TaiKhoan = msg.ID_TaiKhoan;
                tn.ID_User = user.UserName;
                tn.Loai = 0;
                tn.NoiDung = msg.MessageContent;
                TinNhanHub.updateTinNhan(tn.ID_User);
                tndao.InsertOrUpdate(tn);
            }
            catch (Exception ex)
            {
                session.Send("Error: Tin nhan khong dung dinh dang");
                log4net.ILog log = log4net.LogManager.GetLogger(typeof(SocketChatServer));
                log.Info("Error: Tin nhan khong dung dinh dang");
            }
        }

        private static void Server_NewSessionConnected(WebSocketSession session)
        {
            try
            {
                Console.WriteLine("Server_NewSessionConnected");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error");

            }
        }

        public static void Server_SendNewMessageToClient(MessageJson msg)
        {
            ChatSessionDAO csdao = new ChatSessionDAO();
            try
            {
                ChatSessionModel chatsession = csdao.GetByTaiKhoan(msg.ID_TaiKhoan);
                WebSocketSession session = server.GetAppSessionByID(chatsession.Session);
                JavaScriptSerializer json_serializer = new JavaScriptSerializer();
                session.Send(json_serializer.Serialize(msg));
            }
            catch (Exception ex)
            {

            }
            UserAppModel user = new TaiKhoanDAO().GetAppUserByID(msg.ID_TaiKhoan);
            TinNhanDAO tndao = new TinNhanDAO();
            TinNhanModel tn = new TinNhanModel();
            tn.DaTraLoi = 0;
            tn.DaXem = 0;
            tn.ID_TaiKhoan = msg.ID_TaiKhoan;
            tn.ID_User = user.UserName;
            tn.Loai = 1;
            tn.NoiDung = msg.MessageContent;
            tndao.InsertOrUpdate(tn);
        }

        private void CreateSession(int ID_TaiKhoan, string Session)
        {
            ChatSessionDAO csdao = new ChatSessionDAO();
            ChatSessionModel chatsession = csdao.GetByTaiKhoan(ID_TaiKhoan);
            chatsession.ID_TaiKhoan = ID_TaiKhoan;
            chatsession.Session = Session;
            csdao.InsertOrUpdate(chatsession);
        }

        private void RemoveSession(int ID_TaiKhoan, string Session)
        {
            ChatSessionDAO csdao = new ChatSessionDAO();
            ChatSessionModel chatsession = new ChatSessionModel();
            if (ID_TaiKhoan > 0)
                chatsession = csdao.GetByTaiKhoan(ID_TaiKhoan);
            else if (!string.IsNullOrWhiteSpace(Session))
                chatsession = csdao.GetBySesion(Session);
            csdao.Delete(chatsession.ID);
        }

        public WebSocketSession GetCurrentSessionByTaiKhoan(int ID_TaiKhoan)
        {
            string cr_session = "";
            ChatSessionDAO csdao = new ChatSessionDAO();
            ChatSessionModel chatsession = csdao.GetByTaiKhoan(ID_TaiKhoan);
            cr_session = chatsession.Session;
            return server.GetAppSessionByID(cr_session);
        }
    }
}