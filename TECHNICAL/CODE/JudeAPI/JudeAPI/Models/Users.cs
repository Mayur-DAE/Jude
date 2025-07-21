using System;

namespace JudeAPI.Models
{
    public class Users
    {
        public int UserID { get; set; }
        public int CompanyID { get; set; }
        public int UserTypeID { get; set; }
        public int UserRoleID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string EmaiID { get; set; }
        public string MobileNumber { get; set; }
        public string ProfilePicturePath { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string GoogleID { get; set; }
    }
}
