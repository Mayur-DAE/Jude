using System;
using System.ComponentModel.DataAnnotations;

namespace JudeAPI.Models
{
    public class MasterProducts
    {
        public int MasterProductID { get; set; }
        public int? ProductCategoryID { get; set; }
        public int? ProductSubCategoryID { get; set; }
        public int? TaxSlabID { get; set; }
        public string MasterProductName { get; set; }
        public string MasterProductDescription { get; set; }
        public decimal? MasterProductPrice { get; set; }
        public string MasterProductImageThumbnailImagePath { get; set; }
        public string MasterProductImageLargeImagePath { get; set; }
        public string MasterProductUnit { get; set; }
        public bool? IsActive { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? LanguageID { get; set; }

    }

    public class InsertMasterProductModel
    {
        [Required(ErrorMessage = "Product Category is required")]
        public int? ProductCategoryID { get; set; }

        [Required(ErrorMessage = "Product Subcategory is required")]
        public int? ProductSubCategoryID { get; set; }

        [Required(ErrorMessage = "TaxSlabID  is required")]
        public int? TaxSlabID { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100, ErrorMessage = "Product Name cannot be longer than 100 characters")]
        public string MasterProductName { get; set; }

        [StringLength(500, ErrorMessage = "Product Description cannot be longer than 500 characters")]
        public string MasterProductDescription { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal MasterProductPrice { get; set; }
        public string MasterProductImageThumbnailImagePath { get; set; }
        public string MasterProductImageLargeImagePath { get; set; }
        public string MasterProductUnit { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required(ErrorMessage = "Created By is required")]
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class UpdateMasterProductModel
    {
        [Required(ErrorMessage = "Master Product ID is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Master Product ID must be greater than 0")]
        public int MasterProductID { get; set; }


        [Required(ErrorMessage = "Modified By is required")]
        public int? ModifiedBy { get; set; }
        public int? CompanyID { get; set; }

        public string MasterProductName { get; set; }
        public string MasterProductDescription { get; set; }
        public decimal MasterProductPrice { get; set; }
        public int? TaxSlabID { get; set; }
        public int? ProductCategoryID { get; set; }
        public int? ProductSubCategoryID { get; set; }
        public string MasterProductImageThumbnailImagePath { get; set; }
        public string MasterProductImageLargeImagePath { get; set; }
        public string MasterProductUnit { get; set; }
        public bool? IsActive { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
    public class MasterProductsLanguage
    {
        public int MasterProductLanguageID { get; set; }
        public int LanguageID { get; set; }
        public int MasterProductID { get; set; }
        public string MasterProductName { get; set; }
        public string MasterProductDescription { get; set; }

    }

    public class MasterProductsforcompany
    {
        public int? CompanyID { get; set; }
        public int? ProductCategoryID { get; set; }
        public int? ProductSubCategoryID { get; set; }
        public string MasterProductName { get; set; }

    }
}
