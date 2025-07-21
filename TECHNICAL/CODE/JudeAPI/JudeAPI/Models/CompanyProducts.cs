using System;
using System.ComponentModel.DataAnnotations;

namespace JudeAPI.Models
{
    public class CompanyProducts
    {
        public int CompanyProductID { get; set; }
        public int? MasterProductID { get; set; }
        public int? CompanyID { get; set; }
        public decimal? ProductPrice { get; set; }
        public decimal? ProductDiscount { get; set; }
        public decimal? ProductDiscountPrice { get; set; }
        public bool? IsPublished { get; set; }
        public bool? IsApproved { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? LanguageID { get; set; }
    }


    public class InsertCompanyProducts
    {
        [Required(ErrorMessage = "Master Product ID is required")]
        public int? MasterProductID { get; set; }


        [Required(ErrorMessage = "Company ID is required")]
        public int? CompanyID { get; set; }


        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal ProductPrice { get; set; }

        public string? DiscountType { get; set; }

        public decimal? DiscountPrice { get; set; }

        public bool IsActive { get; set; }
      

        [Required(ErrorMessage = "Created By is required")]
        public int? CreatedBy { get; set; }                
    }

    public class UpdateCompanyProducts
    {
        [Required(ErrorMessage = "Company Product ID is required")]
        public int CompanyProductID { get; set; }    
        
        public decimal? ProductPrice { get; set; }       
        public string DiscountType { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool? IsActive { get; set; }

        [Required(ErrorMessage = "Created By is required")]
        public int? ModifiedBy { get; set; }        
    }
}
