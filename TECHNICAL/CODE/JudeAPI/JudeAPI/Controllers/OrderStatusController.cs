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
    public class OrderStatusController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public OrderStatusController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("orderStatus/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.OrderStatus orderstatus)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (orderstatus.OrderStatusID != 0)
                {
                    oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.OrderStatusID);
                }

                if (orderstatus.OrderStatusDescription != null)
                {
                    oDBUtility.AddParameters("@OrderStatusDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, orderstatus.OrderStatusDescription);
                }

                if (orderstatus.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 50, orderstatus.IsActive);
                }

                if (orderstatus.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.CreatedBy);
                }

                if (orderstatus.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, orderstatus.CreatedDate);
                }

                if (orderstatus.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.ModifiedBy);
                }

                if (orderstatus.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, orderstatus.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_ORDER_STATUS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("orderStatus/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.OrderStatus orderstatus)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderStatusDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, orderstatus.OrderStatusDescription);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, orderstatus.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_ORDER_STATUS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("orderStatus/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.OrderStatus orderstatus)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.OrderStatusID);
                oDBUtility.AddParameters("@OrderStatusDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, orderstatus.OrderStatusDescription);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, orderstatus.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 500, orderstatus.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER_STATUS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("orderStatus/Isactive")]
        [HttpPost]
        public IActionResult PutIsactive(JudeAPI.Models.OrderStatus orderstatus)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderstatus.OrderStatusID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 500, orderstatus.IsActive);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER_STATUS_ISACTIVE");
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
