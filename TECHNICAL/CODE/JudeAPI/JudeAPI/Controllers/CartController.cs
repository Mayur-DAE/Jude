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
    public class CartController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CartController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("cart/get")]
        [HttpPost]
        public IActionResult Get_BY_Cart_ID(Cart cart)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (cart.CartID != 0)
                {
                    oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.CartID);
                }


                if (cart.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.UserID);
                }

                if (cart.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, cart.CreatedDate);
                }

                if (cart.UpdatedDate != null)
                {
                    oDBUtility.AddParameters("@UpdatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, cart.UpdatedDate);
                }                
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CART");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("cart/insert")]
        [HttpPost]
        public IActionResult Post(Cart cart)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.UserID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.CompanyID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CART");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("cart/update")]
        [HttpPost]
        public IActionResult Put(Cart cart)
        {
            try
            {
                bool Result = false;
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.CartID);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.UserID);

                Result = oDBUtility.Execute_StoreProc("USP_UPADTE_CART");

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CART");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("cart/delete")]
        [HttpPost]
        public IActionResult Delete(Cart cart)
        {
            try
            {

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cart.CartID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_Cart");
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
