using System;

namespace JudeAPI.Models
{
    public class EmailTemplates
    {
        public int? TemplateID { get; set; }
        public string OrderID { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderAmount { get; set; }

        public string Currency { get; set; }


        public string ShippingAddress { get; set; }
        public DateTime? OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public string CustomerName { get; set; }

        public string TemplateName { get; set; }
        public string ToAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string URL { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Email { get; set; }


    }
}
