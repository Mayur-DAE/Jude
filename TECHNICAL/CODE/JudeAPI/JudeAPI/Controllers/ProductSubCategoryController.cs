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
    public class ProductSubCategoryController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public ProductSubCategoryController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("productSubCategory/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.ProductSubCategory productsubCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (productsubCategory.ProductSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductSubCategoryID);
                }

                if (productsubCategory.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductCategoryID);
                }
                if (productsubCategory.ProductSubCategoryShortName != null)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryShortName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, productsubCategory.ProductSubCategoryShortName);
                }

                if (productsubCategory.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, productsubCategory.IsActive);
                }

                if (productsubCategory.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.CreatedBy);
                }

                if (productsubCategory.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, productsubCategory.CreatedDate);
                }

                if (productsubCategory.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ModifiedBy);
                }

                if (productsubCategory.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, productsubCategory.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_SUB_CATEGORY");

                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("productSubCategory/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.ProductSubCategory productsubCategory)
        {
            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryShortName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, productsubCategory.ProductSubCategoryShortName);
                oDBUtility.AddParameters("@ProductSubCategoryDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryDescription);
                oDBUtility.AddParameters("@ProductSubCategoryLargePhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryLargePhotoPath);
                oDBUtility.AddParameters("@ProductSubCategoryThumbNailPhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryThumbNailPhotoPath);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productsubCategory.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.CreatedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_PRODUCT_SUB_CATEGORY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("productSubCategory/update")]
        [HttpPost]

        public IActionResult Put(ProductSubCategory productsubCategory)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductSubCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryShortName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, productsubCategory.ProductSubCategoryShortName);
                oDBUtility.AddParameters("@ProductSubCategoryDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryDescription);
                if(productsubCategory.ProductSubCategoryLargePhotoPath != null)
                    oDBUtility.AddParameters("@ProductSubCategoryLargePhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryLargePhotoPath);
                if(productsubCategory.ProductSubCategoryThumbNailPhotoPath != null)
                    oDBUtility.AddParameters("@ProductSubCategoryThumbNailPhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productsubCategory.ProductSubCategoryThumbNailPhotoPath);

                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productsubCategory.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ModifiedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCT_SUB_CATEGORY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));

            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productSubCategory/IsActive")]
        [HttpPost]
        public IActionResult PutIsActive(ProductSubCategory productsubCategory)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productsubCategory.ProductSubCategoryID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productsubCategory.IsActive);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCT_SUBCATEGORY_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productSubCategoryImage/path")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                 return new JsonResult("anonymous.png");
            }
        }

        [Route("productSubCategoryLanguage/add")]
        [HttpPost]
        public IActionResult AddProductSubCategoryLanguage([FromBody] dynamic productSubCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                int productSubCategoryID = productSubCategory.ProductSubCategoryID;
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productSubCategoryID);
                oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_PRODUCT_SUB_CATEGORY_LANGUAGE");


                // Sample processing of data
                foreach (var caption in productSubCategory.CaptionDetails)
                {
                    Console.WriteLine($"Language: {caption.LanguageCaption}, Name: {caption.Name}, Description: {caption.Description}");

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, caption.LanguageId);
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productSubCategoryID);
                    oDBUtility.AddParameters("@ProductSubCategoryShortName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, caption.Name);
                    oDBUtility.AddParameters("@ProductSubCategoryDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, -1, caption.Description);

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_PRODUCT_SUB_CATEGORY_LANGUAGE");
                }

                return Ok(new { message = "Product subcategory added successfully.", status_code = 100 });
            }
            catch (Exception ex)
            {
                return Ok(new { status_code = 300 });
            }
        }


        [Route("productSubCategoryLanguage/get")]
        [HttpPost]
        public IActionResult GetCategorySubLanguage(ProductSubCategory productSubCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (productSubCategory.ProductSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productSubCategory.ProductSubCategoryID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_SUB_CATEGORY_LANGUAGE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }
        [Route("productSubCategory/Listing")]
        [HttpPost]
        public IActionResult Listing(JudeAPI.Models.ProductSubCategory productSubCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                if (productSubCategory.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productSubCategory.ProductCategoryID);
                }
                if (productSubCategory.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productSubCategory.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_SUB_CATEGORY_LISTING");
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
