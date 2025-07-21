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
    public class SettlementController : ControllerBase
    {

        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public SettlementController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("shop/settlement")]
        [HttpPost]
        public IActionResult Put(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
                if (order.IsShopPaymentSettled != false)
                {
                    oDBUtility.AddParameters("@IsShopPaymentSettled", DBUtilDBType.Boolean, DBUtilDirection.In, 50, order.IsShopPaymentSettled);
                }

                if (order.ShopPaymentReference != null)
                {
                    oDBUtility.AddParameters("@ShopPaymentReference", DBUtilDBType.Varchar, DBUtilDirection.In, 500, order.ShopPaymentReference);
                }

                if (order.ShopPaymentSettledBy != 0)
                {
                    oDBUtility.AddParameters("@ShopPaymentSettledBy", DBUtilDBType.Integer, DBUtilDirection.In, 20, order.ShopPaymentSettledBy);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_Update_Shop_PaymentSettlement");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [Route("delivery/settlement")]
        [HttpPost]
        public IActionResult update(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
                if (order.IsDeliveryChargeSettled != null)
                {
                    oDBUtility.AddParameters("@IsDeliveryChargeSettled", DBUtilDBType.Boolean, DBUtilDirection.In, 50, order.IsDeliveryChargeSettled);
                }

               
                if (order.DeliveryChargeSettlementReference != null)
                {
                    oDBUtility.AddParameters("@DeliveryChargeSettlementReference", DBUtilDBType.Varchar, DBUtilDirection.In, 500, order.DeliveryChargeSettlementReference);
                }

                if (order.DeliveryChargeSettledBy != 0)
                {
                    oDBUtility.AddParameters("@DeliveryChargeSettledBy", DBUtilDBType.Integer, DBUtilDirection.In, 20, order.DeliveryChargeSettledBy);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_Update_DeliveryCharge_PaymentSettlement");
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
