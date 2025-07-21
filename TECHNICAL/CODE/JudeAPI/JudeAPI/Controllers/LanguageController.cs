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
    public class LanguageController : ControllerBase
    {

        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public LanguageController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] int? LanguageId)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (LanguageId.HasValue)
                {
                    oDBUtility.AddParameters("@LanguageId", DBUtilDBType.Integer, DBUtilDirection.In, 10, LanguageId.Value);
                }
              //  oDBUtility.AddParameters("@IsActive", DBUtilDBType.Integer, DBUtilDirection.In, 10, IsActive);


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_LANGUAGE");
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
