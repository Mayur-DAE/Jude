using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using DAE.DAL.SQL;
using DaeConfiguration;
using JudeAPI.Models;
using System;
using DAE.Common.EncryptionDecryption;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace JudeAPI.Controllers
{
    
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;
        private readonly IJwtAuth jwtAuth;

        public UserController(IDaeConfigManager configuration, IJwtAuth jwtAuth)
        {
            this._configurationIG = configuration;
            this.jwtAuth = jwtAuth;
                    }

        [Route("users/get")]
        [HttpPost]
        public IActionResult GetUser(Users users)        
        {
            try
               {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (users.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserID);
                }

                if (users.Username != null)
                {
                    oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);
                }

                if (users.UserRoleID != 0)
                {
                    oDBUtility.AddParameters("@UserRoleID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserRoleID);
                }

                if (users.FirstName != null)
                {
                    oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.FirstName);
                }

                if (users.LastName != null)
                {
                    oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.LastName);
                }

                if (users.EmaiID != null)
                {
                    oDBUtility.AddParameters("@EmaiID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, users.EmaiID);
                }

                if (users.MobileNumber != null)
                {
                    oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, users.MobileNumber);
                }
                if (users.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.CompanyID);
                }


                if (users.UserTypeID != 0)
                {
                    oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserTypeID);
                }

                if (users.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, users.IsActive);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch(Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
           
        [Route("users/insert")]
        [HttpPost]
        public IActionResult AddUser(JudeAPI.Models.Users users)
        {

            ConfigHandler oEncrDec;
            oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.CompanyID);
                oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserTypeID);
                oDBUtility.AddParameters("@UserRoleID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserRoleID);
                if (users.Username != null)
                {
                    oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);
                }

                string encryptedPassword = oEncrDec.Cryptohelper.Encrypt(users.Password);
                oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, encryptedPassword);
                oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.FirstName);
                oDBUtility.AddParameters("@MiddleName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.MiddleName);
                oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.LastName);
                oDBUtility.AddParameters("@EmaiID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, users.EmaiID);
                oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 12, users.MobileNumber);
                if (users.ProfilePicturePath != null)
                {
                    oDBUtility.AddParameters("@ProfilePicturePath", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.ProfilePicturePath);
                }
                                           
                if (users.DateOfBirth != null)
                {
                    oDBUtility.AddParameters("@DateOfBirth", DBUtilDBType.DateTime, DBUtilDirection.In, 50, users.DateOfBirth);
                }
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, users.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.CreatedBy);
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_USERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("users/update")]
        [HttpPost]
        public IActionResult UserUpdate(JudeAPI.Models.Users user)
        {
            try
            {
                ConfigHandler oEncrDec;
                oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if(user.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.UserID);
                }
                
                if(user.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.CompanyID);
                }

                if(user.UserTypeID != 0)
                {
                    oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.UserTypeID);
                }
                
                if(user.UserRoleID != 0)
                {
                    oDBUtility.AddParameters("@UserRoleID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.UserRoleID);
                }

                if(user.Username != null)
                {
                    oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, user.Username);
                }
               
                if(user.Password != null && user.Password != "")
                {
                    string encryptedPassword = oEncrDec.Cryptohelper.Encrypt(user.Password);

                    oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, encryptedPassword);
                }
               
                if(user.FirstName != null)
                {
                    oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, user.FirstName);
                }

                if(user.MiddleName != null)
                {
                    oDBUtility.AddParameters("@MiddleName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, user.MiddleName);
                }
                
                if(user.LastName != null)
                {
                    oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, user.LastName);
                }
                                
                if (user.EmaiID != null)
                {
                    oDBUtility.AddParameters("@EmaiID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, user.EmaiID);
                }
                

                if (user.MobileNumber != null)
                {
                    oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 12, user.MobileNumber);
                }

                if (user.ProfilePicturePath != null)
                {
                    oDBUtility.AddParameters("@ProfilePicturePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, user.ProfilePicturePath);
                }

                if (user.DateOfBirth != null)
                {
                    oDBUtility.AddParameters("@DateOfBirth", DBUtilDBType.DateTime, DBUtilDirection.In, 250, user.DateOfBirth);
                }

                if (user.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, user.IsActive);

                }

                if (user.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.ModifiedBy);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("user/login")]
        [HttpPost]
        public IActionResult Login(Users users)
        {
            try
            {
                ConfigHandler oEncrDec;
                oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);

                //oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, users.Password);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_LOGIN");

                int status_code = Convert.ToInt32(ds.Tables[0].Rows[0]["status_code"].ToString());

                if(status_code == 100)
                {                    
                    string decryptedPassword = oEncrDec.Cryptohelper.Decrypt(ds.Tables[0].Rows[0]["Password"].ToString());

                    if(users.Password == decryptedPassword)
                    {
                        oServiceRequestProcessor = new ServiceRequestProcessor();
                        var userID = ds.Tables[0].Rows[0]["UserID"].ToString();
                        var roleID = ds.Tables[0].Rows[0]["UserRoleID"].ToString();
                        var token = jwtAuth.Authentication(userID, roleID);

                        System.Data.DataColumn newColumn = new System.Data.DataColumn("Token", typeof(System.String));
                        newColumn.DefaultValue = token.ToString();
                        ds.Tables[0].Columns.Add(newColumn);
                        ds.Tables[0].Columns.Remove("password");

                        return Ok(oServiceRequestProcessor.ProcessRequest(ds));
                    }
                    else
                    {
                        oServiceRequestProcessor = new ServiceRequestProcessor();
                        return Ok(oServiceRequestProcessor.onUserNotFound());
                    }

                }
                else if (status_code == 300)
                {
                    string message = ds.Tables[0].Rows[0]["message"].ToString();
                    oServiceRequestProcessor = new ServiceRequestProcessor();
                    return Ok(oServiceRequestProcessor.onMessage(message));
                }
                else
                {
                    oServiceRequestProcessor = new ServiceRequestProcessor();
                    return Ok(oServiceRequestProcessor.onUserNotFound());
                }
                
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("user/changePassword")]
        [HttpPost]
        public IActionResult ChangePassword(Users users)
        {
            try
            {
                ConfigHandler oEncrDec;
                oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserID);
                DataSet uds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USERS");  

                if (uds.Tables[0].Rows.Count == 0)
                {
                    return BadRequest(new { status_code = "300", message = "User not found" });
                }

                string encryptedOldPasswordFromDB = uds.Tables[0].Rows[0]["Password"].ToString();

                string decryptedOldPasswordFromDB;
                try
                {
                    decryptedOldPasswordFromDB = oEncrDec.Cryptohelper.Decrypt(encryptedOldPasswordFromDB);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { status_code = "300", message = "Error decrypting password: " + ex.Message });
                }

                //oDBUtility.AddParameters("@OldPassword", DBUtilDBType.Varchar, DBUtilDirection.In, 500, users.OldPassword);

                if (decryptedOldPasswordFromDB != users.OldPassword)
                {
                    return Ok(new { status_code = "300", message = "Current password is incorrect." });
                }


                string encryptedPassword = oEncrDec.Cryptohelper.Encrypt(users.Password);
                oDBUtility.AddParameters("@NewPassword", DBUtilDBType.Varchar, DBUtilDirection.In, 500, encryptedPassword);
               // oDBUtility.AddParameters("@Status", DBUtilDBType.Integer, DBUtilDirection.Out, 10, status);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PASSWORD");

                oServiceRequestProcessor = new ServiceRequestProcessor();

                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [Route("users/active")]
        [HttpPost]
        public IActionResult SetUserActive(JudeAPI.Models.Users user)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.UserID);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USERS_ACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("users/inactive")]
        [HttpPost]
        public IActionResult SetUserInactive(JudeAPI.Models.Users user)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.UserID);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, user.ModifiedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USERS_INACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("users/userRoles")]
        [HttpGet]
        public JsonResult GetUserRoles()
        {

            DBUtility oDBUtility = new DBUtility(_configurationIG);


            DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USER_ROLES");

            if (ds.Tables.Count > 0)
            {
                DataTable table = ds.Tables[0];

                if (table.Rows.Count > 0)
                {
                    return new JsonResult(table);
                }
                else
                {
                    return new JsonResult(null);
                }

            }
            else
            {
                return new JsonResult(null);
            }

        }

        [Route("users/googlesignup")]
        [HttpPost]
        public IActionResult AddGoogleUser(JudeAPI.Models.Users users)
        {

            ConfigHandler oEncrDec;
            oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

            try
            {

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.CompanyID);
                oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserTypeID);
                oDBUtility.AddParameters("@UserRoleID", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.UserRoleID);
                if (users.Username != null)
                {
                    oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);
                }
                if (users.Password != null)
                {
                    string encryptedPassword = oEncrDec.Cryptohelper.Encrypt(users.Password);
                    oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, encryptedPassword);
                }
                oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.FirstName);
                if (users.MiddleName != null)
                {
                    oDBUtility.AddParameters("@MiddleName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.MiddleName);
                }
                oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.LastName);
                oDBUtility.AddParameters("@EmaiID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, users.EmaiID);
                if (users.MobileNumber != null)
                {
                    oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 12, users.MobileNumber);
                }
                if (users.ProfilePicturePath != null)
                {
                    oDBUtility.AddParameters("@ProfilePicturePath", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.ProfilePicturePath);
                }

                if (users.DateOfBirth != null)
                {
                    oDBUtility.AddParameters("@DateOfBirth", DBUtilDBType.DateTime, DBUtilDirection.In, 50, users.DateOfBirth);
                }
                oDBUtility.AddParameters("@GoogleID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.GoogleID);

                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, users.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, users.CreatedBy);
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_GOOGLE_USERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("user/googlelogin")]
        [HttpPost]
        public IActionResult GoogleLogin(Users users)
        {
            try
            {
                ConfigHandler oEncrDec;
                oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);

                //oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, users.Password);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_LOGIN");

                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("user/enduserlogin")]
        [HttpPost]
        public IActionResult CustomerLogin(Users users)
        {
            try
            {
                ConfigHandler oEncrDec;
                oEncrDec = new ConfigHandler(this._configurationIG.EncryptionDecryptionAlgorithm, this._configurationIG.EncryptionDecryptionKey);

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, users.Username);

                //oDBUtility.AddParameters("@Password", DBUtilDBType.Varchar, DBUtilDirection.In, 500, users.Password);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CUSTOMERLOGIN");

                int status_code = Convert.ToInt32(ds.Tables[0].Rows[0]["status_code"].ToString());

                if (status_code == 100)
                {
                    string decryptedPassword = oEncrDec.Cryptohelper.Decrypt(ds.Tables[0].Rows[0]["Password"].ToString());

                    if (users.Password == decryptedPassword)
                    {
                        oServiceRequestProcessor = new ServiceRequestProcessor();
                        var userID = ds.Tables[0].Rows[0]["UserID"].ToString();
                        var roleID = ds.Tables[0].Rows[0]["UserRoleID"].ToString();
                        var token = jwtAuth.Authentication(userID, roleID);

                        System.Data.DataColumn newColumn = new System.Data.DataColumn("Token", typeof(System.String));
                        newColumn.DefaultValue = token.ToString();
                        ds.Tables[0].Columns.Add(newColumn);
                        ds.Tables[0].Columns.Remove("password");
                        return Ok(oServiceRequestProcessor.ProcessRequest(ds));
                    }
                    else
                    {
                        oServiceRequestProcessor = new ServiceRequestProcessor();
                        return Ok(oServiceRequestProcessor.onUserNotFound());
                    }
                }
                else
                {
                    oServiceRequestProcessor = new ServiceRequestProcessor();
                    return Ok(oServiceRequestProcessor.onUserNotFound());
                }

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

    }
}
