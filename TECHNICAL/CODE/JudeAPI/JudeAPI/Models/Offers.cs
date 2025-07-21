using System;
namespace JudeAPI.Models
{
    public class Offers
    {

        public int OfferID { get; set; }
        public int CompanyID { get; set; }
        public string OfferName { get; set; }
        public string OfferDescription { get; set; }
        public DateTime? OfferStartDate { get; set; }
        public DateTime? OfferEndDate { get; set; }
        public decimal OfferDiscount { get; set; }
        public string OfferDiscountType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
    }

}

