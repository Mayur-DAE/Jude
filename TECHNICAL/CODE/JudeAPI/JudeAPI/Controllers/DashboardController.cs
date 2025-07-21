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
    public class DashboardController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public DashboardController(IDaeConfigManager configuration)
        {
            this._configurationIG = configuration;
        }
        [Route("dashboard/get")]
        [HttpPost]
        public JsonResult Get(Order order)
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

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_DASHBOARD");

                return new JsonResult(ds);

            }
            catch (Exception ex)
            {
                return new JsonResult(null);
            }
        }

        [Route("menu/get")]
        [HttpPost]
        public IActionResult GetMenu(JudeAPI.Models.UserRoles userRole)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (userRole.UserRoleID != 0)
                {
                    oDBUtility.AddParameters("@UserRoleID", DBUtilDBType.Integer, DBUtilDirection.In, 10, userRole.UserRoleID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_MENU_AS_PER_ROLE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        [Route("searchCompanyOrProduct/get")]
        [HttpPost]
        public IActionResult SearchCompanyOrProduct(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.SearchCompanyOrProduct != null)
                {
                    oDBUtility.AddParameters("@Search", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.SearchCompanyOrProduct);
                }

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


        [Route("searchCompanyOrProductDistinct/get")]
        [HttpPost]
        public IActionResult SearchCompanyOrProductDistinct(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.SearchCompanyOrProduct != null)
                {
                    oDBUtility.AddParameters("@Search", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.SearchCompanyOrProduct);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_SEARCH_COMPANY_OR_PRODUCT_DISTINCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }


        [Route("productforcompany/get")]
        [HttpPost]
        public IActionResult GetMasterProduct(MasterProductsforcompany masterProducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (masterProducts.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.CompanyID);
                }

                if (masterProducts.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductCategoryID.Value);
                }

                if (masterProducts.ProductSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductSubCategoryID.Value);
                }

                if (!string.IsNullOrEmpty(masterProducts.MasterProductName))
                {
                    oDBUtility.AddParameters("@ProductName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 100, masterProducts.MasterProductName.Trim());
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_FOR_COMPANY");

                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(ex.Message);

            }

        }

    }
}
