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
    public class CompanyAddressController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CompanyAddressController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("companyAddresses/get")]
        [HttpPost]
        public IActionResult Get(CompanyAddress companyAddress)
        {

            try
            {

                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (companyAddress.CompanyAddressID != 0)
                {
                    oDBUtility.AddParameters("@CompanyAddressID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CompanyAddressID);
                }

                if (companyAddress.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CompanyID);
                }
                if (companyAddress.Address1 != null)
                {
                    oDBUtility.AddParameters("@Address1", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyAddress.Address1);
                }
                if (companyAddress.Address2 != null)
                {
                    oDBUtility.AddParameters("@Address2", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyAddress.Address2);
                }

                //if (companyAddress.CityID != 0)
                //{
                //    oDBUtility.AddParameters("@CityID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CityID);
                //}

               // if (companyAddress.StateID != 0)
                //{
               //     oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.StateID);
               // }

                if (companyAddress.CountryID != 0)
                {
                    oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CountryID);
                }
                if (companyAddress.Zip != null)
                {
                    oDBUtility.AddParameters("@Zip", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyAddress.Zip);
                }
                if (companyAddress.Latitude != 0)
                {
                    oDBUtility.AddParameters("@Latitude", DBUtilDBType.Numeric, DBUtilDirection.In, 100, companyAddress.Latitude);
                }
                if (companyAddress.Longitude != 0)
                {
                    oDBUtility.AddParameters("@Longitude", DBUtilDBType.Numeric, DBUtilDirection.In, 100, companyAddress.Longitude);
                }
                if (companyAddress.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyAddress.IsActive);
                }
                if (companyAddress.IsDefault != null)
                {
                    oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyAddress.IsDefault);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_ADDRESSES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("companyAddresses/insert")]
        [HttpPost]
        public IActionResult Post(CompanyAddress companyAddress)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CompanyID);
                oDBUtility.AddParameters("@Address1", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyAddress.Address1);
                oDBUtility.AddParameters("@Address2", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyAddress.Address2);
                //if (companyAddress.CityID != 0)
               // {
                //    oDBUtility.AddParameters("@CityID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CityID);
                //}
               // if (companyAddress.StateID != 0)
               // {
               //     oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.StateID);
               // }
                oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CountryID);
                if (companyAddress.Zip != null)
                {
                    oDBUtility.AddParameters("@Zip", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyAddress.Zip);
                }
                oDBUtility.AddParameters("@Landmark", DBUtilDBType.Varchar, DBUtilDirection.In, 200, companyAddress.Landmark);
                oDBUtility.AddParameters("@Latitude", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyAddress.Latitude);
                oDBUtility.AddParameters("@Longitude", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyAddress.Longitude);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companyAddress.IsActive);
                oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companyAddress.IsDefault);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CreatedBy);
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANYADDRESSES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("companyAddresses/update")]
        [HttpPost]
        public IActionResult Put(CompanyAddress companyAddress)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyAddressID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CompanyAddressID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CompanyID);
                oDBUtility.AddParameters("@Address1", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyAddress.Address1);
                oDBUtility.AddParameters("@Address2", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyAddress.Address2);
                //oDBUtility.AddParameters("@CityID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CityID);
                //oDBUtility.AddParameters("@StateID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.StateID);
                oDBUtility.AddParameters("@CountryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.CountryID);
                if (companyAddress.Zip != null)
                {
                    oDBUtility.AddParameters("@Zip", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyAddress.Zip);
                }
                oDBUtility.AddParameters("@Landmark", DBUtilDBType.Varchar, DBUtilDirection.In, 200, companyAddress.Landmark);
                oDBUtility.AddParameters("@Latitude", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyAddress.Latitude);
                oDBUtility.AddParameters("@Longitude", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyAddress.Longitude);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companyAddress.IsActive);
                oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companyAddress.IsDefault);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyAddress.ModifiedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPADTE_COMPANYADDRESSES");
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
