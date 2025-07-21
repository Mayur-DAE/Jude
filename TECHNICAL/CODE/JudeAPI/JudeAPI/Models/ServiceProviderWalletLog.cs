using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class ServiceProviderWalletLog
    {
        public int ServiceProviderWalletLogID { get; set; }
        public int ServiceProviderID { get; set; }
        public decimal AmountCredited { get; set; }
        public decimal OldAmountCredited { get; set; }
        public DateTime? CreditDate { get; set; }
        public string CreditReferenceNumber { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }
    }
}
