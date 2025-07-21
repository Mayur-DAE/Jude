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
    public class CartProductsController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CartProductsController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("cartProducts/get")]
        [HttpPost]
        public IActionResult Get(CartProducts cartproducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (cartproducts.CartProductID != 0)
                {
                    oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartProductID);
                }

                if (cartproducts.CartID != 0)
                {
                    oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                }


                if (cartproducts.ProductID != 0)
                {
                    oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.ProductID);
                }

                if (cartproducts.Quantity != 0)
                {
                    oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);
                }

                if (cartproducts.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CART_PRODUCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("cartProducts/insert")]
        [HttpPost]
        public IActionResult Post(CartProducts cartproducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CompanyID);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.ProductID);
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, cartproducts.ProductPrice);
                oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CART_PRODUCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("cartProducts/update")]
        [HttpPost]
        public IActionResult Put(CartProducts cartproducts)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartProductID);
                oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.ProductID);
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 100, cartproducts.ProductPrice);
                oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);
             
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_CART_PRODUCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("cartProducts/quantity")]
        [HttpPost]
        public IActionResult quantity(JudeAPI.Models.CartProducts cartproducts)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartProductID);
                oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);
                               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_CART_PRODUCT_QUANTITY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("cartProducts/delete")]
        [HttpPost]
        public IActionResult Delete(CartProducts cartproducts)
        {
            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (cartproducts.CartProductID != 0)
                {
                    oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartProductID);
                }
                if (cartproducts.CartID != 0)
                {
                    oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                }
                            
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_CartProducts");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("cartProductsMobile/get")]
        [HttpPost]
        public IActionResult cartProductsMobile(CartProducts cartproducts)
        {
            try
            {             
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (cartproducts.CartID != 0)
                {                  
                    oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);                   
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CART_PRODUCT");

                if(ds.Tables[0].Rows[0]["Status_Code"].ToString() == "100")
                {
                    Boolean isProductNotFount = true;

                    foreach(DataRow row in ds.Tables[0].Rows)
                    {
                        if(Convert.ToInt32(row["CompanyID"]) != cartproducts.CompanyID)
                        {
                            oServiceRequestProcessor = new ServiceRequestProcessor();
                            return Ok(oServiceRequestProcessor.customeMessge(510, "Company ID not matched"));                      
                        }
                        else
                        {
                            if (Convert.ToInt32(row["CompanyID"]) == cartproducts.CompanyID && Convert.ToInt32(row["ProductID"]) == cartproducts.ProductID && Convert.ToInt32(row["UserID"]) == cartproducts.UserID)
                            {
                                isProductNotFount = false;

                                int CartProductID = Convert.ToInt32(row["CartProductID"]);

                                oDBUtility = new DBUtility(_configurationIG);
                                oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CartProductID);
                                oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);

                                DataSet ds1 = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_CART_PRODUCT_QUANTITY");

                                if(ds1.Tables[0].Rows.Count > 0) //need to check statuc code
                                {
                                    if(ds1.Tables[0].Rows[0]["status_code"].ToString() == "100")
                                    {
                                        if(cartproducts.Quantity == 0)
                                        {
                                            oDBUtility = new DBUtility(_configurationIG);
                                            oDBUtility.AddParameters("@CartProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CartProductID);
                                            oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);

                                            DataSet ds12 = oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_CartProducts");
                                            oServiceRequestProcessor = new ServiceRequestProcessor();
                                           

                                            if(ds.Tables[0].Rows.Count == 1)
                                            {
                                                oDBUtility = new DBUtility(_configurationIG);
                                                oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);

                                                DataSet dsnew = oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_Cart");
                                                oServiceRequestProcessor = new ServiceRequestProcessor();
                                                return Ok(oServiceRequestProcessor.customeMessge(550, "Cart removed"));
                                            }
                                            else
                                            {
                                                return Ok(oServiceRequestProcessor.customeMessge(540, "Product removed from cart"));
                                            }
                                        }
                                        else
                                        {
                                            oServiceRequestProcessor = new ServiceRequestProcessor();
                                            return Ok(oServiceRequestProcessor.customeMessge(520, "Quantity Updated Successfully"));
                                        }                                        
                                    }
                                    else
                                    {
                                        oServiceRequestProcessor = new ServiceRequestProcessor();
                                        return Ok(oServiceRequestProcessor.ProcessRequest(ds1));
                                    }
                                    
                                }
                            }
                        }                        
                    }

                    if (isProductNotFount)
                    {
                        //insert cart product 

                        oDBUtility = new DBUtility(_configurationIG);
                        oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                        oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CompanyID);
                        oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.ProductID);
                        oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, cartproducts.ProductPrice);
                        oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);

                        DataSet ds1 = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CART_PRODUCT");
                        oServiceRequestProcessor = new ServiceRequestProcessor();
                        return Ok(oServiceRequestProcessor.customeMessge(530, "Product Inserted Successfully"));
                    }
                }
                else
                {
                    //insert card product

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@CartID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CartID);
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.CompanyID);
                    oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.ProductID);
                    oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, cartproducts.ProductPrice);
                    oDBUtility.AddParameters("@Quantity", DBUtilDBType.Integer, DBUtilDirection.In, 10, cartproducts.Quantity);

                    DataSet ds1 = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CART_PRODUCT");
                    oServiceRequestProcessor = new ServiceRequestProcessor();
                    return Ok(oServiceRequestProcessor.customeMessge(530, "Product Inserted Successfully"));
                }
               
               
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
