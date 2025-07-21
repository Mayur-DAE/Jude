using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using DAE.DAL.SQL;
using DaeConfiguration;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using JudeAPI.Models;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace JudeAPI.Controllers
{
    
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;

        public ProductController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }

        [Route("product/get")]
        [HttpPost]
        public IActionResult Get(Product product)
        {

            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (product.ProductID != 0)
                {
                    oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductID);
                }
                if (product.CompanyName != null)
                {
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.CompanyName);
                }

                if (product.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductCategoryID);
                }

                if (product.ProductSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductSubCategoryID);
                }

                if (product.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CompanyID);
                }

                if (product.ProductName != null)
                {
                    oDBUtility.AddParameters("@ProductName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, product.ProductName);
                }

           
                if (product.IsPublished != null)
                {
                    oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsPublished);
                }

                if (product.IsApproved != null)
                {
                    oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsApproved);
                }


                if (product.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CreatedBy);
                }

                if (product.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, product.CreatedDate);
                }

                if (product.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ModifiedBy);
                }

                if (product.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, product.ModifiedDate);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }


        [Route("productPagination/get")]
        [HttpPost]
        public IActionResult Get_Product_Pagination(Product product)
        {

            try
            {
                
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (product.ProductID != 0)
                {
                    oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductID);
                }

                if (product.ProductCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductCategoryID);
                }

                if (product.ProductSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductSubCategoryID);
                }

                if (product.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CompanyID);
                }

                if (product.ProductName != null)
                {
                    oDBUtility.AddParameters("@ProductName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, product.ProductName);
                }


                if (product.IsPublished != null)
                {
                    oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsPublished);
                }

                if (product.IsApproved != null)
                {
                    oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsApproved);
                }


                if (product.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CreatedBy);
                }

                if (product.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, product.CreatedDate);
                }

                if (product.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ModifiedBy);
                }

                if (product.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, product.ModifiedDate);
                }


                if (product.startRowIndex >= 0)
                {
                    oDBUtility.AddParameters("@startRowIndex", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.startRowIndex);
                }

                if (product.PageSize != 0)
                {
                    oDBUtility.AddParameters("@PageSize", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.PageSize);
                }



                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCTS_BY_PAGINATION");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        //[Route("Product/GetByID")]
        //[HttpGet]
        //public JsonResult Get_BY_Product_ID(int id)
        //{
        //    try
        //    {
        //        DBUtility oDBUtility = new DBUtility(_configurationIG);
        //        oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, id);
        //        DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCTS");

        //        if (ds.Tables.Count > 0)
        //        {
        //            DataTable table = ds.Tables[0];

        //            if (table.Rows.Count > 0)
        //            {
        //                return new JsonResult(table);
        //            }
        //            else
        //            {
        //                return new JsonResult(null);
        //            }

        //        }
        //        else
        //        {
        //            return new JsonResult(null);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new JsonResult(null);
        //    }
        //}


        //[Route("Product/GetProductByCompanyID")]
        //[HttpGet]
        //public JsonResult GET_PRODUCTS_BY_COMPANYID(int id)
        //{
        //    try
        //    {
        //        DBUtility oDBUtility = new DBUtility(_configurationIG);
        //        oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, id);
        //        DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PRODUCTS_BY_COMPANYID");

        //        if (ds.Tables.Count > 0)
        //        {
        //            DataTable table = ds.Tables[0];

        //            if (table.Rows.Count > 0)
        //            {
        //                return new JsonResult(table);
        //            }
        //            else
        //            {
        //                return new JsonResult(null);
        //            }

        //        }
        //        else
        //        {
        //            return new JsonResult(null);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new JsonResult(null);
        //    }
        //}

        [Route("product/insert")]
        [HttpPost]
        public IActionResult Post(Product product)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductSubCategoryID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CompanyID);
                oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.TaxSlabID);
                oDBUtility.AddParameters("@ProductName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, product.ProductName);
                oDBUtility.AddParameters("@ProductDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductDescription);
                oDBUtility.AddParameters("@ProductDiscount", DBUtilDBType.Decimal,DBUtilDirection.In, 4,product.ProductDiscount);
                oDBUtility.AddParameters("@ProductDiscountPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 50, product.ProductDiscountPrice);
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, product.ProductPrice);
                oDBUtility.AddParameters("@ProductImageThumbnailImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductImageThumbnailImagePath);
                oDBUtility.AddParameters("@ProductImageLargeImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductImageLargeImagePath);
                oDBUtility.AddParameters("@ProductWeight", DBUtilDBType.Decimal, DBUtilDirection.In, 10, product.ProductWeight);
                oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 5, product.IsPublished);
                oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 5, product.IsApproved);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("product/update")]
        [HttpPost]
        public IActionResult Put(Product product)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductID);
                oDBUtility.AddParameters("@ProductCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductCategoryID);
                oDBUtility.AddParameters("@ProductSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductSubCategoryID);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.CompanyID);
                oDBUtility.AddParameters("@TaxSlabID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.TaxSlabID);
                oDBUtility.AddParameters("@ProductName", DBUtilDBType.Varchar, DBUtilDirection.In, 100, product.ProductName);
                oDBUtility.AddParameters("@ProductDescription", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductDescription);
                oDBUtility.AddParameters("@ProductPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 10, product.ProductPrice);
                oDBUtility.AddParameters("@ProductDiscount", DBUtilDBType.Decimal, DBUtilDirection.In, 4, product.ProductDiscount);
                oDBUtility.AddParameters("@ProductDiscountPrice", DBUtilDBType.Decimal, DBUtilDirection.In, 50, product.ProductDiscountPrice);
                oDBUtility.AddParameters("@ProductImageThumbnailImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductImageThumbnailImagePath);
                oDBUtility.AddParameters("@ProductImageLargeImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, product.ProductImageLargeImagePath);
                oDBUtility.AddParameters("@ProductWeight", DBUtilDBType.Decimal, DBUtilDirection.In, 10, product.ProductWeight);
                oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 5, product.IsPublished);
                oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 5, product.IsApproved);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCTS");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("productImage/path")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;

                var postedFile = httpRequest.Files[0];
                string originalFileName = Path.GetFileNameWithoutExtension(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);

                // Add timestamp
                string timestamp = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                string newFileName = originalFileName + "_" + timestamp + extension;

                // Get user-defined path (e.g., Photos/MasterProductImage)
                string basePath = httpRequest["basepath"];
                if (string.IsNullOrEmpty(basePath))
                {
                    basePath = "Photos"; // default fallback
                }

                // Combine path
                string fullFolderPath = Path.Combine(_env.ContentRootPath, basePath);
                if (!Directory.Exists(fullFolderPath))
                {
                    Directory.CreateDirectory(fullFolderPath);
                }

                string fullPath = Path.Combine(fullFolderPath, newFileName);

                // Save file
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(newFileName); // Return only filename
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }


        [Route("product/approval")]
        [HttpPost]
        public IActionResult Putapproval(Product product)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductID);
                oDBUtility.AddParameters("@IsApproved", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsApproved);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCT_APPROVAL");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("product/publish")]
        [HttpPost]
        public IActionResult Putpublish(Product product)
        {
            try
            {              
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@ProductID", DBUtilDBType.Integer, DBUtilDirection.In, 10, product.ProductID);
                oDBUtility.AddParameters("@IsPublished", DBUtilDBType.Boolean, DBUtilDirection.In, 10, product.IsPublished);
               
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_PRODUCT_PUBLISH");
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
