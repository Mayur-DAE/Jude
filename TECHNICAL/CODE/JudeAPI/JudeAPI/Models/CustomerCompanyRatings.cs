using System;

namespace JudeAPI.Models
{
    public class CustomerCompanyRatings
    {
        public int CustomerCompanyRatingID { get; set; }
        public int CompanyID { get; set; }
        public int UserID { get; set; }
        public string CustomerName { get; set; }
        public byte CustomerCompanyRating { get; set; }
        public string CustomerRatingHeader { get; set; }
        public string CustomerRatingDescription { get; set; }
        public bool? IsPublished { get; set; }
        public int PublishApprovedBy { get; set; }
        public DateTime? PublishedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
