using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System;
using JudeAPI.Models;


namespace JudeAPI.Controllers
{

    [ApiController]
    public class UserTypesController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public UserTypesController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("userType/get")]
        [HttpPost]
        public IActionResult GetUserType(JudeAPI.Models.UserTypes userTypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if(userTypes.UserTypeID != 0)
                {
                    oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.UserTypeID);
                }
                
                if(userTypes.UserType != null)
                {
                    oDBUtility.AddParameters("@UserType", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userTypes.UserType);
                }

                if (userTypes.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, userTypes.IsActive);
                }

                if(userTypes.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.CreatedBy);
                }

                if (userTypes.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, userTypes.CreatedDate);
                }

                if (userTypes.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.ModifiedBy);
                }

                if (userTypes.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, userTypes.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USER_TYPES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("userType/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.UserTypes userTypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserType", DBUtilDBType.Char, DBUtilDirection.In, 50, userTypes.UserType);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, userTypes.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_USER_TYPES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("userType/update")]
        [HttpPost]
        public IActionResult Put(UserTypes userTypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.UserTypeID);
                oDBUtility.AddParameters("@UserType", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userTypes.UserType);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, userTypes.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USER_TYPES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("userType/isActive")]
        [HttpPost]
        public IActionResult PutIsActive(UserTypes userTypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userTypes.UserTypeID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, userTypes.IsActive);
              
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USER_TYPES_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

    }
}










