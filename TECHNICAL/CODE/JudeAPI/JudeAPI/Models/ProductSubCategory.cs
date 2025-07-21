using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class ProductSubCategory
    {
        public int ProductSubCategoryID { get; set; }
        public int ProductCategoryID { get; set; }
        public string ProductSubCategoryShortName { get; set; }
        public string ProductSubCategoryDescription { get; set; }
        public string ProductSubCategoryThumbNailPhotoPath { get; set; }
        public string ProductSubCategoryLargePhotoPath { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int LanguageID { get; set; }
    }
}
