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
    public class SearchContoller : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;
    
    public SearchContoller(IDaeConfigManager configuration)
    {
        this._configurationIG = configuration;

    }

        [Route("searchText")]
        [HttpPost]
        public IActionResult Post(DataSearch dataSearch)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Search", DBUtilDBType.Varchar, DBUtilDirection.In, 500 , dataSearch.Search);
                

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SEARCH_COMPANY_OR_PRODUCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [Route("searchByLatLong")]
        [HttpPost]
        public IActionResult searchByLatLong(DataSearch dataSearch)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Search", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Search);
                oDBUtility.AddParameters("@Lat", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Latitude);
                oDBUtility.AddParameters("@Long", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Longitude);


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SEARCH_COMPANY_OR_PRODUCT_BY_LAT_LONG");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [Route("searchCompProd")]
        [HttpPost]
        public IActionResult searchCompProd(DataSearch dataSearch)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@Search", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Search);
                oDBUtility.AddParameters("@Lat", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Latitude);
                oDBUtility.AddParameters("@Long", DBUtilDBType.Varchar, DBUtilDirection.In, 500, dataSearch.Longitude);
                oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, dataSearch.LanguageID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SEARCH_COMPANY_OR_PRODUCT_ON_SEARCH");
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
