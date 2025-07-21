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
    public class Offers : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public Offers(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("offers/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.Offers offers)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (offers.OfferID != 0)
                {
                    oDBUtility.AddParameters("@OfferID", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.OfferID);
                }

                if (offers.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.CompanyID);
                }

                if (offers.OfferName != null)
                {
                    oDBUtility.AddParameters("@OfferName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, offers.OfferName);
                }

                if (offers.OfferStartDate != null)
                {
                    oDBUtility.AddParameters("@OfferStartDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, offers.OfferStartDate);
                }

                if (offers.OfferEndDate != null)
                {
                    oDBUtility.AddParameters("@OfferEndDate ", DBUtilDBType.DateTime, DBUtilDirection.In, 50, offers.OfferEndDate);
                }

                if (offers.OfferDiscount != 0)
                {
                    oDBUtility.AddParameters("@OfferDiscount", DBUtilDBType.Decimal, DBUtilDirection.In, 50, offers.OfferDiscount);
                }

                if (offers.OfferDiscountType != null)
                {
                    oDBUtility.AddParameters("@OfferDiscountType", DBUtilDBType.Varchar, DBUtilDirection.In, 50, offers.OfferDiscountType);
                }

                if (offers.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.CreatedBy);
                }

                if (offers.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, offers.CreatedDate);
                }

                if (offers.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.ModifiedBy);
                }

                if (offers.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, offers.ModifiedDate);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_OFFERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }


        [Route("offers/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.Offers offers)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, offers.CompanyID);
                oDBUtility.AddParameters("@OfferName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, offers.OfferName);
                oDBUtility.AddParameters("@OfferDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, offers.OfferDescription);
                oDBUtility.AddParameters("@OfferStartDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, offers.OfferStartDate);
                oDBUtility.AddParameters("@OfferEndDate", DBUtilDBType.DateTime, DBUtilDirection.In, 500, offers.OfferEndDate);
                oDBUtility.AddParameters("@OfferDiscount", DBUtilDBType.Numeric, DBUtilDirection.In, -1, offers.OfferDiscount);
                oDBUtility.AddParameters("@OfferDiscountType", DBUtilDBType.Varchar, DBUtilDirection.In, 500, offers.OfferDiscountType);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_OFFERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                //return BadRequest(oServiceRequestProcessor.onError(ex.Message));
                return BadRequest(ex.Message);
            }
        }

        [Route("offers/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.Offers offers)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@OfferID", DBUtilDBType.Integer, DBUtilDirection.In, 10, offers.OfferID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 50, offers.CompanyID);
                oDBUtility.AddParameters("@OfferName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, offers.OfferName);
                oDBUtility.AddParameters("@OfferDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, offers.OfferDescription);
                oDBUtility.AddParameters("@OfferStartDate ", DBUtilDBType.DateTime, DBUtilDirection.In, 10, offers.OfferStartDate);
                oDBUtility.AddParameters("@OfferEndDate", DBUtilDBType.DateTime, DBUtilDirection.In, 500, offers.OfferEndDate);
                oDBUtility.AddParameters("@OfferDiscount", DBUtilDBType.Numeric, DBUtilDirection.In, -1, offers.OfferDiscount);
                oDBUtility.AddParameters("@OfferDiscountType", DBUtilDBType.Varchar, DBUtilDirection.In, 10, offers.OfferDiscountType);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 500, offers.ModifiedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_OFFERS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                //return BadRequest(oServiceRequestProcessor.onError(ex.Message));
                return BadRequest(ex.Message);
            }
        }
        
    }
}
