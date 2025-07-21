using System;
namespace JudeAPI.Models
{
    public class Enquiry
    {
        public int EnquiryID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailID { get; set; }
        public string MobileNumber { get; set; }
        public string Message { get; set; }
    }
}
