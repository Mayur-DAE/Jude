using JudeAPI.Models;
using DAE.DAL.SQL;
using DaeConfiguration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System;

namespace JudeAPI.Controllers
{
    [ApiController]
    public class EnquiryController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public EnquiryController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }

        [Route("enquiry/get")]
        [HttpPost]
        public IActionResult Get(Enquiry enquiry)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (enquiry.EnquiryID != 0)
                {
                    oDBUtility.AddParameters("@EnquiryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, enquiry.EnquiryID);
                }

                if (enquiry.FirstName != null)
                {
                    oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, enquiry.FirstName);
                }

                if (enquiry.LastName != null)
                {
                    oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, enquiry.LastName);
                }

                if (enquiry.EmailID != null)
                {
                    oDBUtility.AddParameters("@EmailID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, enquiry.EmailID);
                }

                if (enquiry.MobileNumber != null)
                {
                    oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 12, enquiry.MobileNumber);
                }
                if (enquiry.Message != null)
                {
                    oDBUtility.AddParameters("@Message", DBUtilDBType.Nvarchar, DBUtilDirection.In, 1000, enquiry.Message);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_ENQUIRY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("enquiry/insert")]
        [HttpPost]
        public IActionResult Post(Enquiry enquiry)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@FirstName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, enquiry.FirstName);
                oDBUtility.AddParameters("@LastName", DBUtilDBType.Varchar, DBUtilDirection.In, 50, enquiry.LastName);
                oDBUtility.AddParameters("@EmailID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, enquiry.EmailID);
                oDBUtility.AddParameters("@MobileNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 12, enquiry.MobileNumber);
                oDBUtility.AddParameters("@Message", DBUtilDBType.Nvarchar, DBUtilDirection.In, 1000, enquiry.Message);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_ENQUIRY");
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
