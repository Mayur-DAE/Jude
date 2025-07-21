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
    public class ReportExpiredShopController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public ReportExpiredShopController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("ReportExpiredShop/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                }
                if (company.CompanyName != null)
                {
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyName);
                }
                if (company.CompanyMemberShipExpiryDate != null)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipExpiryDate", DBUtilDBType.DateTime, DBUtilDirection.In, 10, company.CompanyMemberShipExpiryDate);
                }
                if (company.FromDate != null)
                {
                    oDBUtility.AddParameters("@FromDate", DBUtilDBType.DateTime, DBUtilDirection.In, 10, company.FromDate);
                }
                if (company.@ToDate != null)
                {
                    oDBUtility.AddParameters("@ToDate", DBUtilDBType.DateTime, DBUtilDirection.In, 10, company.ToDate);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_Report_expired_shop");
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
