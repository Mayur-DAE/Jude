using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using JudeAPI.Models;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
namespace JudeAPI.Controllers
{
    [ApiController]
    public class UserAddressesController : ControllerBase
    {

        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public UserAddressesController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("userAddresses/get")]
        [HttpPost]
        public IActionResult Get(UserAddresses userAddresses)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (userAddresses.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.UserID);
                }

                // if (userAddresses.StateID != 0)
                // {
                //oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.StateID);
                //}

                // if (userAddresses.CountryID != 0)
                // {
                // oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CountryID);
                //}

                if (userAddresses.UserAddressID != 0)
                {
                    oDBUtility.AddParameters("@UserAddressID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.UserAddressID);
                }

             

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USERADDRESSES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("userAddresses/insert")]
        [HttpPost]
        public IActionResult Post(UserAddresses userAddresses)
         {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.UserID);
                oDBUtility.AddParameters("@Address1", DBUtilDBType.Varchar, DBUtilDirection.In, 200, userAddresses.Address1);
                oDBUtility.AddParameters("@Address2", DBUtilDBType.Varchar, DBUtilDirection.In, 200, userAddresses.Address2);
                //oDBUtility.AddParameters("@CityID", DBUtilDBType.Integer, DBUtilDirection.In, 50, userAddresses.CityID);
                //oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.StateID);
                oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CountryID);
                //oDBUtility.AddParameters("@Zip", DBUtilDBType.Varchar, DBUtilDirection.In, 10, userAddresses.Zip);
                if (userAddresses.Landmark != "" && userAddresses.Landmark != null)
                {
                    oDBUtility.AddParameters("@Landmark", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userAddresses.Landmark);
                }
                oDBUtility.AddParameters("@Latitude", DBUtilDBType.Numeric, DBUtilDirection.In, 100, userAddresses.Latitude);
                oDBUtility.AddParameters("@Longitude", DBUtilDBType.Numeric, DBUtilDirection.In, 100, userAddresses.Longitude);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, userAddresses.IsActive);
                oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 10, userAddresses.IsDefault);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CreatedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_USERADDRESSES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("userAddresses/update")]
        [HttpPost]
        public IActionResult Put(UserAddresses userAddresses)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserAddressID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.UserAddressID);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.UserID);
                oDBUtility.AddParameters("@Address1", DBUtilDBType.Varchar, DBUtilDirection.In, 200, userAddresses.Address1);
                oDBUtility.AddParameters("@Address2", DBUtilDBType.Varchar, DBUtilDirection.In, 200, userAddresses.Address2);
                //oDBUtility.AddParameters("@CityID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userAddresses.CityID);
               // oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.StateID);
                oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CountryID);
                oDBUtility.AddParameters("@Zip", DBUtilDBType.Varchar, DBUtilDirection.In, 10, userAddresses.Zip);
                if (userAddresses.Landmark != "" && userAddresses.Landmark != null)
                {
                    oDBUtility.AddParameters("@Landmark", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userAddresses.Landmark);
                }
                oDBUtility.AddParameters("@Latitude", DBUtilDBType.Varchar, DBUtilDirection.In, 50, userAddresses.Latitude);
                oDBUtility.AddParameters("@Longitude", DBUtilDBType.Numeric, DBUtilDirection.In, 100, userAddresses.Longitude);
                //oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, userAddresses.IsActive);
                //oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 10, userAddresses.IsDefault);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.ModifiedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_USERADDRESSES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("city/get")]
        [HttpPost]
        public IActionResult cityGet(UserAddresses userAddresses)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (userAddresses.CityID != 0)
                {
                    oDBUtility.AddParameters("@CityID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CityID);
                }

                if (userAddresses.CountryID != 0)
                {
                    oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CountryID);
                }

                if (userAddresses.StateID != 0)
                {
                    oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.StateID);
                }

                if (userAddresses.CityName != null)
                {
                    oDBUtility.AddParameters("@CityName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, userAddresses.CityName);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CITY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("states/get")]
        [HttpPost]
        public IActionResult statesGet(UserAddresses userAddresses)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (userAddresses.CountryID != 0)
                {
                    oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.CountryID);
                }

                if (userAddresses.StateID != 0)
                {
                    oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userAddresses.StateID);
                }

                if (userAddresses.StateName != null)
                {
                    oDBUtility.AddParameters("@StateName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, userAddresses.StateName);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_STATES");
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
