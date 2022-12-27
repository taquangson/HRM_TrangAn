using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HRM_TrangAn.App_Start;
using HRM_TrangAn.DataAccess.DAO;
using HRM_TrangAn.DataAccess.Models;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using HRM_TrangAn.DataAccess.Helper;
using HRM_TrangAn.Hubs;
using System.Threading.Tasks;
using System.IO;
using System.Web.Script.Serialization;
using System.Web;
using static HRM_TrangAn.DataAccess.DAO.BaoCaoDAO;

namespace HRM_TrangAn.Controllers
{
    [RoutePrefix("api/appdata")]
    public class AppController : ApiController
    {

        [HttpPost]
        [Route("getToken")]
        public HttpResponseMessage GetToken([FromBody] UserAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");

            try
            {
                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                if (tk_dao.CheckLogin_App(model.UserName, model.Password, model.Current_Imei, Helper.StringHelper.RemoveVietNameseSign(model.Current_Device.Trim().Replace(" ", "_")), model.NotifyID))
                {
                    UserAppModel tk = tk_dao.GetAppUserInfoByName(model.UserName);
                    if (tk == null)
                    {
                        response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Thông tin tài khoản không đúng.");
                    }
                    else
                    {
                        string token = createToken(model.UserName, model.Current_Imei, Helper.StringHelper.RemoveVietNameseSign(model.Current_Device.Trim().Replace(" ", "_")));
                        TokenResult result = new TokenResult();
                        result.token = token;
                        result.UserInfo = tk;
                        response = Request.CreateResponse(HttpStatusCode.OK, result);
                    }
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Thông tin tài khoản không đúng.");
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }

            return response;
        }

        [HttpPost]
        [Route("checklogin")]
        public HttpResponseMessage checklogin([FromBody] UserAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                if (tk_dao.CheckLogin_App(model.UserName, model.Password, model.Current_Imei, Helper.StringHelper.RemoveVietNameseSign(model.Current_Device.Trim().Replace(" ", "_")), model.NotifyID))
                    response = Request.CreateResponse(HttpStatusCode.OK, new { loginSuccess = true });
                else
                    response = Request.CreateResponse(HttpStatusCode.NotModified, new { loginSuccess = false });
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        public class TokenResult
        {
            public string token { get; set; }
            public UserAppModel UserInfo { get; set; }
        }

        private string createToken(string userName, string imei, string device)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(7);

            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "duonghoa"),
                new Claim("Username", userName),
                new Claim("Imei", imei),
                new Claim("Device", device)
            });

            const string sec = "taquangson@12345";
            //var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: "sontq", audience: "sontq",
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        [HttpGet]
        [Route("getAllHocSinhByTaikhoan")]
        public HttpResponseMessage getAllHocSinhByTaikhoan()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    HocSinhDAO hsdao = new HocSinhDAO();
                    List<HocSinhModel> result = hsdao.GetAllBySDT(userinfo.UserName);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllHocSinhByTenTaikhoan")]
        public HttpResponseMessage getAllHocSinhByTenTaikhoan([FromUri]string UserName)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                HocSinhDAO hsdao = new HocSinhDAO();
                List<HocSinhModel> result = hsdao.GetAllBySDT(UserName);
                response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("capNhatDuLieuHocSinh")]
        public HttpResponseMessage capNhatDuLieuHocSinh([FromBody] HocSinhModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    HocSinhDAO hsdao = new HocSinhDAO();
                    HocSinhModel item = hsdao.GetById(model.ID);
                    item.AnhDaiDien = model.AnhDaiDien;
                    item.DiaChi = model.DiaChi;
                    item.GioiTinh = model.GioiTinh;
                    item.NgaySinh = model.NgaySinh;
                    int newid = hsdao.InsertOrUpdate(item);
                    if (newid > 0)
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Cập nhật thông tin thành công" });
                    else
                        response = Request.CreateResponse(HttpStatusCode.NotModified, new { success = false, msg = "Có lỗi xảy ra, vui lòng thử lại!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        [HttpGet]
        [Route("getAllLopByHocSinh")]
        public HttpResponseMessage getAllLopByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<LopHocModel> result = hsdao.GetAll_ByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLopChuaHocByHocSinh")]
        public HttpResponseMessage getAllLopChuaHocByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<LopHocModel> result = hsdao.GetLopChuaDangKy_ByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllDanhyMucKhoi")]
        public HttpResponseMessage getAllDanhyMucKhoi()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<KhoiModel> result = hsdao.GetAll_Khoi();
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllDanhyMucCa")]
        public HttpResponseMessage getAllDanhyMucCa()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    CaHocDAO hsdao = new CaHocDAO();
                    List<CaHocModel> result = hsdao.GetAll();
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLichTrongNgayByGiaoVien")]
        public HttpResponseMessage getAllLichTrongNgayByGiaoVien()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    TaiKhoanModel userinfor = tkdao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                    List<LopHocModel> lstlop = hsdao.GetByGiaoVien(userinfor.ID);
                    List<LopHocModel> result = new List<LopHocModel>();
                    foreach (LopHocModel lop in lstlop)
                    {
                        LichHocModel lich = lop.lstLichHoc.Where(x => (x.Thu - 1) == (int)DateTime.Now.DayOfWeek).FirstOrDefault();
                        if (lich != null)
                        {
                            lop.LichHoc = lich.TenCa;
                            lop.lstLichHoc = lop.lstLichHoc.Where(x => (x.Thu - 1) == (int)DateTime.Now.DayOfWeek).ToList();
                            result.Add(lop);
                        }
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result.OrderBy(x => x.LichHoc), message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLichTrongNgayByHocSinh")]
        public HttpResponseMessage getAllLichTrongNgayByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    GiaoAnDAO gadao = new GiaoAnDAO();
                    List<LopHocModel> lstlop = hsdao.GetAll_ByHocSinh(ID_HocSinh);
                    List<LopHocModel> result = new List<LopHocModel>();
                    foreach (LopHocModel lop in lstlop)
                    {
                        LichHocModel lich = lop.lstLichHoc.Where(x => (x.Thu - 1) == (int)DateTime.Now.DayOfWeek).FirstOrDefault();
                        if (lich != null)
                        {
                            lop.GiaoAn = gadao.GetByLichHoc(lich.ID_Lop, lich.Ca, DateTime.Now);
                            lop.LichHoc = lich.TenCa;
                            result.Add(lop);
                        }
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result.OrderBy(x => x.LichHoc), message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getalllop")]
        public HttpResponseMessage getalllop()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    TaiKhoanModel userinfor = tkdao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                    List<LopHocModel> result = new List<LopHocModel>();
                    if (userinfor.Role == 3)
                    {
                        result = hsdao.GetByGiaoVien(userinfor.ID);
                    }
                    else if (userinfor.Role == 2)
                    {
                        result = hsdao.GetAll_LopHoc(userinfor.ID_ChiNhanh);
                    }
                    else if (userinfor.Role == 1)
                    {
                        result = hsdao.GetAll_LopHoc(0);
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getAllLopChuaDangKyByHocSinh")]
        public HttpResponseMessage getAllLopChuaDangKyByHocSinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LopHocDAO hsdao = new LopHocDAO();
                    List<LopHocModel> result = hsdao.GetLopChuaDangKy_ByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }
        public List<DateTime> SortDescending(List<DateTime> list)
        {
            list.Sort((a, b) => b.CompareTo(a));
            return list;
        }


        [HttpGet]
        [Route("thongkesobuoihoc")]
        public HttpResponseMessage getLichHocByLop([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    BaoCaoDAO bcdao = new BaoCaoDAO();
                    List<BaoCaoSoBuoiHoc_HocSinh_ThangModel> data = bcdao.GetBaoCaoSoBuoiHoc_HocSinh_Thang(ID_HocSinh, new DateTime(2019, 1, 1), DateTime.Now.AddMonths(1));
                    List<BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate> result = new List<BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate>();
                    List<DateTime> dateTimes = new List<DateTime>();
                    foreach (BaoCaoSoBuoiHoc_HocSinh_ThangModel x in data)
                    {
                        DateTime d = new DateTime(x.Nam, x.Thang, 1);
                        if (dateTimes.IndexOf(d) < 0)
                        {
                            dateTimes.Add(d);
                        }
                    }
                    dateTimes = SortDescending(dateTimes);
                    foreach (DateTime date in dateTimes)
                    {
                        BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate item = new BaoCaoSoBuoiHoc_HocSinh_ThangModel_ByDate();
                        item.Nam = date.Year;
                        item.Thang = date.Month;
                        item.data = data.Where(x => x.Nam == item.Nam && x.Thang == item.Thang).ToList();
                        item.NoHocPhi = item.data.Find(x => x.SoBuoiDaMua < x.SoBuoiHoc) != null;
                        result.Add(item);
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getLichHocByLop")]
        public HttpResponseMessage thongkesobuoihoc([FromUri] int ID_Lop)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LichHocDAO lhdao = new LichHocDAO();
                    List<LichHocModel> result = lhdao.GetByLop(ID_Lop);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("dangkyhoc")]
        public HttpResponseMessage dangkyhoc([FromBody] DangKyHocModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    DangKyHocDAO tk_dao = new DangKyHocDAO();
                    model.User_DangKy = userinfo.UserName;
                    model.TrangThai = 1;
                    if (tk_dao.InsertOrUpdate(model) > 0)
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Đăng ký học thành công. Bộ phận văn phòng sẽ liên hệ trực tiếp với quý phụ huynh để hoàn tất thủ tục! Xin chân thành cảm ơn!" });
                    else
                        response = Request.CreateResponse(HttpStatusCode.NotModified, new { success = false, msg = "Đăng ký học không thành công. Vui lòng liên hệ với văn phòng trung tâm!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        [HttpPost]
        [Route("dangkyevent")]
        public HttpResponseMessage dangkyevent([FromUri] int ID)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    DangKyEventDAO dao = new DangKyEventDAO();
                    DangKyEventModel model = new DangKyEventModel();
                    model.ID_TaiKhoan = ID;
                    if (dao.Insert(model))
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Đăng ký thành công. Bộ phận văn phòng sẽ liên hệ trực tiếp với quý phụ huynh để hoàn tất thủ tục! Xin chân thành cảm ơn!" });
                    else
                        response = Request.CreateResponse(HttpStatusCode.NotModified, new { success = false, msg = "Đăng ký không thành công. Vui lòng liên hệ với văn phòng trung tâm!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        public class ChangePassModel
        {
            public string TenDayDu { get; set; }
            public string NewPass { get; set; }
            public string OldPass { get; set; }
        }

        [HttpPost]
        [Route("doimatkhau")]
        public HttpResponseMessage doimatkhau([FromBody] ChangePassModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                    UserAppModel tk = tk_dao.GetAppUserInfoByName(userinfo.UserName);
                    if (tk_dao.CheckLogin_AppForChangePass(userinfo.UserName, model.OldPass))
                    {
                        tk_dao.ChangeAppUserPassword(userinfo.UserName, model.NewPass);
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Đổi mật khẩu thành công!" });
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = false, msg = "Mật khẩu cũ không đúng. Vui lòng kiểm tra lại!" });
                    }

                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("xinnghiphep")]
        public HttpResponseMessage xinnghiphep([FromBody] XinNghiPhepAppModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    XinNghiPhepDAO np_dao = new XinNghiPhepDAO();
                    foreach (DateTime ngaynghi in model.lstNgayNghi)
                    {
                        XinNghiPhepModel item = new XinNghiPhepModel();
                        item.NgayNghi = ngaynghi;
                        item.LyDoNghi = model.LyDo;
                        item.ID_HocSinh = model.ID_HocSinh;
                        item.TrangThai = 0;
                        np_dao.InsertOrUpdate(item);
                    }
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "Cảm ơn quý phụ huynh đã thông báo lịch nghỉ phép!" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("danhsachcahoc")]
        public HttpResponseMessage danhsachcahoc()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    CaHocDAO dm_dao = new CaHocDAO();
                    List<CaHocModel> dt = dm_dao.GetAll();
                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = dt, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("danhsachhocsinhtronglop")]
        public HttpResponseMessage danhsachhocsinhtronglop([FromUri] int? ID_Lop, int Ca)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    HocSinhDAO hsdao = new HocSinhDAO();
                    DiemDanhDAO ddao = new DiemDanhDAO();
                    PhieuHocDAO phdao = new PhieuHocDAO();
                    CaHocModel ca = new CaHocDAO().GetByID(Ca);
                    int quagio = 1;
                    List<HocSinhModel> lhs = new List<HocSinhModel>();
                    if (ID_Lop != null)
                    {
                        lhs.AddRange(hsdao.GetByLop_HocSinh((int)ID_Lop));

                        DateTime quagiodiemdanh = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(2, 0, 0);
                        if (DateTime.Compare(DateTime.Now, quagiodiemdanh) < 0)
                        {
                            quagio = 0;
                        }
                        foreach (HocSinhModel hs in lhs)
                        {
                            try
                            {
                                DiemDanhModel dd = ddao.GetByHocSinh_Ngay((int)ID_Lop, hs.ID, DateTime.Now, Ca);
                                List<PhieuHocModel> lph = phdao.GetByHocSinh_Thang(hs.ID, DateTime.Now.Month);
                                if (lph.Find(x => x.ID_Lop == ID_Lop) != null)
                                {
                                    hs.DaMuaPhieu = true;
                                }
                                else
                                {
                                    hs.DaMuaPhieu = false;
                                }
                                hs.ID_DiemDanh = dd.ID;
                                hs.CoPhep = dd.CoPhep;
                                hs.QuaGioDiemDanh = quagio;
                                hs.YeuCauTraoDoi = dd.YeuCauTraoDoi;
                                hs.GhiChu = dd.GhiChu;
                                hs.Diem = dd.Diem > 0 ? (double?)dd.Diem : null;
                            }
                            catch (Exception ex)
                            {

                            }
                        }
                    }

                    response = Request.CreateResponse(HttpStatusCode.Created, new { data = lhs, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("diemdanhhocsinh")]
        public HttpResponseMessage diemdanhhocsinh([FromBody] DiemDanhModel d)
        {
            long iddiemdanh = 0;
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    DiemDanhDAO ddao = new DiemDanhDAO();
                    DateTime batdau = DateTime.Now;
                    CaHocDAO chdao = new CaHocDAO();
                    CaHocModel ca = chdao.GetByID(d.Ca);
                    d.ThoiGianVaoLop = DateTime.Now.Date + ca.GioBatDau + new TimeSpan(0, 30, 0);
                    if (DateTime.Compare(d.ThoiGianVaoLop, DateTime.Now) > 0)
                    {
                        d.ThoiGianVaoLop = DateTime.Now;
                    }
                    PhieuHocDAO phd = new PhieuHocDAO();
                    TaiKhoanDAO tkdao = new TaiKhoanDAO();
                    TaiKhoanModel tk = tkdao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                    d.ID_NhanVien = tk.ID;
                    DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(d.ID_Lop, d.ID_HocSinh, batdau, d.Ca);
                    d.ID = diemdanhcu.ID;
                    PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, DateTime.Now.Month, DateTime.Now.Year, d.HocDuoi);
                    if (diemdanhcu.ID == 0)
                    {
                        iddiemdanh = ddao.InsertOrUpdate(d);
                        if (iddiemdanh > 0)
                        {
                            DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                            if (d.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                    else
                    {
                        if (diemdanhcu.CoPhep == d.CoPhep)
                        {
                            if (ddao.Delete(diemdanhcu.ID))
                            {
                                DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                                if (diemdanhcu.CoPhep != 1)
                                {
                                    if (phmodel.ID > 0)
                                    {
                                        phmodel.SoBuoiDaHoc--;
                                        phd.InsertOrUpdate(phmodel);
                                    }
                                }
                            }
                        }
                        else
                        {
                            iddiemdanh = ddao.InsertOrUpdate(d);
                            if (iddiemdanh > 0)
                            {
                                DiemDanhHub.updateDiemDanh(d.ID_Lop, tk.TenDayDu, d.Ca);
                                if (d.CoPhep == 1)
                                {
                                    if (diemdanhcu.CoPhep != 1)
                                    {
                                        if (phmodel.ID > 0)
                                        {
                                            phmodel.SoBuoiDaHoc--;
                                            phd.InsertOrUpdate(phmodel);
                                        }
                                    }
                                }
                                else if (d.CoPhep != 1)
                                {
                                    if (diemdanhcu.CoPhep == 1)
                                    {
                                        if (phmodel.ID > 0)
                                        {
                                            phmodel.SoBuoiDaHoc++;
                                            phd.InsertOrUpdate(phmodel);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, msg = "", data = iddiemdanh });
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        public class HttpPostedFile
        {
            public HttpPostedFile(string name, string filename, byte[] file)
            {
                //Property Assignment
            }
            public string Name { get; private set; }
            public string Filename { get; private set; }
            public byte[] File { private set; get; }
        }

        [HttpPost]
        [Route("uploadanhdiemdanh")]
        public async Task<HttpResponseMessage> uploadanhdiemdanh()
        {
            log4net.ILog log = log4net.LogManager.GetLogger(typeof(AppController));
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                log.Info("Đoc file từ request");
                var files = new Dictionary<string, HttpPostedFile>(StringComparer.InvariantCultureIgnoreCase);
                log.Info("Lấy file");
                //var fileNameParam = provider.Contents[0].Headers.ContentDisposition.Parameters
                //    .FirstOrDefault(p => p.Name.ToLower() == "filename");
                //log.Info("Lấy tên file : " + fileNameParam);
                var fileNameParam = await provider.Contents[1].ReadAsStringAsync();
                string fileName = (fileNameParam == null) ? "" : fileNameParam.Trim('"');
                fileName = DateTime.Now.ToString("ddMMyyyyhhmmssss") + fileNameParam;
                log.Info("Tạo filename : " + fileName);
                byte[] file = await provider.Contents[0].ReadAsByteArrayAsync();
                log.Info("Đọc byte : " + file.Length);
                string filePath = AppDomain.CurrentDomain.BaseDirectory + @"Images\AnhDiemDanh" + @"\" + fileName;
                log.Info("Filepath: " + filePath);
                File.WriteAllBytes(filePath, file);
                log.Info("Ghi file");
                File.WriteAllBytes(filePath, file);
                string result = "/Images/" + "AnhDiemDanh/" + fileName;
                return Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" }); ;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("uploadanhhocsinh")]
        public async Task<HttpResponseMessage> uploadanhhocsinh()
        {
            log4net.ILog log = log4net.LogManager.GetLogger(typeof(AppController));
            try
            {
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                log.Info("Đoc file từ request");
                var files = new Dictionary<string, HttpPostedFile>(StringComparer.InvariantCultureIgnoreCase);
                log.Info("Lấy file");
                //var fileNameParam = provider.Contents[0].Headers.ContentDisposition.Parameters
                //    .FirstOrDefault(p => p.Name.ToLower() == "filename");
                //log.Info("Lấy tên file : " + fileNameParam);
                var fileNameParam = await provider.Contents[1].ReadAsStringAsync();
                string fileName = (fileNameParam == null) ? "" : fileNameParam.Trim('"');
                fileName = DateTime.Now.ToString("ddMMyyyyhhmmssss") + fileNameParam;
                log.Info("Tạo filename : " + fileName);
                byte[] file = await provider.Contents[0].ReadAsByteArrayAsync();
                log.Info("Đọc byte : " + file.Length);
                string filePath = AppDomain.CurrentDomain.BaseDirectory + @"Images\AnhHocSinh" + @"\" + fileName;
                log.Info("Filepath: " + filePath);
                File.WriteAllBytes(filePath, file);
                log.Info("Ghi file");
                File.WriteAllBytes(filePath, file);
                string result = "/Images/" + "AnhHocSinh/" + fileName;
                return Request.CreateResponse(HttpStatusCode.Created, new { data = result, message = "OK" }); ;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public class AnhDiemDanh
        {
            public string FilePath { get; set; }
            public int ID_LopHoc { get; set; }
            public int ID_CaHoc { get; set; }
            public DateTime Ngay { get; set; }
        }

        [HttpPost]
        [Route("capnhatanhdiemdanh")]
        public HttpResponseMessage capnhatanhdiemdanh([FromBody] AnhDiemDanh model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    AnhDiemDanhModel item = new AnhDiemDanhModel();
                    item.DuongDan = model.FilePath;
                    item.ID_LopHoc = model.ID_LopHoc;
                    item.ID_CaHoc = model.ID_CaHoc;
                    item.NgayTao = model.Ngay;
                    AnhDiemDanhDAO dao = new AnhDiemDanhDAO();
                    dao.InsertOrUpdate(item);
                    response = Request.CreateResponse(HttpStatusCode.Created, new { success = true, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("capnhatghichudiemdanh")]
        public HttpResponseMessage capnhatghichudiemdanh([FromBody] DiemDanhModel d)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    try
                    {
                        DiemDanhDAO ddao = new DiemDanhDAO();
                        DiemDanhModel diemdanhcu = ddao.GetById(d.ID);
                        if (!string.IsNullOrWhiteSpace(d.GhiChu))
                        {
                            diemdanhcu.GhiChu = d.GhiChu;
                        }
                        else
                        {
                            diemdanhcu.GhiChu = "";
                        }
                        diemdanhcu.Diem = d.Diem;
                        diemdanhcu.YeuCauTraoDoi = d.YeuCauTraoDoi;
                        ddao.InsertOrUpdate(diemdanhcu);
                    }
                    catch (Exception ex)
                    {
                    }
                    response = Request.CreateResponse(HttpStatusCode.Created, new { success = true, message = "OK" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        [HttpGet]
        [Route("getalltinnhan")]
        public HttpResponseMessage getalltinnhan([FromUri]int Page)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    TinNhanDAO tndao = new TinNhanDAO();
                    List<TinNhanModel> data = tndao.GetByUser(userinfo.UserName);
                    List<TinNhanModel> result = data.Skip(Page * 50).Take(50).ToList();
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = result });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getallchatbot")]
        public HttpResponseMessage getallchatbot()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    ChatBotDAO tndao = new ChatBotDAO();
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = tndao.GetAll() });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("guitinnhan")]
        public HttpResponseMessage guitinnhan(TinNhanModel model)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                    TinNhanDAO tndao = new TinNhanDAO();
                    if (tndao.InsertOrUpdate(model) > 0)
                    {
                        TinNhanHub.updateTinNhan(model.ID_User);
                        response = Request.CreateResponse(HttpStatusCode.Created, new { success = true, message = "OK" });
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.Created, new { success = false, message = "Error" });
                    }
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getallthongbaobyuser")]
        public HttpResponseMessage getallthongbaobyuser([FromUri] string ThongBao)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    ThongBaoAppDAO tndao = new ThongBaoAppDAO();
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = tndao.GetByUser(userinfo.UserName, ThongBao) });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }
        [HttpGet]
        [Route("countthongbaochuadocbyuser")]
        public HttpResponseMessage countthongbaochuadocbyuser()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    ThongBaoAppDAO tndao = new ThongBaoAppDAO();
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = tndao.CountUnReadByUser(userinfo.UserName) });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("updatethongbao")]
        public HttpResponseMessage updatethongbao([FromUri] int ID, int TrangThai)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response = Request.CreateResponse(HttpStatusCode.NotFound, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    ThongBaoAppDAO bktdao = new ThongBaoAppDAO();
                    ThongBaoAppModel item = bktdao.GetByID(ID);
                    item.TrangThai = TrangThai;
                    bktdao.InsertOrUpdate(item);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Lưu thông báo thành công" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }


        [HttpPost]
        [Route("themsuagiaoan")]
        public HttpResponseMessage themsuagiaoan([FromBody] GiaoAnModel ga)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    GiaoAnDAO gadao = new GiaoAnDAO();
                    GiaoAnModel item = new GiaoAnModel();
                    if (ga.ID > 0)
                    {
                        item = gadao.GetByLichHoc(ga.ID_Lop, ga.ID_Ca, ga.NgayHoc);
                        item.BaiTap = ga.BaiTap;
                        item.TenBai = ga.TenBai;
                    }
                    else
                    {
                        item = ga;
                    }
                    item.ID_NhanVien = userinfo.ID;
                    if (gadao.InsertOrUpdate(ga))
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, message = "Cập nhật bài giảng thành công" });
                    else
                        response = Request.CreateResponse(HttpStatusCode.OK, new { success = false, message = "Cập nhật bài giảng thất bại" });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("getlichhocbylopforapp")]
        public HttpResponseMessage getlichhocbylopforapp([FromUri] int ID_Lop, DateTime TuNgay, DateTime DenNgay)
        {

            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();

                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LichHocDAO lhdao = new LichHocDAO();
                    List<LichHocModel> lst = new List<LichHocModel>();
                    lst = lhdao.GetLichAppByLop(ID_Lop, TuNgay, DenNgay);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = lst });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpPost]
        [Route("getlichhocbygiaovienforapp")]
        public HttpResponseMessage getlichhocbygiaovienforapp([FromUri] DateTime TuNgay, DateTime DenNgay)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();
                TaiKhoanDAO tk_dao = new TaiKhoanDAO();
                TaiKhoanModel user = tk_dao.GetByTenTaiKhoanOrEmail(userinfo.UserName);
                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LichHocDAO lhdao = new LichHocDAO();
                    List<LichHocModel> lst = new List<LichHocModel>();
                    lst = lhdao.GetLichAppByGiaoVien(user.ID, TuNgay, DenNgay);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = lst });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getlichhocbyhocsinhforapp")]
        public HttpResponseMessage getlichhocbyhocsinhforapp([FromUri] int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();
                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    LichHocDAO lhdao = new LichHocDAO();
                    List<LichHocModel> lst = new List<LichHocModel>();
                    lst = lhdao.GetLichByHocSinh(ID_HocSinh, TuNgay, DenNgay);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = lst });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }

        [HttpGet]
        [Route("getdonnghihocbyhocsinh")]
        public HttpResponseMessage getdonnghihocbyhocsinh([FromUri] int ID_HocSinh)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                UserAppModel userinfo = AuthorHelper.checkAuthorization();
                if (userinfo == null)
                {
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, "Mã bảo mật không đúng, vui lòng liên hệ Administrator.");
                }
                else
                {
                    XinNghiPhepDAO lhdao = new XinNghiPhepDAO();
                    List<XinNghiPhepModel> lst = new List<XinNghiPhepModel>();
                    lst = lhdao.GetByHocSinh(ID_HocSinh);
                    response = Request.CreateResponse(HttpStatusCode.OK, new { success = true, data = lst });
                }
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotModified, ex);
            }
            return response;
        }
    }
}