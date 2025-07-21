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
    public class Summaryorderreport : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public Summaryorderreport(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }

        [Route("summary/order/report")]
        [HttpPost]
        public IActionResult Get(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (order.OrderID != 0)
                {
                    oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
                }

               
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }

                if (order.OrderDate != null)
                {
                    oDBUtility.AddParameters("@OrderDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, order.OrderDate);
                }

                if (order.FromDate != null)
                {
                    oDBUtility.AddParameters("@FromDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, order.FromDate);
                }

                if (order.ToDate != null)
                {
                    oDBUtility.AddParameters("@ToDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, order.ToDate);
                }

                if (order.CompanyName != null)
                {
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, order.CompanyName);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_SUMMARY_ORDER_REPORT");
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
