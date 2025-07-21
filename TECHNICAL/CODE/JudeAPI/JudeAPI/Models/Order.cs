using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JudeAPI.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }

        public decimal longitude { get; set; }
        public decimal latitude { get; set; }

        public string landmark { get; set; }
        public string fullname { get; set; }

        public string mobilenumber { get; set; }

        public int CompanyID { get; set; }
        public int OrderStatusID { get; set; }
        public DateTime? OrderDate { get; set; }
        public int UserAddressID { get; set; }
        public int OrderDeliveryTypeID { get; set; }
        public decimal OrderPrice { get; set; }
        public decimal ShippingPrice { get; set; }
        public string OrderPaymentReferenceNumber { get; set; }
        public int OrderPaymentSourceID { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string OrderShipmentReferenceID { get; set; }

        public int ShiprocketCourierID { get; set; }
        public bool? IsShopPaymentSettled { get; set; }
        public DateTime? ShopPaymentSettlementDate { get; set; }
        public string ShopPaymentReference { get; set; }
        public int? ShopPaymentSettledBy { get; set; }
        public bool? IsDeliveryChargeSettled { get; set; }
        public DateTime? DeliveryChargeSettlementDate { get; set; }
        public string DeliveryChargeSettlementReference { get; set; }
        public int? DeliveryChargeSettledBy { get; set; }

        public string CompanyName { get; set; }

        public int ServiceProviderID { get; set; }
        public decimal Price { get; set; }



    }
}
