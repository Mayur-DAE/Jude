using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class CompanyBankDetails
    {
        public int CompanyBankDetailsID { get; set; }
        public int CompanyID { get; set; }
        public string UPIID { get; set; }
        public string BankName { get; set; }
        public string BankBranchName { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountNumber { get; set; }
        public string IFSC { get; set; }
        public bool IsDefault { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
