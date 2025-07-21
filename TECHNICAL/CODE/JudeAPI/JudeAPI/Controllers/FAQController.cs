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
    public class FAQController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public FAQController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }

        [Route("faq/get")]
        [HttpPost]
        public IActionResult Get(FAQ faq)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (faq.FAQID != 0)
                {
                    oDBUtility.AddParameters("@FAQID", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.FAQID);
                }

                if (faq.IsApproved != null)
                {
                    oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsApproved);
                }

                if (faq.IsPublished != null)
                {
                    oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsPublished);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_FAQ");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("faq/insert")]
        [HttpPost]
        public IActionResult Post(FAQ faq)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Faq_Title", DBUtilDBType.Varchar, DBUtilDirection.In, 250, faq.FAQTitle);
                oDBUtility.AddParameters("@Faq_Answer", DBUtilDBType.Varchar, DBUtilDirection.In, 5000, faq.FAQAnswer);
                oDBUtility.AddParameters("@Is_Approved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsApproved);
                oDBUtility.AddParameters("@Is_Published", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsPublished);
                oDBUtility.AddParameters("@Created_By", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_FAQ");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

    }


        [Route("faq/update")]
        [HttpPost]
        public IActionResult Put(FAQ faq)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Faq_Id", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.FAQID);
                oDBUtility.AddParameters("@Faq_Title", DBUtilDBType.Varchar, DBUtilDirection.In, 250, faq.FAQTitle);
                oDBUtility.AddParameters("@Faq_Answer", DBUtilDBType.Varchar, DBUtilDirection.In, 5000, faq.FAQAnswer);
                oDBUtility.AddParameters("@Faq_Approval", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsApproved);
                oDBUtility.AddParameters("@Faq_Publish", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsPublished);
                oDBUtility.AddParameters("@Modified_By", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_FAQ");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        
    }


        [Route("faq/approval")]
        [HttpPost]
        public IActionResult Putapproval(FAQ faq)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Faq_Id", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.FAQID);
                oDBUtility.AddParameters("@Faq_Approval", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsApproved);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_FAQ_APPROVAL");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("faq/publish")]
        [HttpPost]
        public IActionResult Putpublish(FAQ faq)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Faq_Id", DBUtilDBType.Integer, DBUtilDirection.In, 10, faq.FAQID);
                oDBUtility.AddParameters("@Faq_Publish", DBUtilDBType.Boolean, DBUtilDirection.In, 10, faq.IsPublished);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_FAQ_PUBLISH");
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
