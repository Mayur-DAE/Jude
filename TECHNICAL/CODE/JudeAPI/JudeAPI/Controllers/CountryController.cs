using JudeAPI.Models;
using DAE.DAL.SQL;
using DaeConfiguration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System;

namespace JudeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CountryController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [HttpGet("Currency")]
        public IActionResult Get(
            [FromQuery] bool? IsActive)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_CURRENCY");
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
