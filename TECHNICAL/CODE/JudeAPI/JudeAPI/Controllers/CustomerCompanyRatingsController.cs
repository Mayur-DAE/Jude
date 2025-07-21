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
    public class CustomerCompanyRatingsController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CustomerCompanyRatingsController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("review/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.CustomerCompanyRatings customerCompanyRatings)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (customerCompanyRatings.CustomerCompanyRatingID != 0)
                {
                    oDBUtility.AddParameters("@CustomerCompanyRatingID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.CustomerCompanyRatingID);
                }

                if (customerCompanyRatings.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.CompanyID);
                }
                if (customerCompanyRatings.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.UserID);
                }

                if (customerCompanyRatings.IsPublished != null)
                {
                    oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, customerCompanyRatings.IsPublished);

                }
                if (customerCompanyRatings.PublishApprovedBy != 0)
                {
                    oDBUtility.AddParameters("@PublishApprovedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.PublishApprovedBy);
                }


                if (customerCompanyRatings.PublishedDate != null)
                {
                    oDBUtility.AddParameters("@PublishedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, customerCompanyRatings.PublishedDate);
                }

                if (customerCompanyRatings.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, customerCompanyRatings.CreatedDate);
                }

                if (customerCompanyRatings.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, customerCompanyRatings.ModifiedDate);
                }
                if (customerCompanyRatings.CustomerCompanyRating != 0)
                {
                    oDBUtility.AddParameters("@CustomerCompanyRating", DBUtilDBType.Byte, DBUtilDirection.In, 10, customerCompanyRatings.CustomerCompanyRating);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CUSTOMER_COMPANY_RATINGS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        //[Route("review/GetByID")]
        //[HttpGet]
        //public JsonResult Get_BY_Review_ID(int id)
        //{
        //    try
        //    {
        //        DBUtility oDBUtility = new DBUtility(_configurationIG);
        //        oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, id);
        //        DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CUSTOMER_COMPANY_RATINGS");

        //        if (ds.Tables.Count > 0)
        //        {
        //            DataTable table = ds.Tables[0];

        //            if (table.Rows.Count > 0)
        //            {
        //                return new JsonResult(table);
        //            }
        //            else
        //            {
        //                return new JsonResult(null);
        //            }

        //        }
        //        else
        //        {
        //            return new JsonResult(null);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new JsonResult(null);
        //    }
        //}

        [Route("review/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.CustomerCompanyRatings customerCompanyRatings)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
            
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.CompanyID);
                oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.UserID);
                oDBUtility.AddParameters("@CustomerName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, customerCompanyRatings.CustomerName);
                oDBUtility.AddParameters("@CustomerCompanyRating", DBUtilDBType.Byte, DBUtilDirection.In, 1, customerCompanyRatings.CustomerCompanyRating);
                oDBUtility.AddParameters("@CustomerRatingHeader", DBUtilDBType.Varchar, DBUtilDirection.In, 100, customerCompanyRatings.CustomerRatingHeader);
                oDBUtility.AddParameters("@CustomerRatingDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, customerCompanyRatings.CustomerRatingDescription);
                oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In,10, customerCompanyRatings.IsPublished);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_CUSTOMER_COMPANY_RATINGS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }   
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("review/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.CustomerCompanyRatings customerCompanyRatings)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CustomerCompanyRatingID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.CustomerCompanyRatingID);
                oDBUtility.AddParameters("@PublishApprovedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.PublishApprovedBy);
                oDBUtility.AddParameters("@PublishedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 10, customerCompanyRatings.PublishedDate);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_CUSTOMER_COMPANY_RATINGS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("review/isPublished")]
        [HttpPost]
        public IActionResult PutIsPublished(CustomerCompanyRatings customerCompanyRatings)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CustomerCompanyRatingID", DBUtilDBType.Integer, DBUtilDirection.In, 10, customerCompanyRatings.CustomerCompanyRatingID);
                oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, customerCompanyRatings.IsPublished);
              
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_CUSTOMER_COMPANY_RATINGS_ISPUBLISHED");
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
