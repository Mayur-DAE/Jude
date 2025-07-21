using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System;
using JudeAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace JudeAPI.Controllers
{
   
    [ApiController]
    public class ServiceProviderWalletLogController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public ServiceProviderWalletLogController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }


        [Route("ServiceProviderWalletLogController/get")]
        [HttpPost]
        public IActionResult GetServiceProvider(JudeAPI.Models.ServiceProviderWalletLog serviceProviderWalletLog)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (serviceProviderWalletLog.ServiceProviderID != 0)
                {
                    oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.@ServiceProviderID);
                }

                if (serviceProviderWalletLog.ServiceProviderWalletLogID != 0)
                {
                    oDBUtility.AddParameters("@ServiceProviderWalletLogID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.@ServiceProviderWalletLogID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SERVICE_PROVIDER_WALLET_LOG");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }


        [Route("ServiceProviderWalletLogController/insert")]
        [HttpPost]
        public IActionResult ServiceProviderWalletLogControllerInsert(JudeAPI.Models.ServiceProviderWalletLog serviceProviderWalletLog)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.ServiceProviderID);
                oDBUtility.AddParameters("@AmountCredited", DBUtilDBType.Numeric, DBUtilDirection.In, 20, serviceProviderWalletLog.AmountCredited);
                
                oDBUtility.AddParameters("@CreditDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, serviceProviderWalletLog.CreditDate);
                oDBUtility.AddParameters("@CreditReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 50, serviceProviderWalletLog.CreditReferenceNumber);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.CreatedBy);
                
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_SERVICE_PROVIDER_WALLET_LOG");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("ServiceProviderWalletLogController/update")]
        [HttpPost]
        public IActionResult ServiceProviderWalletLogControllerUpdate(JudeAPI.Models.ServiceProviderWalletLog serviceProviderWalletLog)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ServiceProviderWalletLogID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.ServiceProviderWalletLogID);
                oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.ServiceProviderID);
                oDBUtility.AddParameters("@AmountCredited", DBUtilDBType.Numeric, DBUtilDirection.In, 20, serviceProviderWalletLog.AmountCredited);
                oDBUtility.AddParameters("@OldAmountCredited", DBUtilDBType.Numeric, DBUtilDirection.In, 20, serviceProviderWalletLog.OldAmountCredited);
                oDBUtility.AddParameters("@CreditDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, serviceProviderWalletLog.CreditDate);
                oDBUtility.AddParameters("@CreditReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 50, serviceProviderWalletLog.CreditReferenceNumber);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProviderWalletLog.ModifiedBy);


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_SERVICE_PROVIDER_WALLET_LOG");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

       
        [Route("ShiprocketStatement/Get")]
        [HttpPost]
        public JsonResult GetShiprocketStatement(JudeAPI.Models.ServiceProviderWalletLog serviceProviderWalletLog)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
               

                if(serviceProviderWalletLog.FromDate != null)
                {
                    oDBUtility.AddParameters("@FromDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, serviceProviderWalletLog.FromDate);
                }

                if (serviceProviderWalletLog.ToDate != null)
                {
                    oDBUtility.AddParameters("@ToDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, serviceProviderWalletLog.ToDate);
                }             

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SHIPROCKET_STATEMENT");                
                return new JsonResult(ds);
            }
            catch (Exception ex)
            {                
                return new JsonResult(null);
            }
        }



    }
}
