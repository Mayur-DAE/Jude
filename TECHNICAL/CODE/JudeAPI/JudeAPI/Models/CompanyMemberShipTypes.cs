using System;
namespace JudeAPI.Models
{
    public class CompanyMemberShipTypes
    {
        public int CompanyMemberShipTypeID { get; set; }
        public string CompanyMemberShipName { get; set; }
        public decimal CompanyMembershipFees { get; set; }
        public int TaxSlabID { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
