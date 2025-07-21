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
    public class CompanyController : ControllerBase
    {
        private readonly IDaeConfigManager _configurationIG;
        private readonly IWebHostEnvironment _env;
        private ServiceRequestProcessor oServiceRequestProcessor;        
        public CompanyController(IDaeConfigManager configuration, IWebHostEnvironment env)
        {
            this._configurationIG = configuration;
            this._env = env;
        }
        [Route("company/get")]
        [HttpPost]
        public IActionResult GetCompany(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                
                if (company.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                }

                if(company.CompanyName != null)
                {
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, company.CompanyName);
                }

                if (company.BusinessTypeID != 0)
                {
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.BusinessTypeID);
                }

                if (company.BusinessCategoryID != 0)
                {
                    oDBUtility.AddParameters("@BusinessCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.BusinessCategoryID);
                }

                if (company.BusinessSubCategoryID != 0)
                {
                    oDBUtility.AddParameters("@BusinessSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.BusinessSubCategoryID);
                }

                if (company.CompanySourceID != 0)
                {
                    oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanySourceID);
                }

                if (company.CompanyMemberShipTypeID != 0)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyMemberShipTypeID);
                }

                if (company.CompanyMemberShipExpiryDate != null)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipExpiryDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, company.CompanyMemberShipExpiryDate);
                }

                if (company.IsActive != null)
                {
                    oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, company.IsActive);
                }

                if (company.CreatedBy != 0)
                {
                    oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CreatedBy);
                }

                if (company.CreatedDate != null)
                {
                    oDBUtility.AddParameters("@CreatedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, company.CreatedDate);
                }

                if (company.ModifiedBy != 0)
                {
                    oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.ModifiedBy);
                }

                if (company.ModifiedDate != null)
                {
                    oDBUtility.AddParameters("@ModifiedDate", DBUtilDBType.DateTime, DBUtilDirection.In, 50, company.ModifiedDate);
                }


                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }

        //[Route("company/GetByID")]
        //[HttpGet]
        //public IActionResult Get_BY_Company_ID(int id)
        //{
        //    try
        //    {
        //        DBUtility oDBUtility = new DBUtility(_configurationIG);
        //        oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, id);
        //        DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY");

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

        [Route("company/insert")]
        [HttpPost]
        public IActionResult Post(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                
                if (company.BusinessTypeID != 0)
                {
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessTypeID);
                }
                //if (company.BusinessCategoryID != 0)
                //{
                //    oDBUtility.AddParameters("@BusinessCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessCategoryID);
                //}
                //if (company.BusinessSubCategoryID != 0)
                //{
                //    oDBUtility.AddParameters("@BusinessSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessSubCategoryID);
                //}
                if (company.CompanySourceID != 0)
                {
                    oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.CompanySourceID);
                }
                if (company.CompanyMemberShipTypeID != 0)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.CompanyMemberShipTypeID);
                }
                if (company.CompanyMemberShipExpiryDate != null)
                {
                    oDBUtility.AddParameters("@CompanyMemberShipExpiryDate", DBUtilDBType.DateTime, DBUtilDirection.In, 8000, company.CompanyMemberShipExpiryDate);
                }
                if (company.CompanyName != null)
                {
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, company.CompanyName);
                }
                if (company.CompanyDescription != null)
                {
                    oDBUtility.AddParameters("@CompanyDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, 8000, company.CompanyDescription);
                }
                if (company.CompanyContactName != null)
                {
                    oDBUtility.AddParameters("@CompanyContactName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyContactName);
                }               
                if (company.CompanyEmailid != null)
                {
                    oDBUtility.AddParameters("@CompanyEmailid", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyEmailid);
                }                
                if (company.CompanyMobileNo1 != null)
                {
                    oDBUtility.AddParameters("@CompanyMobileNo1", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMobileNo1);
                }                             
                if (company.CompanyMobileNo2 != null)
                {
                    oDBUtility.AddParameters("@CompanyMobileNo2", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMobileNo2);
                }
                //if (company.CompanyGSTNumber != null)
                //{
                //oDBUtility.AddParameters("@CompanyGSTNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyGSTNumber);
                //}
                // if (company.CompanyPANNumber != null)
                //{
                /*oDBUtility.AddParameters("@CompanyPANNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 10, company.CompanyPANNumber);
                }               
                if (company.CompanyMSMENumber != null)
                {
                    oDBUtility.AddParameters("@CompanyMSMENumber", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMSMENumber);
                }              
                if (company.CompanyGSTImagePath != null)
                {
                    oDBUtility.AddParameters("@CompanyPanCardImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyPanCardImagePath);
                }                
                if (company.CompanyGSTImagePath != null)
                {
                    oDBUtility.AddParameters("@CompanyGSTImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyGSTImagePath);
                }                
                if (company.CompanyMSMEImagePath != null)
                {
                    oDBUtility.AddParameters("@CompanyMSMEImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyMSMEImagePath);
                }  */           
                if (company.CompanyLogoPath != null)
                {
                    oDBUtility.AddParameters("@CompanyLogoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyLogoPath);
                }                              
               /* if(company.CompanyBannerPath != null)
                {
                    oDBUtility.AddParameters("@CompanyBannerPath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyBannerPath);
                }*/
                if (company.CompanyCancelledChequePath != null)
                {
                    oDBUtility.AddParameters("@CompanyCancelledChequePath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyCancelledChequePath);
                }

                if (company.CompanyJoiningDate != null)
                {
                    oDBUtility.AddParameters("@CompanyJoiningDate", DBUtilDBType.DateTime, DBUtilDirection.In, 500, company.CompanyJoiningDate);
                }                                
                if(company.WebsiteURL != null)
                {
                    oDBUtility.AddParameters("@WebsiteURL", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.WebsiteURL);
                }

                if(company.FacbookID != null)
                {
                    oDBUtility.AddParameters("@FacbookID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.FacbookID);
                }
                if(company.Twitter != null)
                {
                    oDBUtility.AddParameters("@Twitter", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Twitter);
                }
                if (company.Linkedin != null)
                {
                    oDBUtility.AddParameters("@Linkedin", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Linkedin);
                }                               
                if(company.Instagram != null)
                {
                    oDBUtility.AddParameters("@Instagram", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Instagram);
                }
                if(company.WordPress != null)
                {
                    oDBUtility.AddParameters("@WordPress", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.WordPress);
                }                
                if(company.Pintrest != null)
                {
                    oDBUtility.AddParameters("@Pintrest", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Pintrest);
                }                
                if (company.YouTube != null)
                {
                    oDBUtility.AddParameters("@YouTube", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.YouTube);
                }                
                if(company.CompanyTimeMonday != null) 
                {
                    oDBUtility.AddParameters("@CompanyTimeMonday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeMonday);
                }
                if(company.CompanyTimeTuesday != null)
                {
                    oDBUtility.AddParameters("@CompanyTimeTuesday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeTuesday);
                }
                if (company.CompanyTimeWednesday != null)
                {
                    oDBUtility.AddParameters("@CompanyTimeWednesday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeWednesday);
                }
                if (company.CompanyTimeThursday != null)
                {
                    oDBUtility.AddParameters("@CompanyTimeThursday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeThursday);
                }
                if (company.CompanyTimeFriday != null)
                {
                    oDBUtility.AddParameters("@CompanyTimeFriday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeFriday);
                }
                if (company.CompanyTimeSaturday != null) 
                {
                    oDBUtility.AddParameters("@CompanyTimeSaturday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeSaturday);
                }
                if(company.CompanyTimeSunday != null)
                {
                    oDBUtility.AddParameters("@CompanyTimeSunday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeSunday);
                }
                                                                              
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, company.IsActive);
                oDBUtility.AddParameters("@CreatedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CreatedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("company/update")]
        [HttpPost]
        public IActionResult Put(JudeAPI.Models.Company company)
        {
            try
            {                
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.CompanyID);
                oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessTypeID);
                //oDBUtility.AddParameters("@BusinessCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessCategoryID);
                //oDBUtility.AddParameters("@BusinessSubCategoryID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.BusinessSubCategoryID);
                oDBUtility.AddParameters("@CompanySourceID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.CompanySourceID);
                oDBUtility.AddParameters("@CompanyMemberShipTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 100, company.CompanyMemberShipTypeID);
               
                oDBUtility.AddParameters("@CompanyMemberShipExpiryDate", DBUtilDBType.DateTime, DBUtilDirection.In, 8000, company.CompanyMemberShipExpiryDate);
                oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, company.CompanyName);
                oDBUtility.AddParameters("@CompanyDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, 8000, company.CompanyDescription);
                oDBUtility.AddParameters("@CompanyContactName", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyContactName);
                oDBUtility.AddParameters("@CompanyEmailid", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyEmailid);
                oDBUtility.AddParameters("@CompanyMobileNo1", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMobileNo1);
                oDBUtility.AddParameters("@CompanyMobileNo2", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMobileNo2);
                //oDBUtility.AddParameters("@CompanyGSTNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyGSTNumber);
                // oDBUtility.AddParameters("@CompanyPANNumber", DBUtilDBType.Varchar, DBUtilDirection.In, 10, company.CompanyPANNumber);
                // oDBUtility.AddParameters("@CompanyMSMENumber", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMSMENumber);
                //oDBUtility.AddParameters("@CompanyPanCardImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyPanCardImagePath);
                //oDBUtility.AddParameters("@CompanyGSTImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyGSTImagePath);
                //oDBUtility.AddParameters("@CompanyMSMEImagePath", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyMSMEImagePath);
                oDBUtility.AddParameters("@CompanyLogoPath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyLogoPath);
                //oDBUtility.AddParameters("@CompanyBannerPath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyBannerPath);
                oDBUtility.AddParameters("@CompanyCancelledChequePath", DBUtilDBType.Varchar, DBUtilDirection.In, 1000, company.CompanyCancelledChequePath);
                oDBUtility.AddParameters("@CompanyJoiningDate", DBUtilDBType.DateTime, DBUtilDirection.In, 500, company.CompanyJoiningDate);
                oDBUtility.AddParameters("@WebsiteURL", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.WebsiteURL);
                oDBUtility.AddParameters("@FacbookID", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.FacbookID);
                oDBUtility.AddParameters("@Twitter", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Twitter);
                oDBUtility.AddParameters("@Linkedin", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Linkedin);
                oDBUtility.AddParameters("@Instagram", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Instagram);
                oDBUtility.AddParameters("@WordPress", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.WordPress);
                oDBUtility.AddParameters("@Pintrest", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.Pintrest);
                oDBUtility.AddParameters("@YouTube", DBUtilDBType.Varchar, DBUtilDirection.In, 200, company.YouTube);
                oDBUtility.AddParameters("@CompanyTimeMonday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeMonday);
                oDBUtility.AddParameters("@CompanyTimeTuesday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeTuesday);
                oDBUtility.AddParameters("@CompanyTimeWednesday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeWednesday);
                oDBUtility.AddParameters("@CompanyTimeThursday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeThursday);
                oDBUtility.AddParameters("@CompanyTimeFriday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeFriday);
                oDBUtility.AddParameters("@CompanyTimeSaturday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeSaturday);
                oDBUtility.AddParameters("@CompanyTimeSunday", DBUtilDBType.Varchar, DBUtilDirection.In, 50, company.CompanyTimeSunday);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 1, company.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.ModifiedBy);
                                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_COMPANY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("company/isActive")]
        [HttpPost]
        public IActionResult SetUserActive(JudeAPI.Models.Company company)
        {
            try
            {               
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                oDBUtility.AddParameters("@IsActive", DBUtilDBType.Boolean, DBUtilDirection.In, 10, company.IsActive);
                oDBUtility.AddParameters("@ModifiedBy", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.ModifiedBy);
                
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_UPDATE_COMPANY_ISACTIVE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }

        [Route("company/popularAroundYou")]
        [HttpPost]
        public IActionResult GetCompanyPopularAroundYou(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@Lat", DBUtilDBType.Varchar, DBUtilDirection.In, 600, company.Lat);
                oDBUtility.AddParameters("@Long", DBUtilDBType.Varchar, DBUtilDirection.In, 600, company.Long);
                oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.LanguageID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMAPNY_POPULAR_ AROUND_YOU");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("company/paidPopularAroundYou")]
        [HttpPost]
        public IActionResult GetPaidCompanyPopularAroundYou(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                oDBUtility.AddParameters("@Lat", DBUtilDBType.Varchar, DBUtilDirection.In, 600, company.Lat);
                oDBUtility.AddParameters("@Long", DBUtilDBType.Varchar, DBUtilDirection.In, 600, company.Long);
                oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.LanguageID);

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_PAID_COMAPNY_POPULAR_AROUND_YOU");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("company/cover_img")]
        [HttpPost]
        public JsonResult SaveFile(int id)
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/cover_img/" + id + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(id + filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("company/logo")]
        [HttpPost]
        public JsonResult SaveFiles(int id)
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                // Extract original file extension
                string extension = Path.GetExtension(postedFile.FileName);

                // Create a unique filename with timestamp
                string filename = $"company_{id}_{DateTime.Now:yyyyMMddHHmmssfff}{extension}";

                // Full path to save
                var physicalPath = Path.Combine(_env.ContentRootPath, "Photos", "listing", filename);

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



        [Route("company/path")]

        [HttpPost]
        public JsonResult SaveDocumentFiles(int id)
        
        
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + id +filename ;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(id +  filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("anonymous.png");
            }
        
        }


        [Route("company/validate")]
        [HttpPost]
        public IActionResult validate(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.CompanyEmailid != null)
                {
                    oDBUtility.AddParameters("@CompanyEmailid", DBUtilDBType.Varchar, DBUtilDirection.In, 500, company.CompanyEmailid);
                }
                if (company.CompanyMobileNo1 != null)
                {
                    oDBUtility.AddParameters("@CompanyMobileNo1", DBUtilDBType.Varchar, DBUtilDirection.In, 15, company.CompanyMobileNo1);
                }
              
                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_VALIDATE_COMPANY");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }

        [Route("company/Listing")]
        [HttpPost]
        public IActionResult Listing(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_LISTING");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }
        }
        [Route("membershipinvoice/get")]
        [HttpPost]
        public IActionResult GetMenu(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_MEMBERSHIP_INVOICE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));

            }
        }



        [Route("companyLanguage/add")]
        [HttpPost]
        public IActionResult AddCompanyLanguage([FromBody] dynamic company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);
                int CompanyID = company.CompanyID;
                oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyID);
                oDBUtility.Execute_StoreProc_DataSet("USP_DELETE_COMPANY_LANGUAGE");


                // Sample processing of data
                foreach (var caption in company.CaptionDetails)
                {
                    Console.WriteLine($"Language: {caption.LanguageCaption}, Name: {caption.Name}, Description: {caption.Description}");

                    oDBUtility = new DBUtility(_configurationIG);
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, caption.LanguageId);
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, CompanyID);
                    oDBUtility.AddParameters("@CompanyName", DBUtilDBType.Nvarchar, DBUtilDirection.In, 500, caption.Name);
                    oDBUtility.AddParameters("@CompanyDescription", DBUtilDBType.Nvarchar, DBUtilDirection.In, -1, caption.Description);

                    DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_INSERT_COMPANY_LANGUAGE");
                }

                return Ok(new { message = "Product subcategory added successfully.", status_code = 100 });
            }
            catch (Exception ex)
            {
                return Ok(new { status_code = 300 });
            }
        }


        [Route("companyLanguage/get")]
        [HttpPost]
        public IActionResult GetCompanyLanguage(Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_LANGUAGE");
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return Ok(oServiceRequestProcessor.ProcessRequest(ds));
            }
            catch (Exception ex)
            {
                oServiceRequestProcessor = new ServiceRequestProcessor();
                return BadRequest(oServiceRequestProcessor.onError(ex.Message));
            }

        }
        [Route("companyname/get")]
        [HttpPost]
        public IActionResult GetCompanyName(JudeAPI.Models.Company company)
        {
            try
            {
                DBUtility oDBUtility = new DBUtility(_configurationIG);

                if (company.CompanyID != 0)
                {
                    oDBUtility.AddParameters("@CompanyID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.CompanyID);
                }

                if (company.BusinessTypeID != 0)
                {
                    oDBUtility.AddParameters("@BusinessTypeID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.BusinessTypeID);
                }
                if (company.LanguageID != 0)
                {
                    oDBUtility.AddParameters("@LanguageID", DBUtilDBType.Integer, DBUtilDirection.In, 10, company.LanguageID);
                }

                DataSet ds = oDBUtility.Execute_StoreProc_DataSet("USP_GET_COMPANY_NAME_LISTING");
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

  
