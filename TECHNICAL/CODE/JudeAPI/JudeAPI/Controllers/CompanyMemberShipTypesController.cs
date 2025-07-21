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
    public class CompanyMemberShipTypes : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CompanyMemberShipTypes(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }

        [Route("companyMemberShipTypes/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.CompanyMemberShipTypes companyembershiptypes)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (companyembershiptypes.CompanyMemberShipTypeID != 0)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.CompanyMemberShipTypeID);
                }

                if (companyembershiptypes.TaxSlabID != 0)
                {
                    oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.TaxSlabID);
                }

                if (companyembershiptypes.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyembershiptypes.IsActive);
                }


                if (companyembershiptypes.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.CreatedBy);
                }

                if (companyembershiptypes.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companyembershiptypes.CreatedDate);
                }

                if (companyembershiptypes.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.ModifiedBy);
                }

                if (companyembershiptypes.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, companyembershiptypes.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_MEMBERSHIP_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        [Route("companyMemberShipTypes/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.CompanyMemberShipTypes companyembershiptypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyMemberShipName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyembershiptypes.CompanyMemberShipName);
                oDBUtility.AddParameters("@CompanyMembershipFees", DBUtilDBType.Decimal, DBUtilDirection.In, 500, companyembershiptypes.CompanyMembershipFees);
                oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 500, companyembershiptypes.TaxSlabID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 5, companyembershiptypes.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY_MEMBERSHIP_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companyMemberShipTypes/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.CompanyMemberShipTypes companyembershiptypes)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.CompanyMemberShipTypeID);
                oDBUtility.AddParameters("@CompanyMemberShipName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companyembershiptypes.CompanyMemberShipName);
                oDBUtility.AddParameters("@CompanyMembershipFees", DBUtilDBType.Decimal, DBUtilDirection.In, 5, companyembershiptypes.CompanyMembershipFees);
                oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.TaxSlabID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyembershiptypes.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 500, companyembershiptypes.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_COMPANY_MEMBERSHIP_TYPE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companyMemberShipTypes/Isactive")]
        [HttpPost]
        public IActionResult PutIsactive(JudeAPI.Models.CompanyMemberShipTypes companyembershiptypes)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.CompanyMemberShipTypeID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 500, companyembershiptypes.IsActive);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_COMPANY_MEMBERSHIP_TYPE_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("taxSlabs/get")]
        [HttpPost]
        public IActionResult GetTaxSlabs(JudeAPI.Models.CompanyMemberShipTypes companyembershiptypes)
        {

            try
            {

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (companyembershiptypes.TaxSlabID != 0)
                {
                    oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyembershiptypes.TaxSlabID);
                }
                if (companyembershiptypes.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyembershiptypes.IsActive);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_TAXSLABS");
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
