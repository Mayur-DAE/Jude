using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using DAE.DAL.SQL;
using DaeConfiguration;
using System;
using JudeAPI.Models;

namespace JudeAPI.Controllers
{
    [ApiController]
    public class CompanySources : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CompanySources(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }

        [Route("companySources/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.CompanySources companysources)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);


                if (companysources.CompanySourceID != 0)
                {
                    oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.CompanySourceID);
                }

                if (companysources.CompanySource != null)
                {
                    oDBUtility.AddParameters("@CompanySource", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companysources.CompanySource);
                }
                if (companysources.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companysources.IsActive);
                }

                if (companysources.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.CreatedBy);
                }

                if (companysources.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companysources.CreatedDate);
                }

                if (companysources.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.ModifiedBy);
                }

                if (companysources.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companysources.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_SOURCES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companySources/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.CompanySources companysources)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanySource", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companysources.CompanySource);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companysources.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.CreatedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY_SOURCES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companySources/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.CompanySources companysources)
        {

            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.CompanySourceID);
                oDBUtility.AddParameters("@CompanySource", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companysources.CompanySource);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companysources.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 500, companysources.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_COMPANY_SOURCES");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companySources/isactive")]
        [HttpPost]
        public IActionResult PutIsactive(JudeAPI.Models.CompanySources companysources)
        {
            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.CompanySourceID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companysources.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companysources.ModifiedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_COMPANY_SOURCES");
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
