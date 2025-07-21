using JudeAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using DaeConfiguration;
using DAE.DAL.SQL;
using System.Data;
using System;

namespace JudeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CompanyProductsController : Controller
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public CompanyProductsController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [HttpGet]
        public IActionResult Get(
            [FromQuery] int? CompanyProductID,
            [FromQuery] int? CompanyID,
            [FromQuery] int? MasterProductID,
            [FromQuery] bool? IsPublished,
            [FromQuery] bool? IsApproved)
         {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (CompanyProductID.HasValue && CompanyProductID.Value != 0)
                {
                    oDBUtility.AddParameters("@CompanyProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyProductID.Value);
                }

                if (CompanyID.HasValue && CompanyID.Value != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyID.Value);
                }

                if (MasterProductID.HasValue && MasterProductID.Value != 0)
                {
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, MasterProductID.Value);
                }

                if (IsPublished.HasValue)
                {
                    oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsPublished.Value);
                }

                if (IsApproved.HasValue)
                {
                    oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsApproved.Value);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [HttpPost]
        public IActionResult Post(InsertCompanyProducts companyProducts)
        {
            try
             {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.MasterProductID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.CompanyID);           
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyProducts.ProductPrice);
                oDBUtility.AddParameters("@DiscountType", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyProducts.DiscountType != null ? companyProducts.DiscountType : "" );
                oDBUtility.AddParameters("@DiscountPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyProducts.DiscountPrice != null ? companyProducts.DiscountPrice : 0);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyProducts.IsActive);              
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.CreatedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("companyProducts/update")]
        [HttpPost]
        public IActionResult Post(UpdateCompanyProducts companyProducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@CompanyProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.CompanyProductID);

                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.ModifiedBy);

                if (companyProducts.ProductPrice != null)
                {
                    oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Integer, DBUtilDirection.In, 10, companyProducts.ProductPrice);
                }

                if (companyProducts.DiscountType != null)
                {
                    oDBUtility.AddParameters("@DiscountType", DBUtilDBType.Varchar, DBUtilDirection.In, 10, companyProducts.DiscountType);
                }

                if (companyProducts.DiscountPrice != null)
                {
                    oDBUtility.AddParameters("@DiscountPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, companyProducts.DiscountPrice);
                }

                if (companyProducts.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, companyProducts.IsActive);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_COMPANY_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [HttpGet("GetCompanyProductsForShop")]
        public IActionResult GetProd(
            [FromQuery] int? CompanyProductID,
            [FromQuery] int? CompanyID,
            [FromQuery] bool? IsActive,
            [FromQuery] int? LanguageID)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (CompanyProductID.HasValue && CompanyProductID.Value != 0)
                {
                    oDBUtility.AddParameters("@CompanyProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyProductID.Value);
                }

                if (CompanyID.HasValue && CompanyID.Value != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyID.Value);
                }


                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }

                if (LanguageID.HasValue)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, LanguageID.Value);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_PRODUCTS_FOR_SHOP");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [HttpGet("GetCompanyForMasterProduct")]
        public IActionResult GetComp(
            [FromQuery] int? MasterProductID,
            [FromQuery] bool? IsActive,
            [FromQuery] int? LanguageID)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (MasterProductID.HasValue && MasterProductID.Value != 0)
                {
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, MasterProductID.Value);
                }

                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }
                if (LanguageID.HasValue)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, LanguageID.Value);
                }
                

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_FOR_MASTERPRODUCT");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [HttpGet("GetCompanyForMasterProductonSearch")]
        public IActionResult GetCompOnSearch(
            [FromQuery] int? MasterProductID,
            [FromQuery] decimal? Latitude,
            [FromQuery] decimal? Longitude,
            [FromQuery] bool? IsActive,
            [FromQuery] int? LanguageID)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (MasterProductID.HasValue && MasterProductID.Value != 0)
                {
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, MasterProductID.Value);
                }

                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }

                if (Latitude.HasValue )
                {
                    oDBUtility.AddParameters("@Lat", DBUtilDBType.Varchar, DBUtilDirection.In, 500, Latitude.Value);
                }

                if (Longitude.HasValue )
                {
                    oDBUtility.AddParameters("@Long", DBUtilDBType.Varchar, DBUtilDirection.In, 500, Longitude.Value);
                }
                if (LanguageID.HasValue)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, LanguageID.Value);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_FOR_MASTERPRODUCT_ON_SEARCH");
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
