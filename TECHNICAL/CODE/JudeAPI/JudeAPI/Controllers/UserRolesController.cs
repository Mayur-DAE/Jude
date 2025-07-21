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
    public class UserRoles : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public UserRoles(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("userroles/get")]
        [HttpGet]
       
        public JsonResult GetUserRoles()
        {

            DBUtility oDBUtility = new DBUtility(_configurationIG);


            DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_USER_ROLES");

            if (ds.Tables.Count > 0)
            {
                DataTable table = ds.Tables[0];

                if (table.Rows.Count > 0)
                {
                    return new JsonResult(table);
                }
                else
                {
                    return new JsonResult(null);
                }

            }
            else
            {
                return new JsonResult(null);
            }

        }
    }
}
