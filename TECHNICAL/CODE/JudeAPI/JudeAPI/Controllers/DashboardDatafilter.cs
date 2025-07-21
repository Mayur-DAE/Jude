using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using DAE.DAL.SQL;
using DaeConfiguration;
using JudeAPI.Models;
using System;

namespace JudeAPI.Controllers
{
   
    [ApiController]
    public class DashboardDatafilter : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;

        public DashboardDatafilter(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("dashboard/todaysdata")]
        [HttpPost]
        public JsonResult Gettoday(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
                if (order.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                }
                

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD_TODAY");

                return new JsonResult(ds);
               // return "running";

            }
            catch (Exception ex)
            {
                 return new JsonResult(null);
                //return ex.StackTrace;
            }

        }
        [Route("dashboard/yearlydata")]
        [HttpPost]
        public JsonResult Getyearly(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
                if (order.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD_YEARLY");

                return new JsonResult(ds);

            }
            catch (Exception ex)
            {
                return new JsonResult(null);
            }

        }
        [Route("dashboard/quaterlydata")]
        [HttpPost]
        public JsonResult GetQuaterly(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
                if (order.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD_QUATERLY");

                return new JsonResult(ds);

            }
            catch (Exception ex)
            {
                return new JsonResult(null);
            }

        }
        [Route("dashboard/weekly")]
        [HttpPost]
        public JsonResult GetWeekly(Order order)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
                if (order.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD_WEEKLY");

                return new JsonResult(ds);

            }
            catch (Exception ex)
            {
                return new JsonResult(null);
            }

        }
        [Route("dashboard/monthly")]
        [HttpPost]
        public JsonResult GetMonthly(Order order)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (order.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.CompanyID);
                }
                if (order.UserID != 0)
                {
                    oDBUtility.AddParameters("@UserID", DBUtilDBType.Integer, DBUtilDirection.In, 10, order.UserID);
                }
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD_MONTHLY");

                return new JsonResult(ds);

            }
            catch (Exception ex)
            {
                return new JsonResult(null);
            }

        }
    }
}
