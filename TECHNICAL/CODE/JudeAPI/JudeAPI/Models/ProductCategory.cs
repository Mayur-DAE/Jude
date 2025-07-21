using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class ProductCategory
    {

        public int ProductCategoryID { get; set; }
        public string ProductCategoryShortName { get; set; }
        public string ProductCategoryDescription { get; set; }
        public string ProductCategoryThumbNailPhotoPath { get; set; }
        public string ProductCategoryLargePhotoPath { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int LanguageID { get; set; }

    }
}
