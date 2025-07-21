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
    public class BusinessTypesController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public BusinessTypesController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("businessTypes/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.BusinessTypes businessTypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (businessTypes.BusinessTypeID != 0)
                {
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.BusinessTypeID);
                }

                if (businessTypes.BusinessTypeName != null)
                {
                    oDBUtility.AddParameters("@BusinessTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, businessTypes.BusinessTypeName);
                }

                if (businessTypes.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, businessTypes.IsActive);
                }

                if (businessTypes.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.CreatedBy);
                }

                if (businessTypes.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, businessTypes.CreatedDate);
                }

                if (businessTypes.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.ModifiedBy);
                }

                if (businessTypes.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, businessTypes.ModifiedDate);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_BUSINESS_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("businessTypes/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.BusinessTypes businessTypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@BusinessTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, businessTypes.BusinessTypeName);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, businessTypes.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.CreatedBy);
                             
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_BUSINESS_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("businessTypes/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.BusinessTypes businessTypes)
        {

            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.BusinessTypeID);
                oDBUtility.AddParameters("@BusinessTypeName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, businessTypes.BusinessTypeName);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, businessTypes.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.ModifiedBy);
                                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPADTE_BUSINESS_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("businessTypes/delete")]
        [HttpPost]
        public IActionResult Delete(int id)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, id);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_BUSINESS_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

           
        }

        [Route("businessTypes/Isactive")]
        [HttpPost]
        public IActionResult PutIsactive(JudeAPI.Models.BusinessTypes businessTypes)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.BusinessTypeID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 500, businessTypes.IsActive);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_BUSINESS_TYPE_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("businessTypesLanguage/add")]
        [HttpPost]
        public IActionResult AddBusinessTypeLanguage([FromBody] dynamic businessTypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                int businessTypeID = businessTypes.BusinessTypeID;
                oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypeID);
                oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_BUSINESS_TYPE_LANGUAGE");


                // Sample processing of data
                foreach (var caption in businessTypes.CaptionDetails)
                {
                    Console.WriteLine($"Language: {caption.LanguageCaption}, Name: {caption.Name}, Description: {caption.Description}");

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, caption.LanguageId);
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypeID);
                    oDBUtility.AddParameters("@BusinessTypeName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, caption.Name);

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_BUSINESS_TYPE_LANGUAGE");
                }

                return Ok(new { message = "Business Type added successfully.", status_code = 100 });
            }
            catch (Exception ex)
            {
                return Ok(new { status_code = 300 });
            }
        }


        [Route("businessTypesLanguage/get")]
        [HttpPost]
        public IActionResult GetBusinessTypeLanguage(BusinessTypes businessTypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (businessTypes.BusinessTypeID != 0)
                {
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.BusinessTypeID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_BUSINESS_TYPE_LANGUAGE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }
        [Route("businessTypes/Listing")]
        [HttpPost]
        public IActionResult Listing(BusinessTypes businessTypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (businessTypes.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, businessTypes.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_BUSINESS_TYPE_LISTING");
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
