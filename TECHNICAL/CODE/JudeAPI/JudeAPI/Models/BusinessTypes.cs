using System;

namespace JudeAPI.Models
{
    public class BusinessTypes
    {
        public int BusinessTypeID { get; set; }
        public string BusinessTypeName { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int LanguageID { get; set; }
    }
}
