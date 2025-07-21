using System;

namespace JudeAPI.Models
{
    public class FAQ
    {        
        public int FAQID { get; set; }
        public string FAQTitle { get; set; }
        public string FAQAnswer { get; set; }
        public bool? IsApproved { get; set; }
        public bool? IsPublished { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
