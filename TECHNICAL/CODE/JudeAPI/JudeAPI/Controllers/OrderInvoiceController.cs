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
    public class OrderInvoiceController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public OrderInvoiceController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("orderInvoice/get")]
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
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("US_GetOrderInvoice");
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