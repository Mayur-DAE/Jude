using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System;
using JudeAPI.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;


namespace JudeAPI.Controllers
{

    [ApiController]

    public class OrderController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;
        private readonly IWebHostEnvironment _env;

        public OrderController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            _env = env;

        }
        [Authorize]

        [Route("order/get")]
        [HttpPost]
        public IActionResult Get(Order order)
        {
            try
            {
                //var userIdClaim = User.FindFirst(ClaimTypes.Role);
                //var userrole = userIdClaim.Value;
                //if (userrole == null || userrole == "" || userrole != "5" && userrole != "4" && userrole != "3" && userrole != "2" && userrole != "1")
                //{
                //    var jsondata = new
                //    {
                //        Message = "UnAuthorized Access"
                //    };
                //    return Unauthorized(jsondata);
                //}


                //else
                //{
                    DBUtility oDBUtility = new DBUtility(_configurationIG);

                    if (order.OrderID != 0)
                    {
                        oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
                    }

                    if (order.UserID != 0)
                    {
                        oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                    }

                    if (order.OrderStatusID != 0)
                    {
                        oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderStatusID);
                    }

                    if (order.CompanyID != 0)
                    {
                        oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                    }

                    if (order.OrderDeliveryTypeID != 0)
                    {
                        oDBUtility.AddParameters("@OrderDeliveryTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderDeliveryTypeID);
                    }

                    if (order.OrderPaymentSourceID != 0)
                    {
                        oDBUtility.AddParameters("@OrderPaymentSourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderPaymentSourceID);
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

                    if (order.Username != null)
                    {
                        oDBUtility.AddParameters("@Username", DBUtilDBType.Varchar, DBUtilDirection.In, 50, order.Username);
                    }

                    if (order.FirstName != null)
                    {
                        oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, order.FirstName);
                    }

                    if (order.LastName != null)
                    {
                        oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, order.LastName);
                    }

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_ORDER");
                    oServiceRequestProcessor = new ServiceRequestProcessor();
                    return Ok(oServiceRequestProcessor.ProcessRequest(ds));
                //}
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("order/insert")]
        [HttpPost]
        public IActionResult Post(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderStatusID);
                oDBUtility.AddParameters("@address1", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.address1);
                oDBUtility.AddParameters("@address2", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.address2);
                oDBUtility.AddParameters("@longitude", DBUtilDBType.Decimal, DBUtilDirection.In, 100, order.longitude);
                oDBUtility.AddParameters("@latitude", DBUtilDBType.Decimal, DBUtilDirection.In, 100, order.latitude);
                if (order.landmark != null)
                {
                    oDBUtility.AddParameters("@landmark", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.landmark);
                }
                oDBUtility.AddParameters("@fullname", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.fullname);
                oDBUtility.AddParameters("@mobilenumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.mobilenumber);
                oDBUtility.AddParameters("@OrderDeliveryTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderDeliveryTypeID);
                oDBUtility.AddParameters("@OrderPrice", DBUtilDBType.Numeric, DBUtilDirection.In, 20, order.OrderPrice);
                oDBUtility.AddParameters("@ShippingPrice", DBUtilDBType.Numeric, DBUtilDirection.In, 20, order.ShippingPrice);
                oDBUtility.AddParameters("@OrderPaymentReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.OrderPaymentReferenceNumber);
                oDBUtility.AddParameters("@OrderPaymentSourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderPaymentSourceID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_ORDER");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }
        [Route("order/update")]
        [HttpPost]
        public IActionResult Put(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
                oDBUtility.AddParameters("@OrderStatusID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderStatusID);

                if (order.OrderShipmentReferenceID != null)
                {
                    oDBUtility.AddParameters("@OrderShipmentReferenceID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, order.OrderShipmentReferenceID);
                }

                if (order.ShippingPrice != 0)
                {
                    oDBUtility.AddParameters("@ShippingPrice", DBUtilDBType.Numeric, DBUtilDirection.In, 20, order.ShippingPrice);
                }

                if(order.OrderPaymentReferenceNumber != null)
                {
                    oDBUtility.AddParameters("@OrderPaymentReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, order.OrderPaymentReferenceNumber);
                }

                if (order.ShiprocketCourierID != 0)
                {
                    oDBUtility.AddParameters("@ShiprocketCourierID", DBUtilDBType.Integer, DBUtilDirection.In, 20, order.ShiprocketCourierID);
                }



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


        [Route("orderinvoice/update")]
        [HttpPost]
        public IActionResult update(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.OrderID);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GENERATE_ORDER_INVOICE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("serviceprovider_wallet/update")]
        [HttpPost]
        public IActionResult updateserviceprovider_wallet(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Price", DBUtilDBType.Numeric, DBUtilDirection.In, 20, order.Price);
                oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.ServiceProviderID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_SERVICEPRICE_WALLET");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [Route("Orders/CheckBookingStatus")]
        [HttpPost]
        public async Task<IActionResult> CheckBookingStatus(Order order)
        {
            try
            {
                DBUtility oDBUtility2 = new DBUtility(_configurationIG);

                oDBUtility2.AddParameters("@OrderID", DBUtilDBType.Integer, DBUtilDirection.In, 4, order.OrderID);

                DataSet ds = oDBUtility2.Execute_StoreProc_DataSet("USP_GET_ORDER");

                int OrderStatusID = (int)ds.Tables[0].Rows[0]["OrderStatusID"];
                oServiceRequestProcessor = new ServiceRequestProcessor();
                if (OrderStatusID == (int)EOrderStatus.PaymentSuccess)
                {
                    return Ok(oServiceRequestProcessor.customeMessge(100, OrderStatusID.ToString()));
                }
                else
                {
                    return Ok(oServiceRequestProcessor.customeMessge(200, OrderStatusID.ToString()));
                }

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
