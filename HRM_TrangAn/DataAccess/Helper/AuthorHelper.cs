using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using HRM_TrangAn.Helper;
namespace HRM_TrangAn.DataAccess.Helper
{
    public static class AuthorHelper
    {
        public static UserAppModel checkAuthorization()
        {
            try
            {
                //get token string from Headers Request
                string authHeader = HttpContext.Current.Request.Headers["Authorization"];
                //decode token string
                var token = new JwtSecurityToken(jwtEncodedString: authHeader);
                string username = token.Claims.First(c => c.Type == "Username").Value;
                string Imei = token.Claims.First(c => c.Type == "Imei").Value;
                string Device = token.Claims.First(c => c.Type == "Device").Value;

                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                UserAppModel tk = tk_dao.GetAppUserInfoByName(username);
                if (
                    (tk.Current_Device == StringHelper.RemoveVietNameseSign(Device.Trim().Replace(" ", "_")) || tk.Current_Device == Device)
                    && tk.Current_Imei == Imei
                    )
                {
                    return tk;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }

        }
    }
}