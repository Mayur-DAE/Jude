using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class CompanyMembershipInvoice
    {
        public int CompanyMembershipInvoiceID { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime? InvoiceDate { get; set; }

        public DateTime? CompanyMemberShipExpiryDate { get; set; }
        public DateTime? CompanyMemberShipStartDate { get; set; }

        public string PaymentMode { get; set; }

        public string ReferenceNumber { get; set; }

        public int CompanyID { get; set; }
        public int CompanyMemberShipTypeID { get; set; }
        public decimal InvoiceAmount { get; set; }
        public decimal SGST { get; set; }
        public decimal CGST { get; set; }
        public decimal IGST { get; set; }
        public decimal?InvoiceTotal { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int CreatedBy { get; set; }
    }
}
