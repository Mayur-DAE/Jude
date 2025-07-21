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
    public class ReportsController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public ReportsController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("Reports/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
               
                    oDBUtility.AddParameters("@IsShopPaymentSettled", DBUtilDBType.Boolean, DBUtilDirection.In, 10, order.IsShopPaymentSettled);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SHOP_SETTLEMENT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        [Route("deliverysettlement/get")]
        [HttpPost]
        public IActionResult Gets(JudeAPI.Models.Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }

                oDBUtility.AddParameters("@IsDeliveryChargeSettled", DBUtilDBType.Boolean, DBUtilDirection.In, 10, order.IsDeliveryChargeSettled);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DELIVERY_SETTLEMENT");
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
