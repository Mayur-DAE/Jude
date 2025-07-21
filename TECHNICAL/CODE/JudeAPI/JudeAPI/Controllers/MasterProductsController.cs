using JudeAPI.Models;
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
    public class MasterProductsController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public MasterProductsController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
               
        [HttpGet]
        public IActionResult Get([FromQuery] int? MasterProductID, [FromQuery] int? ProductCategoryID, 
                                 [FromQuery] int? ProductSubCategoryID, [FromQuery] int? TaxSlabID, 
                                 [FromQuery] string MasterProductName,[FromQuery] bool? IsActive)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (MasterProductID.HasValue)
                {
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, MasterProductID.Value);
                }

                if (ProductCategoryID.HasValue)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, ProductCategoryID.Value);
                }

                if (ProductSubCategoryID.HasValue)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, ProductSubCategoryID.Value);
                }

                if (TaxSlabID.HasValue)
                {
                    oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, TaxSlabID.Value);
                }

                if (!string.IsNullOrEmpty(MasterProductName))
                {
                    oDBUtility.AddParameters("@MasterProductName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 100, MasterProductName);
                }

                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_MASTER_PRODUCTS");
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
        public IActionResult Post(InsertMasterProductModel masterProducts)
        {
            try
            {

                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductSubCategoryID);                
                oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.TaxSlabID);
                oDBUtility.AddParameters("@MasterProductName ", DBUtilDBType.Nvarchar, DBUtilDirection.In, 100, masterProducts.MasterProductName);
                oDBUtility.AddParameters("@MasterProductDescription ", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, masterProducts.MasterProductDescription != null ? masterProducts.MasterProductDescription : "" );
                oDBUtility.AddParameters("@MasterProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, masterProducts.MasterProductPrice);
                oDBUtility.AddParameters("@MasterProductImageThumbnailImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, masterProducts.MasterProductImageThumbnailImagePath != null ? masterProducts.MasterProductImageThumbnailImagePath : "");
                oDBUtility.AddParameters("@MasterProductImageLargeImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, masterProducts.MasterProductImageLargeImagePath != null ? masterProducts.MasterProductImageLargeImagePath : "");               
                oDBUtility.AddParameters("@MasterProductUnit ", DBUtilDBType.Varchar, DBUtilDirection.In, 50, masterProducts.MasterProductUnit != null ? masterProducts.MasterProductUnit : "");
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, masterProducts.IsActive);                
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.CreatedBy);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_MASTER_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("masterProducts/update")]
        [HttpPost]
        public IActionResult Post(UpdateMasterProductModel masterProducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                
                oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.MasterProductID);

                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ModifiedBy);
                
                if (masterProducts.ProductCategoryID != null)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductCategoryID);
                }

                if (masterProducts.ProductSubCategoryID != null)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.ProductSubCategoryID);
                }

                if (masterProducts.TaxSlabID != null)
                {
                    oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.TaxSlabID);
                }

                if (masterProducts.MasterProductName != null)
                {
                    oDBUtility.AddParameters("@MasterProductName ", DBUtilDBType.Nvarchar, DBUtilDirection.In, 100, masterProducts.MasterProductName);
                }

                if (masterProducts.MasterProductDescription != null)
                {
                    oDBUtility.AddParameters("@MasterProductDescription ", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, masterProducts.MasterProductDescription);
                }

                if(masterProducts.MasterProductPrice != 0) 
                { 
                    oDBUtility.AddParameters("@MasterProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, masterProducts.MasterProductPrice);
                }

                if (masterProducts.MasterProductImageThumbnailImagePath != null)
                {
                    oDBUtility.AddParameters("@MasterProductImageThumbnailImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, masterProducts.MasterProductImageThumbnailImagePath);
                }

                if (masterProducts.MasterProductImageLargeImagePath != null)
                {
                    oDBUtility.AddParameters("@MasterProductImageLargeImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, masterProducts.MasterProductImageLargeImagePath);
                }
                
                if(masterProducts.MasterProductUnit != null)
                {
                    oDBUtility.AddParameters("@MasterProductUnit ", DBUtilDBType.Varchar, DBUtilDirection.In, 50, masterProducts.MasterProductUnit);
                }
                
                if (masterProducts.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, masterProducts.IsActive);
                }
                               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_MASTER_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }



     
        [HttpPost ("AddMasterProductLanguage")]
        public IActionResult AddMasterProductLanguage([FromBody] dynamic  masterProducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                int  masterProductID = masterProducts.MasterProductID;
                oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProductID);
                oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_MASTER_PRODUCT_LANGUAGE");


                // Sample processing of data
                foreach (var caption in masterProducts.CaptionDetails)
                {
                    Console.WriteLine($"Language: {caption.LanguageCaption}, Name: {caption.Name}, Description: {caption.Description}");

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, caption.LanguageId);
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProductID);
                    oDBUtility.AddParameters("@MasterProductName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, caption.Name);
                    oDBUtility.AddParameters("@MasterProductDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, -1, caption.Description);

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_MASTER_PRODUCT_LANGUAGE");
                }

                return Ok(new { message = "Product category added successfully.", status_code = 100 });
            }
            catch (Exception ex)
            {
                return Ok(new { status_code = 300 });
            }
        }


        [  HttpPost ("GetMasterProductLanguage")]
        public IActionResult GetMasterProductLanguage(MasterProductsLanguage masterProducts)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (masterProducts.MasterProductID != 0)
                {
                    oDBUtility.AddParameters("@MasterProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, masterProducts.MasterProductID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_MASTER_PRODUCT_LANGUAGE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }


        [HttpGet("GetMasterProductsOnCategory")]
        public IActionResult GetProd([FromQuery] int? ProductCategoryID,
                                 [FromQuery] int? ProductSubCategoryID, 
                                  [FromQuery] bool? IsActive,
                                  [FromQuery] int? LanguageID)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (ProductCategoryID.HasValue)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, ProductCategoryID.Value);
                }

                if (ProductSubCategoryID.HasValue)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, ProductSubCategoryID.Value);
                }

                if (IsActive.HasValue)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, IsActive.Value);
                }
                if (LanguageID.HasValue)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, LanguageID.Value);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_MASTER_PRODUCTS_BASED_ON_CATEGORY");
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

//IF we wantto multiple verv method
// GET: api/MasterProducts/get
//[HttpGet("get")]

// POST: api/MasterProducts/create
//[HttpPost("create")]

// PUT: api/MasterProducts/update
//[HttpPut("update")]

// DELETE: api/MasterProducts/delete
//[HttpDelete("delete/{id}")]