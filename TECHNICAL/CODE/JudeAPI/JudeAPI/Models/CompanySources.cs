using System;

namespace JudeAPI.Models
{
    public class CompanySources
    {

        public int CompanySourceID { get; set; }
        public string CompanySource { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
    }
}

