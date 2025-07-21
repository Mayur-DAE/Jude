using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAE.DAL.SQL;
using DaeConfiguration;
using JudeAPI.Models;

namespace JudeAPI.Controllers
{
    [ApiController]
    public class OrderDeliveryTypeController : ControllerBase
    {

        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public OrderDeliveryTypeController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("orderDeliveryType/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.OrderDeliveryType orderdeliverytype)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);


                if (orderdeliverytype.OrderDeliveryTypeID != 0)
                {
                    oDBUtility.AddParameters("@OrderDeliveryTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.OrderDeliveryTypeID);
                }

                if (orderdeliverytype.OrderDeliveryTypeName != null)
                {
                    oDBUtility.AddParameters("@OrderDeliveryTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, orderdeliverytype.OrderDeliveryTypeName);
                }

                if (orderdeliverytype.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, orderdeliverytype.IsActive);
                }

                if (orderdeliverytype.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.CreatedBy);
                }

                if (orderdeliverytype.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, orderdeliverytype.CreatedDate);
                }

                if (orderdeliverytype.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.ModifiedBy);
                }

                if (orderdeliverytype.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, orderdeliverytype.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_ORDER_DELIVERY_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));                
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        [Route("orderDeliveryType/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.OrderDeliveryType orderdeliverytype)
        {
            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderDeliveryTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, orderdeliverytype.OrderDeliveryTypeName);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, orderdeliverytype.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.CreatedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_ORDER_DELIVERY_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));                             
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("orderDeliveryType/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.OrderDeliveryType orderdeliverytype)
        {

            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderDeliveryTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.OrderDeliveryTypeID);
                oDBUtility.AddParameters("@OrderDeliveryTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, orderdeliverytype.OrderDeliveryTypeName);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, orderdeliverytype.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 500, orderdeliverytype.ModifiedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_ORDER_DELIVERY_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));                                
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("orderDeliveryType/Isactive")]
        [HttpPost]
        public IActionResult PutIsactive(JudeAPI.Models.OrderDeliveryType orderdeliverytype)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderDeliveryTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, orderdeliverytype.OrderDeliveryTypeID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Varchar, DBUtilDirection.In, 500, orderdeliverytype.IsActive);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_ORDER_DELIVERY_TYPE_ISACTIVE");
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
