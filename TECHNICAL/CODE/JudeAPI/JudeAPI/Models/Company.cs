using System;
namespace JudeAPI.Models
{
    public class Company
    {
        public int CompanyID { get; set; }
        public int BusinessTypeID { get; set; }
        public int BusinessCategoryID { get; set; }
        public int BusinessSubCategoryID { get; set; }
        public int CompanySourceID { get; set; }
        public int CompanyMemberShipTypeID { get; set; }
        public DateTime? CompanyMemberShipExpiryDate { get; set; }
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string CompanyContactName { get; set; }
        public string CompanyEmailid { get; set; }
        public string CompanyMobileNo1 { get; set; }
        public string CompanyMobileNo2 { get; set; }
        /*public string CompanyGSTNumber { get; set; }
        public string CompanyPANNumber { get; set; }
        public string CompanyMSMENumber { get; set; }
        public string CompanyPanCardImagePath { get; set; }
        public string CompanyGSTImagePath { get; set; }
        public string CompanyMSMEImagePath { get; set; }*/
        public string CompanyLogoPath { get; set; }
       // public string CompanyBannerPath { get; set; }
        public string CompanyCancelledChequePath { get; set; }
        public DateTime? CompanyJoiningDate { get; set; }
        public string WebsiteURL { get; set; }
        public string FacbookID { get; set; }
        public string Twitter { get; set; }
        public string Linkedin { get; set; }
        public string Instagram { get; set; }
        public string WordPress { get; set; }
        public string Pintrest { get; set; }
        public string YouTube { get; set; }
        public string CompanyTimeMonday { get; set; }
        public string CompanyTimeTuesday { get; set; }
        public string CompanyTimeWednesday { get; set; }
        public string CompanyTimeThursday { get; set; }
        public string CompanyTimeFriday { get; set; }
        public string CompanyTimeSaturday { get; set; }
        public string CompanyTimeSunday { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string SearchCompanyOrProduct { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public int LanguageID { get; set; }
    }
}
