using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public int ProductCategoryID { get; set; }
        public int ProductSubCategoryID { get; set; }
        public string CompanyName { get; set; }
        public int CompanyID { get; set; }
        public int TaxSlabID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public decimal ProductDiscount { get; set; }
        public decimal ProductDiscountPrice { get; set; }
        public string ProductImageThumbnailImagePath { get; set; }
        public string ProductImageLargeImagePath { get; set; }
        public decimal ProductWeight { get; set; }
        public bool? IsPublished { get; set; }
        public bool? IsApproved { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }        
        public int startRowIndex { get; set; }
        public int PageSize { get; set; }

    }
}
