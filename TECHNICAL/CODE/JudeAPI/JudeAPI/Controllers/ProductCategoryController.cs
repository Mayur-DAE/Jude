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
    public class ProductCategoryController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public ProductCategoryController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("productCategory/get")]
        [HttpPost]
        public IActionResult Get(JudeAPI.Models.ProductCategory productCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
               
                if (productCategory.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ProductCategoryID);
                }

                if (productCategory.ProductCategoryShortName != null)
                {
                    oDBUtility.AddParameters("@ProductCategoryShortName ", DBUtilDBType.Varchar, DBUtilDirection.In, 500, productCategory.ProductCategoryShortName);
                }
                if (productCategory.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, productCategory.IsActive);
                }

                if (productCategory.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.CreatedBy);
                }

                if (productCategory.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, productCategory.CreatedDate);
                }

                if (productCategory.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ModifiedBy);
                }

                if (productCategory.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, productCategory.ModifiedDate);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_CATEGORY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("productCategory/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.ProductCategory productCategory)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryShortName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, productCategory.ProductCategoryShortName);
                oDBUtility.AddParameters("@ProductCategoryDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryDescription);
                oDBUtility.AddParameters("@ProductCategoryLargePhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryLargePhotoPath);
                oDBUtility.AddParameters("@ProductCategoryThumbNailPhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryThumbNailPhotoPath);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productCategory.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.CreatedBy);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_PRODUCT_CATEGORY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productCategory/update")]
        [HttpPost]
        public IActionResult Put(ProductCategory productCategory)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ProductCategoryID);
                oDBUtility.AddParameters("@ProductCategoryShortName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, productCategory.ProductCategoryShortName);
                oDBUtility.AddParameters("@ProductCategoryDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryDescription);
                oDBUtility.AddParameters("@ProductCategoryLargePhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryLargePhotoPath);
                oDBUtility.AddParameters("@ProductCategoryThumbNailPhotoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 8000, productCategory.ProductCategoryThumbNailPhotoPath);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productCategory.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCT_CATEGORY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productCategory/IsActive")]
        [HttpPost]
        public IActionResult PutIsActive(ProductCategory productCategory)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ProductCategoryID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, productCategory.IsActive);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCTCATEGORY_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productCategoryImage/path")]
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


        [Route("productCategoryLanguage/add")]
        [HttpPost]
        public IActionResult AddProductCategoryLanguage([FromBody] dynamic productCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                int productCategoryID = productCategory.ProductCategoryID;
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategoryID);
                oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_PRODUCT_CATEGORY_LANGUAGE");


                // Sample processing of data
                foreach (var caption in productCategory.CaptionDetails)
                {
                    Console.WriteLine($"Language: {caption.LanguageCaption}, Name: {caption.Name}, Description: {caption.Description}");

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, caption.LanguageId);
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategoryID);
                    oDBUtility.AddParameters("@ProductCategoryShortName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, caption.Name);
                    oDBUtility.AddParameters("@ProductCategoryDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, -1, caption.Description);

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_PRODUCT_CATEGORY_LANGUAGE");
                }

                return Ok(new { message = "Product category added successfully.", status_code = 100 });
            }
            catch (Exception ex) 
            {
                return Ok(new { status_code = 300 });
            }
        }


        [Route("productCategoryLanguage/get")]
        [HttpPost]
        public IActionResult GetCategoryLanguage(ProductCategory productCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (productCategory.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.ProductCategoryID);
                }
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_CATEGORY_LANGUAGE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }
        [Route("productCategory/Listing")]
        [HttpPost]
        public IActionResult Listing(JudeAPI.Models.ProductCategory productCategory)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (productCategory.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, productCategory.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCT_CATEGORY_LISTING");
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
