using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System;
using JudeAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace JudeAPI.Controllers
{
    [ApiController]
    public class CompanyBankDetailsController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public CompanyBankDetailsController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("companybankdetails/get")]
        [HttpPost]
        public IActionResult CompanyBankDetails(JudeAPI.Models.CompanyBankDetails companybankdetails)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (companybankdetails.CompanyBankDetailsID != 0)
                {
                    oDBUtility.AddParameters("@CompanyBankDetailsID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companybankdetails.CompanyBankDetailsID);
                }

                if (companybankdetails.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companybankdetails.CompanyID);
                }
                if (companybankdetails.UPIID != null)
                {
                    oDBUtility.AddParameters("@UPIID", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.UPIID);
                }
                if (companybankdetails.BankName != null)
                {
                    oDBUtility.AddParameters("@BankName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.BankName);
                }
                if (companybankdetails.BankBranchName != null)
                {
                    oDBUtility.AddParameters("@BankBranchName", DBUtilDBType.Varchar, DBUtilDirection.In, 5000, companybankdetails.BankBranchName);
                }
                if (companybankdetails.AccountHolderName != null)
                {
                    oDBUtility.AddParameters("@AccountHolderName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.AccountHolderName);
                }
                if (companybankdetails.AccountNumber != null)
                {
                    oDBUtility.AddParameters("@AccountNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 20, companybankdetails.AccountNumber);
                }
                if (companybankdetails.IFSC != null)
                {
                    oDBUtility.AddParameters("@IFSC", DBUtilDBType.Varchar, DBUtilDirection.In, 20, companybankdetails.IFSC);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_BANK_DETAILS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        [Route("companybankdetails/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.CompanyBankDetails companybankdetails)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (companybankdetails.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 100, companybankdetails.CompanyID);
                }
                if (companybankdetails.UPIID != null)
                {
                    oDBUtility.AddParameters("@UPIID", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.UPIID);
                }
                if (companybankdetails.BankName != null)
                {
                    oDBUtility.AddParameters("@BankName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.BankName);
                }
                if (companybankdetails.BankBranchName != null)
                {
                    oDBUtility.AddParameters("@BankBranchName", DBUtilDBType.Varchar, DBUtilDirection.In, 5000, companybankdetails.BankBranchName);
                }
                if (companybankdetails.AccountHolderName != null)
                {
                    oDBUtility.AddParameters("@AccountHolderName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.AccountHolderName);
                }
                if (companybankdetails.AccountNumber != null)
                {
                    oDBUtility.AddParameters("@AccountNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 20, companybankdetails.AccountNumber);
                }
                if (companybankdetails.IFSC != null)
                {
                    oDBUtility.AddParameters("@IFSC", DBUtilDBType.Varchar, DBUtilDirection.In, 20, companybankdetails.IFSC);
                }
                oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companybankdetails.IsDefault);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companybankdetails.CreatedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY_BANK_DETAILS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("companybankdetails/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.CompanyBankDetails companybankdetails)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyBankDetailsID", DBUtilDBType.Integer, DBUtilDirection.In, 100, companybankdetails.CompanyBankDetailsID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 100, companybankdetails.CompanyID);
                oDBUtility.AddParameters("@UPIID", DBUtilDBType.Varchar, DBUtilDirection.In, 100, companybankdetails.UPIID);
                oDBUtility.AddParameters("@BankName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.BankName);
                oDBUtility.AddParameters("@BankBranchName", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, companybankdetails.BankBranchName);
                oDBUtility.AddParameters("@AccountHolderName", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, companybankdetails.AccountHolderName);
                oDBUtility.AddParameters("@AccountNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 500, companybankdetails.AccountNumber);
                oDBUtility.AddParameters("@IFSC", DBUtilDBType.Varchar, DBUtilDirection.In, 20, companybankdetails.IFSC);
                oDBUtility.AddParameters("@IsDefault", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companybankdetails.IsDefault);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companybankdetails.ModifiedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPADTE_COMPANY_BANK_DETAILS");
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
