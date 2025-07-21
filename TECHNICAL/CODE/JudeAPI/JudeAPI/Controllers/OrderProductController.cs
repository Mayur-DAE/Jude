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
    public class OrderProductController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public OrderProductController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("OrderProduct/get")]
        [HttpPost]
        public IActionResult GetOrderProduct(JudeAPI.Models.OrderProduct OrderProduct)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (OrderProduct.OrderProductID != 0)
                {
                    oDBUtility.AddParameters("@OrderProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.OrderProductID);
                }
                if (OrderProduct.OrderID != 0)
                {
                    oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.OrderID);
                }
              
                if (OrderProduct.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, OrderProduct.CreatedDate);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_ORDERPRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }


        [Route("OrderProduct/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.OrderProduct OrderProduct)
        {
            try
            {
                                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.OrderID);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.ProductID);
                oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.Quantity);
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, OrderProduct.ProductPrice);
                oDBUtility.AddParameters("@DiscountPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, OrderProduct.DiscountPrice);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_ORDER_PRODUCTS");
           
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {                        

                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("BestSellingProduct/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.OrderProduct OrderProduct)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                //oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.ProductID);
                if (OrderProduct.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, OrderProduct.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_BEST_SELLING_PRODUCTS");
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
