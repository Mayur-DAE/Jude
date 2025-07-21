using JudeAPI.Models;
using DAE.DAL.SQL;
using DaeConfiguration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System;

namespace JudeAPI.Controllers
{

    [ApiController]
    public class DeliveryIntegrationController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public DeliveryIntegrationController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("Delivery-status-Update")]
        [HttpPost]
        public IActionResult Post(DeliveryIntegration deliveryIntegration)
        {
            try
            {
                var secretkey = deliveryIntegration.Secretkey;

                bool isSecretKeyInvalid = secretkey != "a2e700-33457-tythiond";
                bool isStatusInvalid = deliveryIntegration.OrderStatusID != 1 && deliveryIntegration.OrderStatusID != 3;

                if (isSecretKeyInvalid || isStatusInvalid)
                {
                    string error = isSecretKeyInvalid ? "Secret Key is wrong" : "Invalid Status ID";

                    var jsonData = new
                    {
                        Message = "Unauthorized Access",
                        Error = error
                    };

                    return Unauthorized(jsonData);
                }

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, deliveryIntegration.OrderID);
                oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, deliveryIntegration.OrderStatusID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER");

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