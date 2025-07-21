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
    public class ServiceProviderController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;
        public ServiceProviderController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("ServiceProvider/get")]
        [HttpPost]
        public IActionResult GetServiceProvider(JudeAPI.Models.ServiceProvider serviceProvider)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (serviceProvider.ServiceProviderID != 0)
                {
                    oDBUtility.AddParameters("@ServiceProviderID", DBUtilDBType.Integer, DBUtilDirection.In, 10, serviceProvider.ServiceProviderID);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SERVICE_PROVIDER");
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
