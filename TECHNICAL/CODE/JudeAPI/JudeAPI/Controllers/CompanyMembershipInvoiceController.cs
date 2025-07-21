using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System;
using JudeAPI.Models;

using System.Threading.Tasks;

namespace JudeAPI.Controllers
{
    
    [ApiController]
    public class CompanyMembershipInvoiceController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CompanyMembershipInvoiceController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("companyMembershipinvoice/get")]
        [HttpPost]
        public IActionResult Get(CompanyMembershipInvoice companyMembershipinvoice)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (companyMembershipinvoice.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyMembershipinvoice.CompanyID);
                }

                if (companyMembershipinvoice.CompanyMembershipInvoiceID != 0)
                {
                    oDBUtility.AddParameters("@CompanyMembershipInvoiceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyMembershipinvoice.CompanyMembershipInvoiceID);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GenerateCompanyMemberShipInvoice");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("companyMembershipinvoice/insert")]
        [HttpPost]
        public IActionResult Post(CompanyMembershipInvoice companyMembershipinvoice)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@ReferenceNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 100, companyMembershipinvoice.ReferenceNumber);
                oDBUtility.AddParameters("@PaymentMode", DBUtilDBType.Varchar, DBUtilDirection.In, 50, companyMembershipinvoice.PaymentMode);
                oDBUtility.AddParameters("@CompanyMemberShipStartDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companyMembershipinvoice.CompanyMemberShipStartDate);
                oDBUtility.AddParameters("@CompanyMemberShipExpiryDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companyMembershipinvoice.@CompanyMemberShipExpiryDate);
                oDBUtility.AddParameters("@InvoiceDate", DBUtilDBType.Date, DBUtilDirection.In, 100, companyMembershipinvoice.InvoiceDate);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyMembershipinvoice.CompanyID);
                oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyMembershipinvoice.CompanyMemberShipTypeID);
                oDBUtility.AddParameters("@SGST", DBUtilDBType.Numeric, DBUtilDirection.In, 10, companyMembershipinvoice.SGST);
                oDBUtility.AddParameters("@CGST", DBUtilDBType.Numeric, DBUtilDirection.In, 10, companyMembershipinvoice.CGST);
                oDBUtility.AddParameters("@IGST", DBUtilDBType.Numeric, DBUtilDirection.In, 10, companyMembershipinvoice.IGST);
                oDBUtility.AddParameters("@InvoiceTotal", DBUtilDBType.Numeric, DBUtilDirection.In, 10, companyMembershipinvoice.InvoiceTotal);
                oDBUtility.AddParameters("@InvoiceAmount", DBUtilDBType.Numeric, DBUtilDirection.In, 10, companyMembershipinvoice.InvoiceAmount);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyMembershipinvoice.CreatedBy);



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_InsertCompanyMembershipInvoice");
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
